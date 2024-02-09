package com.proj.backend.service;


import com.proj.backend.model.Commentaire;
import com.proj.backend.model.Conference;
import com.proj.backend.model.DTO.CommentaireDTO;
import com.proj.backend.model.Personne;
import com.proj.backend.repository.CommentaireRepository;
import com.proj.backend.repository.ConferenceRepository;
import com.proj.backend.repository.PersonneRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentaireService {

    @Autowired
    private PersonneRepository personneRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private ConferenceRepository conferenceRepository;
    @Autowired
    private PersonneService personneService;


    public Commentaire ajouterCommentaire(Commentaire commentaire, Long personneId, Long conferenceId) {
        // Associer directement les IDs de la personne et de la conférence au commentaire
        commentaire.setPersonne(new Personne());
        commentaire.getPersonne().setId(personneId);

        commentaire.setConference(new Conference());
        commentaire.getConference().setId(conferenceId);

        // Assurez-vous que la date est correctement configurée
        commentaire.setDate(LocalDateTime.now()); // Vous pouvez ajuster cela selon vos besoins

        // Sauvegarder le commentaire dans la base de données
        return commentaireRepository.save(commentaire);
    }


    public boolean updateCommentaireByPersonne(Long commentaireId, Commentaire updatedCommentaire, Long personneId, Long conferenceId) {
        Optional<Commentaire> existingCommentaireOptional = commentaireRepository.findById(commentaireId);
        if (existingCommentaireOptional.isEmpty()) {
            return false;
        }

        Commentaire existingCommentaire = existingCommentaireOptional.get();

        // Check if the personne is the owner of the comment
        if (!existingCommentaire.getPersonne().getId().equals(personneId)) {
            return false;
        }

        // Check if the conference ID matches (optional, based on your requirements)
        if (!existingCommentaire.getConference().getId().equals(conferenceId)) {
            return false;
        }

        // Update the fields of the existing comment with the values from updatedCommentaire
        existingCommentaire.setContenu(updatedCommentaire.getContenu());

        // You might want to perform additional validations or business logic here
        // Save the updated comment
        commentaireRepository.save(existingCommentaire);
        return true;
    }

    public CommentaireDTO updateCommentaire(Long commentaireId, CommentaireDTO updatedCommentaireDTO) {
        Commentaire updatedEntity = commentaireRepository.findById(commentaireId)
                .orElseThrow(() -> new EntityNotFoundException("Commentaire not found with id: " + commentaireId));

        // Update fields based on what you want to allow updating
        updatedEntity.setContenu(updatedCommentaireDTO.getContenu());
        // Update other fields as needed

        Commentaire savedEntity = commentaireRepository.save(updatedEntity);

        return convertToDTO(savedEntity);
    }

    public boolean deleteCommentaireByPersonne(Long commentaireId, Long personneId) {
        Optional<Commentaire> existingCommentaireOptional = commentaireRepository.findById(commentaireId);
        if (existingCommentaireOptional.isEmpty()) {
            return false;
        }

        Commentaire existingCommentaire = existingCommentaireOptional.get();

        // Check if the personne is the owner of the comment
        if (!existingCommentaire.getPersonne().getId().equals(personneId)) {
            return false;
        }

        // You might want to perform additional validations or business logic here

        // Delete the comment
        commentaireRepository.deleteById(commentaireId);
        return true;
    }

    public List<CommentaireDTO> getCommentairesByConference(Long conferenceId) {
        List<Commentaire> commentaires = commentaireRepository.findByConference_Id(conferenceId);
        return commentaires.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CommentaireDTO convertToDTO(Commentaire commentaire) {
        CommentaireDTO dto = new CommentaireDTO();
        dto.setId(commentaire.getId());
        dto.setContenu(commentaire.getContenu());
        dto.setDate(commentaire.getDate());
        dto.setPersonneName(commentaire.getPersonne().getNom()); // Replace with the actual method to get person's name
        // Add other fields as needed
        return dto;
    }

}
