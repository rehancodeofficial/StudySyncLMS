package com.studysync.lms.service;

import com.studysync.lms.domain.*;
import com.studysync.lms.dto.UserDto;
import com.studysync.lms.exception.*;
import com.studysync.lms.repository.*;
import com.studysync.lms.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

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

    public List<UserDto> getUsersByOrg(Long orgId) {
        assertTenantAccess(orgId);
        return userRepository.findByOrganizationId(orgId).stream()
                .map(UserDto::from).collect(Collectors.toList());
    }

    public List<UserDto> getInstructorsByOrg(Long orgId) {
        assertTenantAccess(orgId);
        return userRepository.findByOrganizationIdAndRole(orgId, RoleName.ROLE_INSTRUCTOR)
                .stream().map(UserDto::from).collect(Collectors.toList());
    }

    public List<UserDto> getStudentsByOrg(Long orgId) {
        assertTenantAccess(orgId);
        return userRepository.findByOrganizationIdAndRole(orgId, RoleName.ROLE_STUDENT)
                .stream().map(UserDto::from).collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(Long orgId, String name, String email, String password, String roleName) {
        assertTenantAccess(orgId);
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email '" + email + "' is already registered");
        }

        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", orgId));

        // Enforce subscription limits
        RoleName role;
        try {
            role = RoleName.valueOf("ROLE_" + roleName.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role: " + roleName);
        }

        if (role == RoleName.ROLE_STUDENT) {
            long count = userRepository.countByOrganizationIdAndRole(orgId, RoleName.ROLE_STUDENT);
            if (count >= org.getStudentLimit()) {
                throw new BadRequestException("Student limit reached (" + org.getStudentLimit() +
                        ") for your " + org.getSubscriptionPlan() + " plan");
            }
        } else if (role == RoleName.ROLE_INSTRUCTOR) {
            long count = userRepository.countByOrganizationIdAndRole(orgId, RoleName.ROLE_INSTRUCTOR);
            if (count >= org.getInstructorLimit()) {
                throw new BadRequestException("Instructor limit reached (" + org.getInstructorLimit() +
                        ") for your " + org.getSubscriptionPlan() + " plan");
            }
        }

        Role userRole = roleRepository.findByName(role)
                .orElseThrow(() -> new RuntimeException("Role not found: " + role));

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .organization(org)
                .roles(new HashSet<>(Set.of(userRole)))
                .active(true)
                .build();

        return UserDto.from(userRepository.save(user));
    }

    @Transactional
    public UserDto toggleUserStatus(Long orgId, Long userId) {
        assertTenantAccess(orgId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        if (user.getOrganization() == null || !orgId.equals(user.getOrganization().getId())) {
            throw new TenantAccessDeniedException();
        }
        user.setActive(!user.getActive());
        return UserDto.from(userRepository.save(user));
    }
}
