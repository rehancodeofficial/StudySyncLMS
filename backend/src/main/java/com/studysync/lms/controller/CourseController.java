package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations/{orgId}/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<CourseDto>>> list(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getCoursesByOrganization(orgId)));
    }

    @GetMapping("/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CourseDto>> get(@PathVariable Long orgId, @PathVariable Long courseId) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getCourseById(orgId, courseId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> create(
            @PathVariable Long orgId,
            @Valid @RequestBody CreateCourseRequest request) {
        CourseDto dto = courseService.createCourse(orgId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Course created successfully", dto));
    }

    @PatchMapping("/{courseId}/status")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_INSTRUCTOR', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> updateStatus(
            @PathVariable Long orgId,
            @PathVariable Long courseId,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success(
                "Course status updated", courseService.updateCourseStatus(orgId, courseId, status)));
    }

    @DeleteMapping("/{courseId}")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long orgId, @PathVariable Long courseId) {
        courseService.deleteCourse(orgId, courseId);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }
}
