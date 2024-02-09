package com.proj.backend.controller;


import com.proj.backend.model.Commentaire;
import com.proj.backend.model.DTO.CommentaireDTO;
import com.proj.backend.model.DTO.ConferenceDTO;
import com.proj.backend.model.DTO.FormateurDTO;
import com.proj.backend.model.Niveau;
import com.proj.backend.repository.CommentaireRepository;
import com.proj.backend.repository.ConferenceRepository;
import com.proj.backend.repository.PersonneRepository;
import com.proj.backend.service.CommentaireService;
import com.proj.backend.service.ConferenceService;
import com.proj.backend.service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
public class ConferenceController {

    @Autowired
    private ConferenceService conferenceService;
    @Autowired
    private FormateurService formateurService;
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private CommentaireService commentaireService;

    @Autowired
    private PersonneRepository personneRepository;
    @Autowired
    private ConferenceRepository conferenceRepository;


    //KHedmat !
    @GetMapping("/formateur/{formateurId}")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByFormateur(@PathVariable Long formateurId) {
        // Formateur formateur = formateurService.getFormateurById(formateurId);
        List<ConferenceDTO> conferences = conferenceService.getConferencesByFormateur(formateurId);
        return new ResponseEntity<>(conferences, HttpStatus.OK);
    }

    //---------------------- begin USER------------------------------------------//

    //KHedmat !

    @GetMapping("/availableConferences")  //status 1
    public ResponseEntity<List<ConferenceDTO>> getAllAvailableConferences() {
        List<ConferenceDTO> allConference = conferenceService.getAllAvailableConferences();
        return new ResponseEntity<>(allConference, HttpStatus.OK);
    }

