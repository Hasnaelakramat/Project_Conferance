package com.proj.backend.repository;

import com.proj.backend.model.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    Optional<Commentaire> findById(Long commentaireId);
    List<Commentaire> findByConference_Id(Long conferenceId);


}
