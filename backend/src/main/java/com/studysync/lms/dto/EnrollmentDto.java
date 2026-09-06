package com.studysync.lms.dto;

import com.studysync.lms.domain.Enrollment;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EnrollmentDto {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Long courseId;
    private String courseTitle;
    private String courseCode;
    private String status;
    private Double progress;
    private Double finalGrade;
    private LocalDateTime enrolledAt;
    private LocalDateTime completionDate;

    public static EnrollmentDto from(Enrollment e) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(e.getId());
        dto.setStatus(e.getStatus().name());
        dto.setProgress(e.getProgress());
        dto.setFinalGrade(e.getFinalGrade());
        dto.setEnrolledAt(e.getEnrolledAt());
        dto.setCompletionDate(e.getCompletionDate());
        if (e.getStudent() != null) {
            dto.setStudentId(e.getStudent().getId());
            dto.setStudentName(e.getStudent().getName());
            dto.setStudentEmail(e.getStudent().getEmail());
        }
        if (e.getCourse() != null) {
            dto.setCourseId(e.getCourse().getId());
            dto.setCourseTitle(e.getCourse().getTitle());
            dto.setCourseCode(e.getCourse().getCode());
        }
        return dto;
    }
}
