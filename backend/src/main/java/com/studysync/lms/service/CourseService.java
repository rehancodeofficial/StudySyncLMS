package com.studysync.lms.service;

import com.studysync.lms.domain.*;
import com.studysync.lms.dto.*;
import com.studysync.lms.exception.*;
import com.studysync.lms.repository.*;
import com.studysync.lms.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final EnrollmentRepository enrollmentRepository;

    private UserDetailsImpl currentUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    /**
     * Enforces tenant isolation: the requested organization must match the current user's org
     * unless they are a SUPER_ADMIN.
     */
    private void assertTenantAccess(Long organizationId) {
        UserDetailsImpl user = currentUser();
        boolean isSuperAdmin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!isSuperAdmin && !organizationId.equals(user.getOrganizationId())) {
            throw new TenantAccessDeniedException();
        }
    }

    public List<CourseDto> getCoursesByOrganization(Long orgId) {
        assertTenantAccess(orgId);
        return courseRepository.findByOrganizationId(orgId).stream()
                .map(c -> {
                    CourseDto dto = CourseDto.from(c);
                    dto.setEnrollmentCount(enrollmentRepository.countByCourseId(c.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long orgId, Long courseId) {
        assertTenantAccess(orgId);
        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        CourseDto dto = CourseDto.from(course);
        dto.setEnrollmentCount(enrollmentRepository.countByCourseId(courseId));
        return dto;
    }

    @Transactional
    public CourseDto createCourse(Long orgId, CreateCourseRequest req) {
        assertTenantAccess(orgId);

        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", orgId));

        if (courseRepository.existsByCodeAndOrganizationId(req.getCode(), orgId)) {
            throw new BadRequestException("Course code '" + req.getCode() + "' already exists in this organization");
        }

        // Check subscription course limit
        long existingCourses = courseRepository.countByOrganizationId(orgId);
        if (existingCourses >= org.getCourseLimit()) {
            throw new BadRequestException("Course limit reached for your subscription plan (" +
                    org.getCourseLimit() + " courses allowed on " + org.getSubscriptionPlan() + " plan)");
        }

        Course course = Course.builder()
                .title(req.getTitle())
                .code(req.getCode())
                .description(req.getDescription())
                .category(req.getCategory())
                .thumbnail(req.getThumbnail())
                .credits(req.getCredits())
                .capacity(req.getCapacity())
                .status(Course.CourseStatus.DRAFT)
                .organization(org)
                .build();

        if (req.getInstructorId() != null) {
            User instructor = userRepository.findById(req.getInstructorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Instructor", req.getInstructorId()));
            // Ensure instructor belongs to this organization
            if (!orgId.equals(instructor.getOrganization() != null ? instructor.getOrganization().getId() : null)) {
                throw new TenantAccessDeniedException("Instructor does not belong to this organization");
            }
            course.setInstructor(instructor);
        }

        if (req.getDepartmentId() != null) {
            Department dept = departmentRepository.findById(req.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department", req.getDepartmentId()));
            if (!orgId.equals(dept.getOrganization().getId())) {
                throw new TenantAccessDeniedException("Department does not belong to this organization");
            }
            course.setDepartment(dept);
        }

        return CourseDto.from(courseRepository.save(course));
    }

    @Transactional
    public CourseDto updateCourseStatus(Long orgId, Long courseId, String status) {
        assertTenantAccess(orgId);
        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        course.setStatus(Course.CourseStatus.valueOf(status.toUpperCase()));
        return CourseDto.from(courseRepository.save(course));
    }

    @Transactional
    public void deleteCourse(Long orgId, Long courseId) {
        assertTenantAccess(orgId);
        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        courseRepository.delete(course);
    }
}
