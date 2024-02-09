package com.proj.backend.repository;

import com.proj.backend.model.Role;
import com.proj.backend.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Role,Long> {
    Optional<Role> findByName(RoleName roleName);
}
