package com.studysync.lms.repository;

import com.studysync.lms.domain.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByOrganizationId(Long organizationId);
    Optional<Course> findByIdAndOrganizationId(Long id, Long organizationId);
    List<Course> findByOrganizationIdAndInstructorId(Long organizationId, Long instructorId);
    boolean existsByCodeAndOrganizationId(String code, Long organizationId);
    long countByOrganizationId(Long organizationId);

    @Query("SELECT c FROM Course c WHERE c.organization.id = :orgId AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           " LOWER(c.code) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<Course> searchByOrganization(@Param("orgId") Long orgId, @Param("q") String q, Pageable pageable);
}
