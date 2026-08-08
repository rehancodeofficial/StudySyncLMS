package com.studysync.lms.repository;

import com.studysync.lms.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(Long courseId);
}