    //KHedmat !
    @GetMapping("/title/{title}")
    public ResponseEntity<ConferenceDTO> getConferenceByTitre(@PathVariable String title) {
        // Assuming you have a method getConferenceById in your ConferenceService
        ConferenceDTO conference = conferenceService.getConferenceByTitre(title);

        if (conference != null) {
            // Return the conference with HTTP status OK (200) if found
            return new ResponseEntity<>(conference, HttpStatus.OK);
        } else {
            // Return HTTP status NOT FOUND (404) if conference with the given ID is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //KHedmat !
    @GetMapping("/categorie/{categorie}")
    public ResponseEntity<List<ConferenceDTO>> getAllConferencesByCategorie(@PathVariable String categorie) {
        List<ConferenceDTO> allConference = conferenceService.getAllConferencesByCategorie(categorie);
        return new ResponseEntity<>(allConference, HttpStatus.OK);
    }

    //KHedmat !
    @GetMapping("/byNiveau/{niveau}")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByNiveau(@PathVariable Niveau niveau) {
        List<ConferenceDTO> conferences = conferenceService.getConferencesByNiveau(niveau);
        return new ResponseEntity<>(conferences, HttpStatus.OK);
    }

    //KHedmat !
    @GetMapping("/byVille/{ville}")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByVille(@PathVariable String ville) {
        List<ConferenceDTO> conferences = conferenceService.getConferencesByVille(ville);
        return new ResponseEntity<>(conferences, HttpStatus.OK);
    }

    //----------------------end USER------------------------------------------//


    //----------------------begin ADMIN------------------------------------------//


    //khedmat
    @PutMapping("/validate/{conferenceId}")
    public ResponseEntity<String> validateConference(@PathVariable Long conferenceId) {
        String result = conferenceService.validateConference(conferenceId);
        if (result.equals("conference valide !!")) {
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    //khedmat
    @PutMapping("/reject/{conferenceId}")
    public ResponseEntity<String> rejectConference(@PathVariable Long conferenceId) {
        String rejectionMessage = conferenceService.rejectConference(conferenceId);

        return new ResponseEntity<>(rejectionMessage, HttpStatus.OK);
    }

    //KHedmat !
    @GetMapping("/allConferences")
    public ResponseEntity<List<ConferenceDTO>> getAllConferences() {
        List<ConferenceDTO> allConference = conferenceService.getAllConferences();
        return new ResponseEntity<>(allConference, HttpStatus.OK);
    }

    //KHedmat !
    @GetMapping("/{conferenceId}")
    public ResponseEntity<ConferenceDTO> getConferenceById(@PathVariable Long conferenceId) {
        // Assuming you have a method getConferenceById in your ConferenceService
        ConferenceDTO conference = conferenceService.getConferenceById(conferenceId);

        if (conference != null) {
            // Return the conference with HTTP status OK (200) if found
            return new ResponseEntity<>(conference, HttpStatus.OK);
        } else {
            // Return HTTP status NOT FOUND (404) if conference with the given ID is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //KHedmat !
    @GetMapping("/past")
    public ResponseEntity<List<ConferenceDTO>> getAllPastConferences() {
        List<ConferenceDTO> pastConferences = conferenceService.getAllPastConferences();
        return new ResponseEntity<>(pastConferences, HttpStatus.OK);
    }

    @GetMapping("/withStatusZero")
    public ResponseEntity<List<ConferenceDTO>> getConferencesWithStatusZero() {
        List<ConferenceDTO> conferences = conferenceService.getConferencesWithStatusZero();
        return new ResponseEntity<>(conferences, HttpStatus.OK);
}



//----------------------end ADMIN------------------------------------------//


    //----------------------begin Commentaire------------------------------------------//




    @PostMapping("/commentaire/add/personne/{personneId}/conference/{conferenceId}")
    public ResponseEntity<String> ajouterCommentaire(@RequestBody Commentaire commentaire, @PathVariable Long personneId, @PathVariable Long conferenceId) {
        Commentaire nouveauCommentaire = commentaireService.ajouterCommentaire(commentaire, personneId, conferenceId);
        return new ResponseEntity<>("comment created successfully", HttpStatus.CREATED);
    }

    @PutMapping("/commentaire/update/personne/{personneId}/conference/{conferenceId}/{commentaireId}")
    public ResponseEntity<String> updateCommentaire(@PathVariable Long personneId, @PathVariable Long conferenceId, @PathVariable Long commentaireId, @RequestBody CommentaireDTO updatedCommentaireDTO) {

        CommentaireDTO updatedDTO = commentaireService.updateCommentaire(commentaireId, updatedCommentaireDTO);

        return new ResponseEntity<>("comment updated successfully !", HttpStatus.OK);
    }





    @DeleteMapping("/commentaire/{commentaireId}/delete/personne/{personneId}")
    public ResponseEntity<String> deleteCommentaireByPersonne(@PathVariable Long commentaireId, @PathVariable Long personneId) {

        boolean deleteSuccess = commentaireService.deleteCommentaireByPersonne(commentaireId, personneId);

        if (deleteSuccess) {
            return new ResponseEntity<>("Commentaire deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Commentaire not found or permission denied", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/commentaire/all/{conferenceId}")
    public ResponseEntity<List<CommentaireDTO>> getCommentairesByConference(@PathVariable Long conferenceId) {
        List<CommentaireDTO> commentaires = commentaireService.getCommentairesByConference(conferenceId);

        if (!commentaires.isEmpty()) {
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<ConferenceDTO>> getAllUpcomingConferences() {
        List<ConferenceDTO> upcomingConferences = conferenceService.getAllUpcomingConferences();
        return new ResponseEntity<>(upcomingConferences, HttpStatus.OK);
    }
    @GetMapping("userPastConf/{userId}")
    public ResponseEntity<List<ConferenceDTO>> getPastConferanceByuser(@PathVariable Long userId) {
        List<ConferenceDTO> conferances= conferenceService.getPastConferanceByUser(userId);
        return new ResponseEntity<>(conferances, HttpStatus.OK);
    }

    @GetMapping("userFuturConf/{userId}")
    public ResponseEntity<List<ConferenceDTO>> getFuturConferanceByuser(@PathVariable Long userId) {
        List<ConferenceDTO> conferances= conferenceService.getFutureConferencesByUser(userId);
        return new ResponseEntity<>(conferances, HttpStatus.OK);
    }
    @PostMapping("/{conferenceId}/like")
    public ResponseEntity<String> likeConference(@PathVariable Long conferenceId) {
        conferenceService.incrementLikes(conferenceId);
        return ResponseEntity.ok("Likes incremented successfully.");
    }
}