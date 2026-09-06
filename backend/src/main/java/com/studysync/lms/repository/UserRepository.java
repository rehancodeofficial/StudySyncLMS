package com.studysync.lms.repository;

import com.studysync.lms.domain.User;
import com.studysync.lms.domain.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByOrganizationId(Long organizationId);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.organization.id = :orgId AND r.name = :roleName")
    List<User> findByOrganizationIdAndRole(@Param("orgId") Long orgId, @Param("roleName") RoleName roleName);

    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE u.organization.id = :orgId AND r.name = :roleName")
    long countByOrganizationIdAndRole(@Param("orgId") Long orgId, @Param("roleName") RoleName roleName);
}
