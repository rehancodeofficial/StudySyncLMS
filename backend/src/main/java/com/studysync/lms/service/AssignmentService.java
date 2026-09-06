package com.studysync.lms.service;

import com.studysync.lms.domain.*;
import com.studysync.lms.dto.*;
import com.studysync.lms.exception.*;
import com.studysync.lms.repository.*;
import com.studysync.lms.security.services.UserDetailsImpl;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private UserDetailsImpl currentUser() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private void assertTenantAccess(Long organizationId) {
        UserDetailsImpl user = currentUser();
        boolean isSuperAdmin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!isSuperAdmin && !organizationId.equals(user.getOrganizationId())) {
            throw new TenantAccessDeniedException();
        }
    }

    public List<AssignmentDto> getAssignmentsByCourse(Long orgId, Long courseId) {
        assertTenantAccess(orgId);
        courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        return assignmentRepository.findByCourseId(courseId)
                .stream().map(AssignmentDto::from).collect(Collectors.toList());
    }

    @Transactional
    public AssignmentDto createAssignment(Long orgId, Long courseId, CreateAssignmentRequest req) {
        assertTenantAccess(orgId);
        Course course = courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));

        Assignment assignment = Assignment.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .maxMarks(req.getMaxMarks())
                .dueDate(req.getDueDate())
                .status(req.isPublish() ? Assignment.AssignmentStatus.PUBLISHED : Assignment.AssignmentStatus.DRAFT)
                .course(course)
                .build();
        return AssignmentDto.from(assignmentRepository.save(assignment));
    }

    @Transactional
    public SubmissionDto submit(Long orgId, Long courseId, Long assignmentId, String content, String fileUrl) {
        assertTenantAccess(orgId);
        UserDetailsImpl me = currentUser();
        courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        Assignment assignment = assignmentRepository.findByIdAndCourseId(assignmentId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment", assignmentId));

        if (submissionRepository.existsByAssignmentIdAndStudentId(assignmentId, me.getId())) {
            throw new BadRequestException("You have already submitted this assignment");
        }

        User student = userRepository.findById(me.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", me.getId()));

        boolean isLate = assignment.getDueDate() != null && LocalDateTime.now().isAfter(assignment.getDueDate());

        Submission submission = Submission.builder()
                .assignment(assignment)
                .student(student)
                .content(content)
                .fileUrl(fileUrl)
                .status(isLate ? Submission.SubmissionStatus.LATE : Submission.SubmissionStatus.SUBMITTED)
                .build();
        return SubmissionDto.from(submissionRepository.save(submission));
    }

    @Transactional
    public SubmissionDto grade(Long orgId, Long courseId, Long submissionId, Double grade, String feedback) {
        assertTenantAccess(orgId);
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Submission", submissionId));
        if (!orgId.equals(submission.getAssignment().getCourse().getOrganization().getId())) {
            throw new TenantAccessDeniedException();
        }
        submission.setGrade(grade);
        submission.setFeedback(feedback);
        submission.setStatus(Submission.SubmissionStatus.GRADED);
        submission.setGradedAt(LocalDateTime.now());
        return SubmissionDto.from(submissionRepository.save(submission));
    }

    public List<SubmissionDto> getSubmissions(Long orgId, Long courseId, Long assignmentId) {
        assertTenantAccess(orgId);
        courseRepository.findByIdAndOrganizationId(courseId, orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
        return submissionRepository.findByAssignmentId(assignmentId)
                .stream().map(SubmissionDto::from).collect(Collectors.toList());
    }

    public List<SubmissionDto> getMySubmissions() {
        UserDetailsImpl me = currentUser();
        return submissionRepository.findByStudentId(me.getId())
                .stream().map(SubmissionDto::from).collect(Collectors.toList());
    }

    @Data
    public static class CreateAssignmentRequest {
        private String title;
        private String description;
        private Double maxMarks;
        private LocalDateTime dueDate;
        private boolean publish = false;
    }
}
