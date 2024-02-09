package com.proj.backend.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String image; // Assuming byte array for image storage
    private int capacite; //nbr max des participant
    @Column(columnDefinition = "int default 0")
    private int status; //par defaut 0 càd en attente de reponse de admin khass trigger
    private String planning;
    private String categorie;
    private String language;

    @Enumerated(EnumType.STRING)
    private Niveau niveau;
    @Column(columnDefinition = "boolean default false")
    private boolean atelier;
    private String lieu;
    private Date date;
    private String ville;
    private String pays;
    @Column(columnDefinition = "boolean default false")
    private boolean certificat;
    private int numLikes=0;
    @Column(columnDefinition = "boolean default true")
    private boolean gratuit;
    @Column(columnDefinition = "boolean default true")
    private  boolean accesAll;

    @ManyToOne // Cette partie est ajoutée pour la relation bidirectionnelle
    @JoinColumn(name = "formateur_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Formateur formateur;

    @ManyToMany
    @JoinTable(
            name = "conference_formateurs",
            joinColumns = @JoinColumn(name = "conference_id"),
            inverseJoinColumns = @JoinColumn(name = "formateur_id"))
    private Set<Formateur> formateurs;

    @ManyToMany
    @JoinTable(
            name = "conference_utilisateurs",
            joinColumns = @JoinColumn(name = "conference_id"),
            inverseJoinColumns = @JoinColumn(name = "utilisateur_id"))
    private Set<User> utilisateursInscrits = new HashSet<>();

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL)
    private Set<Commentaire> commentaires = new HashSet<>();

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        // Exclude formateurs from the hashCode calculation
        // result = prime * result + ((formateurs == null) ? 0 : formateurs.hashCode());
        // Include other fields as needed
        return result;
    }

    public Long getFormateurId() {
        if (formateur != null) {
            return formateur.getId();
        } else {
            return null; // Or you can return a default value or throw an exception based on your logic
        }
    }
    public Conference() {
        this.formateurs = new HashSet<>();
    }

    @Override
    public String toString() {
        return "Conference{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                // Other fields
                '}';
    }

    public Formateur getFormateur() {
        return formateur;
    }

    public void setFormateurId(Long formateurId) {
        this.formateur.setId(formateurId);
    }
    public void incrementLikes() {
        this.numLikes++;
    }
}