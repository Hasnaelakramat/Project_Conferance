package com.proj.backend.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Formateur extends Personne {

    private String domaine;

    private String cv;

    @Column(columnDefinition = "int default 0")
    private int status; // Default value "ida admin valida aterje 1 ane7tajo trigger"
    @OneToMany(mappedBy = "formateur")
    private Set<Conference> conferences = new HashSet<>();

    public Formateur() {
        super();
    }

    public Formateur(
            String nom, String prenom, String email, String motDePasse, String tele, String image, String ville,
            String domaine, String cv) {
        super(nom, prenom, email, motDePasse, tele, image, ville);
        setDomaine(domaine);
        setCv(cv);
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        // Exclude conferences from the hashCode calculation
        // result = prime * result + ((conferences == null) ? 0 : conferences.hashCode());
        // Include other fields as needed
        return result;
    }
    public Long getId() {
        return super.getId();
    }

    @Override
    public void setId(Long id) {
        super.setId(id);
    }

    @Override
    public String toString() {
        return "Formateur{" +
                "id=" + getId() +
                ", name='" + getNom() + '\'' +
        // Other fields
                '}';}

    }
