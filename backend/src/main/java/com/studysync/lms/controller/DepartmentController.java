package com.studysync.lms.controller;

import com.studysync.lms.dto.*;
import com.studysync.lms.service.DepartmentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

@RestController
@RequestMapping("/api/organizations/{orgId}/departments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<DepartmentDto>>> list(@PathVariable Long orgId) {
        return ResponseEntity.ok(ApiResponse.success(departmentService.getDepartmentsByOrg(orgId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<DepartmentDto>> create(
            @PathVariable Long orgId,
            @RequestBody CreateDepartmentRequest req) {
        DepartmentDto dto = departmentService.create(orgId, req.getName(), req.getCode(), req.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Department created", dto));
    }

    @DeleteMapping("/{deptId}")
    @PreAuthorize("hasAnyRole('ROLE_ORG_ADMIN', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long orgId, @PathVariable Long deptId) {
        departmentService.delete(orgId, deptId);
        return ResponseEntity.ok(ApiResponse.success("Department deleted", null));
    }

    @Data
    static class CreateDepartmentRequest {
        @NotBlank
        private String name;
        private String code;
        private String description;
    }
}
