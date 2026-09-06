package com.studysync.lms.service;

import com.studysync.lms.domain.*;
import com.studysync.lms.dto.*;
import com.studysync.lms.exception.BadRequestException;
import com.studysync.lms.exception.ResourceNotFoundException;
import com.studysync.lms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public OrganizationDto registerOrganization(CreateOrganizationRequest req) {
        if (organizationRepository.existsBySlug(req.getSlug())) {
            throw new BadRequestException("Organization slug '" + req.getSlug() + "' is already taken");
        }
        if (organizationRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("An organization with this email already exists");
        }
        if (userRepository.existsByEmail(req.getAdminEmail())) {
            throw new BadRequestException("Email '" + req.getAdminEmail() + "' is already registered");
        }

        // Create organization
        Organization org = Organization.builder()
                .name(req.getName())
                .slug(req.getSlug())
                .email(req.getEmail())
                .phone(req.getPhone())
                .address(req.getAddress())
                .website(req.getWebsite())
                .description(req.getDescription())
                .status(Organization.OrgStatus.ACTIVE)
                .subscriptionPlan(Organization.SubscriptionPlan.FREE)
                .build();
        org = organizationRepository.save(org);

        // Create org admin user
        Role orgAdminRole = roleRepository.findByName(RoleName.ROLE_ORG_ADMIN)
                .orElseThrow(() -> new RuntimeException("Role ROLE_ORG_ADMIN not found — run data.sql seed first"));
        Set<Role> roles = new HashSet<>();
        roles.add(orgAdminRole);

        User admin = User.builder()
                .name(req.getAdminName())
                .email(req.getAdminEmail())
                .password(passwordEncoder.encode(req.getAdminPassword()))
                .organization(org)
                .roles(roles)
                .active(true)
                .build();
        userRepository.save(admin);

        OrganizationDto dto = OrganizationDto.from(org);
        dto.setTotalStudents(0L);
        dto.setTotalInstructors(0L);
        dto.setTotalCourses(0L);
        return dto;
    }

    public List<OrganizationDto> getAllOrganizations() {
        return organizationRepository.findAll().stream()
                .map(org -> {
                    OrganizationDto dto = OrganizationDto.from(org);
                    dto.setTotalStudents(enrollmentRepository.countStudentsByOrganizationId(org.getId()));
                    dto.setTotalCourses(courseRepository.countByOrganizationId(org.getId()));
                    dto.setTotalInstructors(userRepository.countByOrganizationIdAndRole(org.getId(), RoleName.ROLE_INSTRUCTOR));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public OrganizationDto getOrganizationById(Long id) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", id));
        OrganizationDto dto = OrganizationDto.from(org);
        dto.setTotalStudents(enrollmentRepository.countStudentsByOrganizationId(id));
        dto.setTotalCourses(courseRepository.countByOrganizationId(id));
        dto.setTotalInstructors(userRepository.countByOrganizationIdAndRole(id, RoleName.ROLE_INSTRUCTOR));
        return dto;
    }

    @Transactional
    public OrganizationDto updateStatus(Long id, String status) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization", id));
        org.setStatus(Organization.OrgStatus.valueOf(status.toUpperCase()));
        return OrganizationDto.from(organizationRepository.save(org));
    }
}
