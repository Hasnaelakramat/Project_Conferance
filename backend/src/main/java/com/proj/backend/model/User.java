package com.proj.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;
@Data
@Entity
@Table(name = "users")
public class User extends Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String specialite;//etudiant ou enseignant

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_conferences",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "conference_id"))
    private Set<Conference> conferences = new HashSet<>();// set bach les confe maykonoch m3awdin

    // getters and setters
    public User() {
        super();
    }

    public User(
            String nom, String prenom, String email, String motDePasse, String tele, String image, String ville,
            String domaine) {
        super(nom, prenom, email, motDePasse, tele, image, ville);
        setSpecialite(specialite);
    }
}
