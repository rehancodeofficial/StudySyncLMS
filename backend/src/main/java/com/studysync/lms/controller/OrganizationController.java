package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.OrganizationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrganizationController {

    private final OrganizationService organizationService;

    /**
     * Public — called during tenant onboarding/registration flow.
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<OrganizationDto>> register(
            @Valid @RequestBody CreateOrganizationRequest request) {
        OrganizationDto org = organizationService.registerOrganization(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Organization registered successfully", org));
    }

    /**
     * Platform Super Admin only — list all tenants.
     */
    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<OrganizationDto>>> listAll() {
        return ResponseEntity.ok(ApiResponse.success(organizationService.getAllOrganizations()));
    }

    /**
     * Platform Super Admin or the Org Admin of this specific org.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN') or hasRole('ROLE_ORG_ADMIN')")
    public ResponseEntity<ApiResponse<OrganizationDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(organizationService.getOrganizationById(id)));
    }

    /**
     * Platform Super Admin only — suspend/activate tenants.
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<OrganizationDto>> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success(
                "Organization status updated", organizationService.updateStatus(id, status)));
    }
}
