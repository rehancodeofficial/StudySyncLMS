package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping("/api/organizations/{orgId}/courses/{courseId}/assignments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<AssignmentDto>>> list(
            @PathVariable Long orgId, @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.success(
                assignmentService.getAssignmentsByCourse(orgId, courseId)));
    }

    @PostMapping("/api/organizations/{orgId}/courses/{courseId}/assignments")
    @PreAuthorize("hasAnyRole('ROLE_INSTRUCTOR', 'ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<AssignmentDto>> create(
            @PathVariable Long orgId, @PathVariable Long courseId,
            @RequestBody AssignmentService.CreateAssignmentRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Assignment created",
                        assignmentService.createAssignment(orgId, courseId, req)));
    }

    @PostMapping("/api/organizations/{orgId}/courses/{courseId}/assignments/{assignmentId}/submit")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<ApiResponse<SubmissionDto>> submit(
            @PathVariable Long orgId, @PathVariable Long courseId,
            @PathVariable Long assignmentId,
            @RequestBody SubmitRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Assignment submitted",
                        assignmentService.submit(orgId, courseId, assignmentId, req.getContent(), req.getFileUrl())));
    }

    @GetMapping("/api/organizations/{orgId}/courses/{courseId}/assignments/{assignmentId}/submissions")
    @PreAuthorize("hasAnyRole('ROLE_INSTRUCTOR', 'ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<SubmissionDto>>> submissions(
            @PathVariable Long orgId, @PathVariable Long courseId, @PathVariable Long assignmentId) {
        return ResponseEntity.ok(ApiResponse.success(
                assignmentService.getSubmissions(orgId, courseId, assignmentId)));
    }

    @PatchMapping("/api/organizations/{orgId}/courses/{courseId}/submissions/{submissionId}/grade")
    @PreAuthorize("hasAnyRole('ROLE_INSTRUCTOR', 'ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SubmissionDto>> grade(
            @PathVariable Long orgId, @PathVariable Long courseId,
            @PathVariable Long submissionId,
            @RequestBody GradeRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Graded successfully",
                assignmentService.grade(orgId, courseId, submissionId, req.getGrade(), req.getFeedback())));
    }

    @GetMapping("/api/me/submissions")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<ApiResponse<List<SubmissionDto>>> mySubmissions() {
        return ResponseEntity.ok(ApiResponse.success(assignmentService.getMySubmissions()));
    }

    record SubmitRequest(String content, String fileUrl) {}
    record GradeRequest(Double grade, String feedback) {}
}
