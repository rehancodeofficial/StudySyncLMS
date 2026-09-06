package com.studysync.lms.dto;

import com.studysync.lms.domain.Assignment;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AssignmentDto {
    private Long id;
    private String title;
    private String description;
    private Double maxMarks;
    private LocalDateTime dueDate;
    private String status;
    private Long courseId;
    private String courseTitle;
    private LocalDateTime createdAt;

    public static AssignmentDto from(Assignment a) {
        AssignmentDto dto = new AssignmentDto();
        dto.setId(a.getId());
        dto.setTitle(a.getTitle());
        dto.setDescription(a.getDescription());
        dto.setMaxMarks(a.getMaxMarks());
        dto.setDueDate(a.getDueDate());
        dto.setStatus(a.getStatus().name());
        dto.setCreatedAt(a.getCreatedAt());
        if (a.getCourse() != null) {
            dto.setCourseId(a.getCourse().getId());
            dto.setCourseTitle(a.getCourse().getTitle());
        }
        return dto;
    }
}
