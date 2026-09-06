package com.studysync.lms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCourseRequest {
    @NotBlank(message = "Course title is required")
    private String title;

    @NotBlank(message = "Course code is required")
    private String code;

    private String description;
    private String category;
    private String thumbnail;
    private Integer credits;
    private Integer capacity;
    private Long instructorId;
    private Long departmentId;
}
