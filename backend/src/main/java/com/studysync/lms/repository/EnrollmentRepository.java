package com.studysync.lms.repository;

import com.studysync.lms.domain.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
    long countByCourseId(Long courseId);
    long countByStudentId(Long studentId);

    @Query("SELECT e FROM Enrollment e WHERE e.course.organization.id = :orgId")
    List<Enrollment> findByOrganizationId(@Param("orgId") Long orgId);

    @Query("SELECT COUNT(DISTINCT e.student.id) FROM Enrollment e WHERE e.course.organization.id = :orgId")
    long countStudentsByOrganizationId(@Param("orgId") Long orgId);
}
