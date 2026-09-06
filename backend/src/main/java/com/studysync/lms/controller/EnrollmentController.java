package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    /** Student: get own enrollments */
    @GetMapping("/api/me/enrollments")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<ApiResponse<List<EnrollmentDto>>> myEnrollments() {
        return ResponseEntity.ok(ApiResponse.success(enrollmentService.getMyEnrollments()));
    }

    /** Student: self-enroll in a course */
    @PostMapping("/api/organizations/{orgId}/courses/{courseId}/enroll")
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<ApiResponse<EnrollmentDto>> enroll(
            @PathVariable Long orgId, @PathVariable Long courseId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Enrolled successfully", enrollmentService.enroll(orgId, courseId)));
    }

    /** Admin: manually enroll a specific student */
    @PostMapping("/api/organizations/{orgId}/courses/{courseId}/enrollments/{studentId}")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<EnrollmentDto>> adminEnroll(
            @PathVariable Long orgId, @PathVariable Long courseId, @PathVariable Long studentId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Student enrolled successfully",
                        enrollmentService.adminEnroll(orgId, courseId, studentId)));
    }

    /** Org Admin / Instructor: list all enrollments for a course */
    @GetMapping("/api/organizations/{orgId}/courses/{courseId}/enrollments")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_INSTRUCTOR', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<EnrollmentDto>>> courseEnrollments(
            @PathVariable Long orgId, @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.success(
                enrollmentService.getEnrollmentsByCourse(orgId, courseId)));
    }

    /** Org Admin: list all enrollments for entire organization */
    @GetMapping("/api/organizations/{orgId}/enrollments")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<EnrollmentDto>>> orgEnrollments(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(
                enrollmentService.getEnrollmentsByOrganization(orgId)));
    }

    /** Update student progress */
    @PatchMapping("/api/organizations/{orgId}/enrollments/{enrollmentId}/progress")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<EnrollmentDto>> updateProgress(
            @PathVariable Long orgId,
            @PathVariable Long enrollmentId,
            @RequestParam Double progress) {
        return ResponseEntity.ok(ApiResponse.success("Progress updated",
                enrollmentService.updateProgress(orgId, enrollmentId, progress)));
    }
}
