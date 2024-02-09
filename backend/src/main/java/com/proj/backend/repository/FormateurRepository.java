package com.proj.backend.repository;

import com.proj.backend.model.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormateurRepository extends JpaRepository<Formateur, Long> {
    // Add custom query methods if needed
    List<Formateur> findByStatus(int status);
    Optional<Formateur> findByEmail(String email);
    boolean existsByEmail(String email);
}
