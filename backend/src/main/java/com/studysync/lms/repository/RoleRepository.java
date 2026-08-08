package com.studysync.lms.repository;

import com.studysync.lms.domain.Role;
import com.studysync.lms.domain.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
