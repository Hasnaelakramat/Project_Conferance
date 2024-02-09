package com.proj.backend.model.DTO;

import com.proj.backend.model.Niveau;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
public class ConferenceDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private int capacite;
    private int status;
    private String planning;
    private String categorie;
    private String language;
    private Niveau niveau;
    private boolean atelier;
    private String lieu;
    private Date date;
    private String ville;
    private String pays;
    private boolean certificat;
    private int numLikes;
    private boolean gratuit;
    private boolean accesAll;
    private Long formateurId;
    private String formateurName;
//    private Set<String> formateursNames;
    private Set<Long> formateursId;
}
