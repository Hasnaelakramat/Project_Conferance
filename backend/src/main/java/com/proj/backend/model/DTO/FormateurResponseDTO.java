package com.proj.backend.model.DTO;

import com.proj.backend.model.Conference;
import com.proj.backend.model.Formateur;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class FormateurResponseDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String tele;
    private String image;
    private String ville;
    private String domaine;
    private String diplome1;
    private String diplome2;
    private List<String> conferences;

    // Constructors, getters, and setters

    // You can create a constructor that takes a Formateur object and initializes the fields accordingly
    public FormateurResponseDTO(Formateur formateur) {
        this.id = formateur.getId();
        this.nom = formateur.getNom();
        this.prenom = formateur.getPrenom();
        this.email = formateur.getEmail();
        this.tele = formateur.getTele();
        this.image = formateur.getImagePath();
        this.ville = formateur.getVille();
        this.domaine = formateur.getDomaine();
        this.diplome1 = formateur.getCv();
        this.conferences = formateur.getConferences().stream()
                .map(Conference::getTitle)
                .collect(Collectors.toList());
    }
}

