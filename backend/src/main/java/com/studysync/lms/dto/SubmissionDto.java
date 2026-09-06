package com.studysync.lms.dto;

import com.studysync.lms.domain.Submission;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubmissionDto {
    private Long id;
    private Long assignmentId;
    private String assignmentTitle;
    private Long studentId;
    private String studentName;
    private String content;
    private String fileUrl;
    private String status;
    private Double grade;
    private String feedback;
    private LocalDateTime submittedAt;
    private LocalDateTime gradedAt;

    public static SubmissionDto from(Submission s) {
        SubmissionDto dto = new SubmissionDto();
        dto.setId(s.getId());
        dto.setContent(s.getContent());
        dto.setFileUrl(s.getFileUrl());
        dto.setStatus(s.getStatus().name());
        dto.setGrade(s.getGrade());
        dto.setFeedback(s.getFeedback());
        dto.setSubmittedAt(s.getSubmittedAt());
        dto.setGradedAt(s.getGradedAt());
        if (s.getAssignment() != null) {
            dto.setAssignmentId(s.getAssignment().getId());
            dto.setAssignmentTitle(s.getAssignment().getTitle());
        }
        if (s.getStudent() != null) {
            dto.setStudentId(s.getStudent().getId());
            dto.setStudentName(s.getStudent().getName());
        }
        return dto;
    }
}
