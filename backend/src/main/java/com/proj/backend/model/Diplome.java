package com.proj.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class Diplome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @Lob // Annotation for large objects (e.g., BLOBs)
    private byte[] Doc;

    // Assumez que vous avez une relation ManyToOne avec Formateur
    @ManyToOne
    private Formateur formateur;

    // Ajoutez d'autres champs nécessaires pour représenter un diplôme

    // Constructeurs, getters, setters, etc.
}
