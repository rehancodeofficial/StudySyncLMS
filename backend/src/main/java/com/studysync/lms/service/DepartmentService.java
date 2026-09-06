package com.studysync.lms.service;

import com.studysync.lms.domain.Department;
import com.studysync.lms.domain.Organization;
import com.studysync.lms.dto.DepartmentDto;
import com.studysync.lms.exception.BadRequestException;
import com.studysync.lms.exception.ResourceNotFoundException;
import com.studysync.lms.exception.TenantAccessDeniedException;
import com.studysync.lms.repository.DepartmentRepository;
import com.studysync.lms.repository.OrganizationRepository;
import com.studysync.lms.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final OrganizationRepository organizationRepository;

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

    public List<DepartmentDto> getDepartmentsByOrg(Long orgId) {
        assertTenantAccess(orgId);
        return departmentRepository.findByOrganizationId(orgId)
                .stream().map(DepartmentDto::from).collect(Collectors.toList());
    }

    @Transactional
    public DepartmentDto create(Long orgId, String name, String code, String description) {
        assertTenantAccess(orgId);
        if (departmentRepository.existsByNameAndOrganizationId(name, orgId)) {
            throw new BadRequestException("Department '" + name + "' already exists in this organization");
        }
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", orgId));
        Department dept = Department.builder()
                .name(name).code(code).description(description).organization(org).build();
        return DepartmentDto.from(departmentRepository.save(dept));
    }

    @Transactional
    public void delete(Long orgId, Long deptId) {
        assertTenantAccess(orgId);
        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department", deptId));
        if (!orgId.equals(dept.getOrganization().getId())) throw new TenantAccessDeniedException();
        departmentRepository.delete(dept);
    }
}
