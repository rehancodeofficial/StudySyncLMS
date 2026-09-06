package com.studysync.lms.repository;

import com.studysync.lms.domain.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentId(Long assignmentId);
    Optional<Submission> findByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
    List<Submission> findByStudentId(Long studentId);
    boolean existsByAssignmentIdAndStudentId(Long assignmentId, Long studentId);
}
