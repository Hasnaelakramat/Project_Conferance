package com.proj.backend.model;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Admin extends Personne {
    private String position; // rôle spécifique de l'administrateur (par exemple, "Admin Principal", "Admin Secondaire", etc.)
    public Admin() {
        super();
    }

    public Admin(
            String nom, String prenom, String email, String motDePasse, String tele, String image, String ville,
            String position) {
        super(nom, prenom, email, motDePasse, tele, image, ville);
        setPosition(position);
    }

}
