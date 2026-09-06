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
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private UserDetailsImpl currentUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    private void assertTenantAccess(Long organizationId) {
        UserDetailsImpl user = currentUser();
        boolean isSuperAdmin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!isSuperAdmin && !organizationId.equals(user.getOrganizationId())) {
            throw new TenantAccessDeniedException();
        }
    }

    public List<EnrollmentDto> getEnrollmentsByOrganization(Long orgId) {
        assertTenantAccess(orgId);
        return enrollmentRepository.findByOrganizationId(orgId).stream()
                .map(EnrollmentDto::from)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDto> getEnrollmentsByCourse(Long orgId, Long courseId) {
        assertTenantAccess(orgId);
        // Verify course belongs to org
        courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        return enrollmentRepository.findByCourseId(courseId).stream()
                .map(EnrollmentDto::from)
                .collect(Collectors.toList());
    }

    public List<EnrollmentDto> getMyEnrollments() {
        UserDetailsImpl me = currentUser();
        return enrollmentRepository.findByStudentId(me.getId()).stream()
                .map(EnrollmentDto::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public EnrollmentDto enroll(Long orgId, Long courseId) {
        assertTenantAccess(orgId);
        UserDetailsImpl me = currentUser();

        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));

        if (course.getStatus() != Course.CourseStatus.PUBLISHED) {
            throw new BadRequestException("Course is not available for enrollment");
        }
        if (enrollmentRepository.existsByStudentIdAndCourseId(me.getId(), courseId)) {
            throw new BadRequestException("You are already enrolled in this course");
        }
        // Check capacity
        if (course.getCapacity() != null &&
                enrollmentRepository.countByCourseId(courseId) >= course.getCapacity()) {
            throw new BadRequestException("Course is at full capacity");
        }

        User student = userRepository.findById(me.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", me.getId()));

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .status(Enrollment.EnrollmentStatus.ACTIVE)
                .progress(0.0)
                .build();

        return EnrollmentDto.from(enrollmentRepository.save(enrollment));
    }

    @Transactional
    public EnrollmentDto adminEnroll(Long orgId, Long courseId, Long studentId) {
        assertTenantAccess(orgId);
        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", studentId));

        // Ensure student belongs to this org
        if (student.getOrganization() == null || !orgId.equals(student.getOrganization().getId())) {
            throw new TenantAccessDeniedException("Student does not belong to this organization");
        }
        if (enrollmentRepository.existsByStudentIdAndCourseId(studentId, courseId)) {
            throw new BadRequestException("Student is already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .status(Enrollment.EnrollmentStatus.ACTIVE)
                .progress(0.0)
                .build();
        return EnrollmentDto.from(enrollmentRepository.save(enrollment));
    }

    @Transactional
    public EnrollmentDto updateProgress(Long orgId, Long enrollmentId, Double progress) {
        assertTenantAccess(orgId);
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", enrollmentId));
        enrollment.setProgress(Math.min(100.0, Math.max(0.0, progress)));
        if (enrollment.getProgress() >= 100.0) {
            enrollment.setStatus(Enrollment.EnrollmentStatus.COMPLETED);
        }
        return EnrollmentDto.from(enrollmentRepository.save(enrollment));
    }
}
