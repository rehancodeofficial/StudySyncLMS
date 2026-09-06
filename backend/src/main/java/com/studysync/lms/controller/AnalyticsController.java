package com.studysync.lms.controller;

import com.studysync.lms.dto.ApiResponse;
import com.studysync.lms.repository.*;
import com.studysync.lms.security.services.UserDetailsImpl;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AnalyticsController {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    /**
     * Platform-level stats for Super Admin
     */
    @GetMapping("/platform")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> platformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrganizations", organizationRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCourses", courseRepository.count());
        stats.put("totalEnrollments", enrollmentRepository.count());
        return ResponseEntity.ok(ApiResponse.success("Platform analytics", stats));
    }

    /**
     * Organization-level stats for Org Admin
     */
    @GetMapping("/organizations/{orgId}")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> orgStats(
            @PathVariable Long orgId, Authentication authentication) {
        UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();
        boolean isSuperAdmin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_SUPER_ADMIN"));
        if (!isSuperAdmin && !orgId.equals(user.getOrganizationId())) {
            return ResponseEntity.status(403).body(ApiResponse.error("Access denied"));
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", userRepository.countByOrganizationIdAndRole(orgId,
                com.studysync.lms.domain.RoleName.ROLE_STUDENT));
        stats.put("totalInstructors", userRepository.countByOrganizationIdAndRole(orgId,
                com.studysync.lms.domain.RoleName.ROLE_INSTRUCTOR));
        stats.put("totalCourses", courseRepository.countByOrganizationId(orgId));
        stats.put("totalEnrollments", (long) enrollmentRepository.findByOrganizationId(orgId).size());
        return ResponseEntity.ok(ApiResponse.success("Organization analytics", stats));
    }
}
