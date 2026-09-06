package com.studysync.lms.repository;

import com.studysync.lms.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCourseId(Long courseId);
    Optional<Assignment> findByIdAndCourseId(Long id, Long courseId);
    List<Assignment> findByCourseOrganizationId(Long organizationId);
}
