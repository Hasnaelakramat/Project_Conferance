package com.proj.backend.model.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentaireDTO {
    private Long id;
    private String contenu;
    private LocalDateTime date;
    private String personneName; // Assuming you want to display the person's name
    // Add any other fields from Commentaire or related entities that you want to display

    // Constructors, getters, setters
}
