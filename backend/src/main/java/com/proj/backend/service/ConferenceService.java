package com.proj.backend.service;


import com.proj.backend.model.Conference;
import com.proj.backend.model.ConferenceRequest;
import com.proj.backend.model.DTO.ConferenceDTO;
import com.proj.backend.model.Formateur;
import com.proj.backend.model.Niveau;
import com.proj.backend.repository.ConferenceRepository;
import com.proj.backend.repository.FormateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConferenceService {
    @Autowired
    private ConferenceRepository conferenceRepository;
    @Autowired
    private FormateurRepository formateurRepository;

    public String createConference(ConferenceRequest conferenceRequest, Long formateurId) {
        try {
            // Extract conference details and invited formateur IDs from the request
            Conference conference = conferenceRequest.getConference();
            List<Long> additionalFormateurIds = conferenceRequest.getAdditionalFormateurIds();

            // Log the received JSON payload to standard output
            System.out.println("Received JSON Payload: " + conferenceRequest.toString());

            // Validate the input data, e.g., check if the conference details are valid

            // Retrieve the main Formateur using formateurId from the path
            Formateur mainFormateur = formateurRepository.findById(formateurId).orElse(null);

            // Check if the main Formateur has status=1
            if (mainFormateur != null && mainFormateur.getStatus() == 1) {
                // Set the main Formateur in the Conference
                conference.setFormateur(mainFormateur);

                // Set the formateurId in the Conference
                conference.setFormateurId(formateurId);

                // Check the status of additional formateurs
                List<Formateur> additionalFormateurs = formateurRepository.findAllById(additionalFormateurIds);
                boolean hasFormateurWithStatusZero = additionalFormateurs.stream().anyMatch(formateur -> formateur.getStatus() == 0);

                if (hasFormateurWithStatusZero) {
                    System.err.println("Error: Cannot invite formateurs with status 0. Conference creation aborted.");
                    return "Error: Cannot invite formateurs with status 0. Conference creation aborted.";
                }

                // Save the conference
                Conference createdConference = conferenceRepository.save(conference);

                // Log the created conference to standard output
                System.out.println("Created Conference: " + createdConference.toString());

                if (createdConference != null) {
                    // Add the main formateur to the formateurs set
                    createdConference.getFormateurs().add(mainFormateur);

                    // Your logic to invite additional formateurs to the conference
                    inviteAdditionalFormateursToConference(createdConference, additionalFormateurIds);

                    // Save the conference again to update the formateurs set
                    Conference updatedConference = conferenceRepository.save(createdConference);

                    // Log the updated conference to standard output
                    System.out.println("Updated Conference: " + updatedConference.toString());

                    // Return the updated conference
                    return "created successfully";
                } else {
                    // Log an error if conference creation fails
                    return "Error: Conference creation failed.";
                }
            } else {
                // Log an error if the main Formateur's status is not 1
                System.err.println("Error: Main Formateur's status is not 1. Conference creation aborted.");
                return "Error: Main Formateur's status is not 1. Conference creation aborted.";
            }
        } catch (DataAccessException e) {
            // Log the exception for debugging to standard error
            e.printStackTrace();
            // Handle the exception as needed (e.g., return an error response)
            return "Error creating conference. Please try again.";
        }
    }
    private ResponseEntity<String> inviteAdditionalFormateursToConference(Conference conference, List<Long> additionalFormateurIds) {
        List<Formateur> additionalFormateurs = formateurRepository.findAllById(additionalFormateurIds);

        // Check if any formateur has status 0
        boolean hasFormateurWithStatusZero = additionalFormateurs.stream()
                .anyMatch(formateur -> formateur.getStatus() == 0);

        if (hasFormateurWithStatusZero) {
            return ResponseEntity.badRequest().body("Cannot invite formateurs with status 0.");
        }

        // Add only valid formateurs to the conference
        conference.getFormateurs().addAll(additionalFormateurs);
        conferenceRepository.save(conference);

        return ResponseEntity.ok("Formateurs successfully invited to the conference.");
    }

    private void associateFormateursWithConference(Conference conference, List<Formateur> formateurs) {
        // Associate formateurs with the conference
        conference.setFormateurs(new HashSet<>(formateurs));
    }

    public String rejectConference(Long conferenceId) {
        // Retrieve the Conference by ID
        Optional<Conference> optionalConference = conferenceRepository.findById(conferenceId);

        // Check if the Conference is present in the optional
        if (optionalConference.isPresent()) {
            // Delete the Conference
            conferenceRepository.deleteById(conferenceId);

            // Return a success message
            return "Conference with ID " + conferenceId + " has been rejected and removed.";
        } else {
            // Return an error message
            return "Conference with ID " + conferenceId + " not found. Rejection failed.";
        }
    }

    public String validateConference(Long conferenceId) {
        Optional<Conference> optionalConference = conferenceRepository.findById(conferenceId);
        if (optionalConference.isPresent()) {
            Conference conference = optionalConference.get();
            conference.setStatus(1); // Status validé
            conferenceRepository.save(conference);
            return "conference valide !!";
        }
        return "not validée";
    }


    public List<ConferenceDTO> getConferencesByFormateur(Long formateurId) {
        List<Conference> conferences = conferenceRepository.findByFormateur_Id(formateurId);
        return conferences.stream().map(this::mapToConferenceDTO).collect(Collectors.toList());
    }

    public  ConferenceDTO mapToConferenceDTO(Conference conference) {
        ConferenceDTO conferenceDTO = new ConferenceDTO();
        conferenceDTO.setId(conference.getId());
        conferenceDTO.setTitle(conference.getTitle());
        conferenceDTO.setDescription(conference.getDescription());
        conferenceDTO.setImage(conference.getImage());
        conferenceDTO.setCapacite(conference.getCapacite());
        conferenceDTO.setStatus(conference.getStatus());
        conferenceDTO.setPlanning(conference.getPlanning());
        conferenceDTO.setCategorie(conference.getCategorie());
        conferenceDTO.setLanguage(conference.getLanguage());
        conferenceDTO.setNiveau(conference.getNiveau());
        conferenceDTO.setAtelier(conference.isAtelier());
        conferenceDTO.setLieu(conference.getLieu());
        conferenceDTO.setDate(conference.getDate());
        conferenceDTO.setVille(conference.getVille());
        conferenceDTO.setPays(conference.getPays());
        conferenceDTO.setCertificat(conference.isCertificat());
        conferenceDTO.setNumLikes(conference.getNumLikes());
        conferenceDTO.setGratuit(conference.isGratuit());
        conferenceDTO.setAccesAll(conference.isAccesAll());
        conferenceDTO.setFormateurId(conference.getFormateur().getId());
        conferenceDTO.setFormateurName(conference.getFormateur().getNom());
        Set<Long> formateursId = conference.getFormateurs()
                .stream()
                .map(Formateur::getId)
                .collect(Collectors.toSet());
        conferenceDTO.setFormateursId(formateursId);

//        Set<String> formateursNames = conference.getFormateurs()
//                .stream()
//                .map(Formateur::getNom)
//                .collect(Collectors.toSet());
//        conferenceDTO.setFormateursNames(formateursNames);

        return conferenceDTO;
    }
    public List<ConferenceDTO> getAllConferences() {
        // Retrieve all conferences for admins
        List<Conference> conferences =  conferenceRepository.findAll();
        return conferences.stream().map(this::mapToConferenceDTO).collect(Collectors.toList());
    }

    public List<ConferenceDTO> getAllAvailableConferences() {
        // Retrieve conferences with status = 1
        List<Conference> conferences = conferenceRepository.findByStatus(1);
        return conferences.stream().map(this::mapToConferenceDTO).collect(Collectors.toList());
    }

    public ConferenceDTO getConferenceById(Long conferenceId) {
        Optional<Conference> optionalConference = conferenceRepository.findById(conferenceId);

        // Check if the conference is present in the optional
        if (optionalConference.isPresent()) {
            // Map the Conference entity to a ConferenceDTO
            return mapToConferenceDTO(optionalConference.get());
        } else {
            // Return null or throw an exception, depending on your use case
            return null;
        }
    }

    public ConferenceDTO getConferenceByTitre(String title) {
        Optional<Conference> optionalConference = conferenceRepository.findByTitle(title);

        // Check if the conference is present in the optional
        if (optionalConference.isPresent()) {
            // Map the Conference entity to a ConferenceDTO
            return mapToConferenceDTO(optionalConference.get());
        } else {
            // Return null or throw an exception, depending on your use case
            return null;
        }
    }

    public List<ConferenceDTO> getAllConferencesByCategorie(String categorie) {
        List<Conference> conferences = conferenceRepository.findByCategorie(categorie);
        return conferences.stream().map(this::mapToConferenceDTO).collect(Collectors.toList());
    }

    public List<ConferenceDTO> getAllPastConferences() {
        // Récupérer toutes les conférences depuis la base de données
        List<Conference> allConferences = conferenceRepository.findAll();

        // Filtrer les conférences qui ont déjà eu lieu (date passée)
        Date currentDate = new Date();
        List<Conference> pastConferences = allConferences.stream()
                .filter(conference -> conference.getDate().before(currentDate) && conference.getStatus()==1)
                .collect(Collectors.toList());

        // Mapper les conférences filtrées vers des objets ConferenceDTO
        return pastConferences.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }

    public List<ConferenceDTO> getConferencesByNiveau(Niveau niveau) {
        // Récupérer toutes les conférences depuis la base de données avec un niveau spécifique
        List<Conference> conferencesByNiveau = conferenceRepository.findByNiveau(niveau);

        // Mapper les conférences vers des objets ConferenceDTO
        return conferencesByNiveau.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }


    public List<ConferenceDTO> getConferencesByVille(String ville) {
        // Récupérer toutes les conférences depuis la base de données avec un niveau spécifique
        List<Conference> conferencesByVille = conferenceRepository.findByVille(ville);

        // Mapper les conférences vers des objets ConferenceDTO
        return conferencesByVille.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }

    public  List<ConferenceDTO> getConferencesWithStatusZero() {
        // Récupérer toutes les conférences depuis la base de données avec un statut égal à zéro
        List<Conference> conferencesWithStatusZero = conferenceRepository.findByStatus(0);

        // Mapper les conférences vers des objets ConferenceDTO
        return conferencesWithStatusZero.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }

    public List<ConferenceDTO> getAllUpcomingConferences() {
        // Retrieve all conferences from the database
        List<Conference> allConferences = conferenceRepository.findAll();

        // Get the current date
        Date currentDate = new Date();

        // Filter conferences that have not taken place yet (date is in the future) and have the desired status (e.g., status = 1)
        List<Conference> upcomingConferences = allConferences.stream()
                .filter(conference -> conference.getDate().after(currentDate) && conference.getStatus() == 1)
                .collect(Collectors.toList());

        // Map the filtered conferences to ConferenceDTO objects
        return upcomingConferences.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }
    public List<ConferenceDTO> getPastConferanceByUser(Long userId){
        List<Conference> conferences=conferenceRepository.findByUtilisateursInscritsId(userId);
        Date currentDate = new Date();
        List<Conference> pastConferences = conferences.stream()
                .filter(conference -> conference.getDate().before(currentDate) && conference.getStatus()==1)
                .collect(Collectors.toList());
        return pastConferences.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());

    }
    public List<ConferenceDTO> getFutureConferencesByUser(Long userId) {
        List<Conference> conferences = conferenceRepository.findByUtilisateursInscritsId(userId);
        Date currentDate = new Date();

        List<Conference> futureConferences = conferences.stream()
                .filter(conference -> conference.getDate().equals(currentDate) || conference.getDate().after(currentDate))
                .filter(conference -> conference.getStatus() == 1)
                .collect(Collectors.toList());

        return futureConferences.stream()
                .map(this::mapToConferenceDTO)
                .collect(Collectors.toList());
    }
    public void incrementLikes(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        if (conference != null) {
            conference.incrementLikes();
            conferenceRepository.save(conference);
        }
    }
}



