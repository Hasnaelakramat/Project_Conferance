package com.proj.backend.model.DTO;

import lombok.Data;

@Data
public class FormateurDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String tele;
    private String imagePath;
    private String ville;
    private String domaine;
    private String cv;
}
