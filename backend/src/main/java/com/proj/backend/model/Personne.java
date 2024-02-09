package com.proj.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table (name = "Personne", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    @Email
    private String email;
    private String motDePasse;
    private String tele;
    private String imagePath;
    private String ville;

    @Enumerated(EnumType.STRING)
    private RoleName role;

    public Personne() {
    }

    public Personne(String nom, String prenom, String email, String motDePasse, String tele, String image, String ville) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.tele = tele;
        this.imagePath = image;
        this.ville = ville;
    }
}





