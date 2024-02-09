package com.proj.backend.repository;

import com.proj.backend.model.Admin;
import com.proj.backend.model.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonneRepository extends JpaRepository<Personne,Long> {
    Optional<Personne> findByEmail(String email);
    boolean existsByEmail(String email);
}
