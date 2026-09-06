package com.studysync.lms.dto;

import com.studysync.lms.domain.Organization;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrganizationDto {
    private Long id;
    private String name;
    private String slug;
    private String email;
    private String phone;
    private String address;
    private String website;
    private String description;
    private String logo;
    private String status;
    private String subscriptionPlan;
    private Integer studentLimit;
    private Integer instructorLimit;
    private Integer courseLimit;
    private LocalDateTime createdAt;

    // Stats (populated optionally)
    private Long totalStudents;
    private Long totalInstructors;
    private Long totalCourses;

    public static OrganizationDto from(Organization org) {
        OrganizationDto dto = new OrganizationDto();
        dto.setId(org.getId());
        dto.setName(org.getName());
        dto.setSlug(org.getSlug());
        dto.setEmail(org.getEmail());
        dto.setPhone(org.getPhone());
        dto.setAddress(org.getAddress());
        dto.setWebsite(org.getWebsite());
        dto.setDescription(org.getDescription());
        dto.setLogo(org.getLogo());
        dto.setStatus(org.getStatus().name());
        dto.setSubscriptionPlan(org.getSubscriptionPlan().name());
        dto.setStudentLimit(org.getStudentLimit());
        dto.setInstructorLimit(org.getInstructorLimit());
        dto.setCourseLimit(org.getCourseLimit());
        dto.setCreatedAt(org.getCreatedAt());
        return dto;
    }
}
