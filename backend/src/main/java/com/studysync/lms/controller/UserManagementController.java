package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.UserManagementService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations/{orgId}/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDto>>> listAll(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(userManagementService.getUsersByOrg(orgId)));
    }

    @GetMapping("/instructors")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDto>>> instructors(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(userManagementService.getInstructorsByOrg(orgId)));
    }

    @GetMapping("/students")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_INSTRUCTOR', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDto>>> students(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(userManagementService.getStudentsByOrg(orgId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<UserDto>> create(
            @PathVariable Long orgId,
            @RequestBody CreateUserRequest req) {
        UserDto dto = userManagementService.createUser(orgId, req.getName(), req.getEmail(),
                req.getPassword(), req.getRole());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", dto));
    }

    @PatchMapping("/{userId}/toggle-status")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<UserDto>> toggleStatus(
            @PathVariable Long orgId, @PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success(
                "User status updated", userManagementService.toggleUserStatus(orgId, userId)));
    }

    @Data
    static class CreateUserRequest {
        @NotBlank private String name;
        @NotBlank @Email private String email;
        @NotBlank private String password;
        @NotBlank private String role; // "student", "instructor", "org_admin"
    }
}
