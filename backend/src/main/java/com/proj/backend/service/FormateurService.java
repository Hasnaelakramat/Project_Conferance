package com.proj.backend.service;


import com.proj.backend.model.Conference;
import com.proj.backend.model.DTO.FormateurDTO;
import com.proj.backend.model.Formateur;
import com.proj.backend.model.RoleName;
import com.proj.backend.repository.FormateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

// FormateurService.java
@Service
public class FormateurService {

    @Autowired
    private FormateurRepository formateurRepository;

    public void subscribeAsFormateur(Formateur formateur) {
        // Create Formateur
        Formateur newformateur = new Formateur();
        newformateur.setNom(formateur.getNom());
        newformateur.setPrenom(formateur.getPrenom());
        newformateur.setEmail(formateur.getEmail());
        newformateur.setMotDePasse(formateur.getMotDePasse());
        newformateur.setTele(formateur.getTele());
        newformateur.setImagePath(formateur.getImagePath());
        newformateur.setVille(formateur.getVille());
        newformateur.setDomaine(formateur.getDomaine());
        newformateur.setCv(formateur.getCv());

        newformateur.setRole(RoleName.ROLE_FORMATEUR);

        // Save Formateur
        formateurRepository.save(newformateur);
    }

    public Formateur addFormateur(Formateur formateur) {
        return formateurRepository.save(formateur);
    }

    public void deleteFormateur(Long formateurId) {
        formateurRepository.deleteById(formateurId);
    }

    public List<Formateur> getAllFormateurs() {
        return formateurRepository.findAll();
    }

    public Formateur getFormateurById(Long formateurId) {
        return formateurRepository.findById(formateurId)
                .orElseThrow(() -> new EntityNotFoundException("Formateur not found"));
    }

    private List<Map<String, Object>> getConferenceDetailsList(Formateur formateur) {
        List<Map<String, Object>> conferenceDetailsList = new ArrayList<>();

        for (Conference conference : formateur.getConferences()) {
            Map<String, Object> conferenceDetails = new HashMap<>();
            conferenceDetails.put("id", conference.getId());
            conferenceDetails.put("title", conference.getTitle());
            conferenceDetails.put("description", conference.getDescription());
            // Add other conference details as needed

            conferenceDetailsList.add(conferenceDetails);
        }

        return conferenceDetailsList;
    }
    public Map<String, Object> getDetailedInfo(Formateur formateur) {
        Map<String, Object> formateurDetails = new HashMap<>();
        formateurDetails.put("id", formateur.getId());
        formateurDetails.put("nom", formateur.getNom());
        formateurDetails.put("prenom", formateur.getPrenom());
        formateurDetails.put("email", formateur.getEmail());
        formateurDetails.put("tele",formateur.getTele());
        formateurDetails.put("imagePath", formateur.getImagePath());
        formateurDetails.put("ville", formateur.getVille());
        formateurDetails.put("role", formateur.getRole());
        formateurDetails.put("domaine", formateur.getDomaine());
        formateurDetails.put("cv", formateur.getCv());
        formateurDetails.put("status", formateur.getStatus());

        // Convert conferences to a list of detailed representations
        //List<Map<String, Object>> conferenceDetailsList = getConferenceDetailsList();
        //formateurDetails.put("conferences", conferenceDetailsList);

        return formateurDetails;
    }

    public Formateur updateFormateur(Long formateurId, Formateur updatedFormateur) {
        Optional<Formateur> existingFormateurOptional = formateurRepository.findById(formateurId);

        if (existingFormateurOptional.isPresent()) {
            Formateur existingFormateur = existingFormateurOptional.get();
            // Update fields as needed
            existingFormateur.setDomaine(updatedFormateur.getDomaine());
            existingFormateur.setTele(updatedFormateur.getTele());
            existingFormateur.setMotDePasse(updatedFormateur.getMotDePasse());
            existingFormateur.setImagePath(updatedFormateur.getImagePath());
            existingFormateur.setVille(updatedFormateur.getVille());


            // Save the updated user
            return formateurRepository.save(existingFormateur);
        } else {
            // Handle user not found
            return null;
        }
    }

    public List<FormateurDTO> getFormateurWithStatusZero() {
        List<Formateur> formateursWithStatusZero = formateurRepository.findByStatus(0);
        return formateursWithStatusZero.stream()
                .map(this::mapToFormateurDTO)
                .collect(Collectors.toList());
    }

    public FormateurDTO mapToFormateurDTO(Formateur formateur) {
        FormateurDTO formateurDTO = new FormateurDTO();
        formateurDTO.setId(formateur.getId());
        formateurDTO.setNom(formateur.getNom());
        formateurDTO.setPrenom(formateur.getPrenom());
        formateurDTO.setEmail(formateur.getEmail());
        formateurDTO.setTele(formateur.getTele());
        formateurDTO.setImagePath(formateur.getImagePath());
        formateurDTO.setVille(formateur.getVille());
        formateurDTO.setDomaine(formateur.getDomaine());
        formateurDTO.setCv(formateur.getCv());
        return formateurDTO;
    }

}

