package com.proj.backend.controller;


import com.proj.backend.model.ConferenceRequest;
import com.proj.backend.model.DTO.FormateurDTO;
import com.proj.backend.model.Formateur;
import com.proj.backend.service.ConferenceService;
import com.proj.backend.service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/formateurs")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.OPTIONS}, allowedHeaders = {"*"})
public class FormateurController {

    @Autowired
    private FormateurService formateurService;


    @Autowired
    private ConferenceService conferenceService;


    //KHDMAT !
    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribeAsFormateur(@RequestBody Formateur formateur) {
        try {
            formateurService.subscribeAsFormateur(formateur);
            return new ResponseEntity<>("Formateur subscribed successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error subscribing formateur: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //KHDMAT !
    @PostMapping("/createconference/{formateurId}")
    public ResponseEntity<String> createConference(@RequestBody ConferenceRequest conferenceRequest, @PathVariable Long formateurId) {
        String result = conferenceService.createConference(conferenceRequest, formateurId);
        if ("created successfully".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    //KHDMAT !
    @DeleteMapping("/delete/{formateurId}")
    public ResponseEntity<Void> deleteFormateur(@PathVariable Long formateurId) {
        formateurService.deleteFormateur(formateurId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //KHDMAT !
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFormateursWithDetails() {
        List<Formateur> formateurs = formateurService.getAllFormateurs();
        List<Map<String, Object>> formateursDetailsList = formateurs.stream()
                .map(formateurService::getDetailedInfo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(formateursDetailsList);
    }

    //KHDMAT !
    @GetMapping("/{formateurId}")
    public ResponseEntity<Formateur> getFormateurById(@PathVariable Long formateurId) {
        Formateur formateur = formateurService.getFormateurById(formateurId);
        return new ResponseEntity<>(formateur, HttpStatus.OK);
    }

    @PutMapping("/{formateurId}")
    public ResponseEntity<Formateur> updateFormateur(@PathVariable Long formateurId, @RequestBody Formateur updatedFormateur) {
        Formateur updatedFormateurData = formateurService.updateFormateur(formateurId, updatedFormateur);

        if (updatedFormateurData != null) {
            return new ResponseEntity<>(updatedFormateurData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/statusZero")
    public ResponseEntity<List<FormateurDTO>> getFormateurWithStatusZero() {
        List<FormateurDTO> formateursWithStatusZero = formateurService.getFormateurWithStatusZero();
        if (!formateursWithStatusZero.isEmpty()) {
            return new ResponseEntity<>(formateursWithStatusZero, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
