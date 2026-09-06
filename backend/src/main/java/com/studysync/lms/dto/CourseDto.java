package com.studysync.lms.dto;

import com.studysync.lms.domain.Course;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CourseDto {
    private Long id;
    private String title;
    private String code;
    private String description;
    private String category;
    private String thumbnail;
    private Integer credits;
    private Integer capacity;
    private String status;
    private Long organizationId;
    private Long instructorId;
    private String instructorName;
    private Long departmentId;
    private String departmentName;
    private LocalDateTime createdAt;
    private Long enrollmentCount;

    public static CourseDto from(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setCode(course.getCode());
        dto.setDescription(course.getDescription());
        dto.setCategory(course.getCategory());
        dto.setThumbnail(course.getThumbnail());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());
        dto.setStatus(course.getStatus().name());
        dto.setOrganizationId(course.getOrganization().getId());
        dto.setCreatedAt(course.getCreatedAt());
        if (course.getInstructor() != null) {
            dto.setInstructorId(course.getInstructor().getId());
            dto.setInstructorName(course.getInstructor().getName());
        }
        if (course.getDepartment() != null) {
            dto.setDepartmentId(course.getDepartment().getId());
            dto.setDepartmentName(course.getDepartment().getName());
        }
        return dto;
    }
}
