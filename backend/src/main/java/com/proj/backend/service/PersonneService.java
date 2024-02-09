package com.proj.backend.service;


import com.proj.backend.model.Personne;
import com.proj.backend.repository.PersonneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonneService {

    @Autowired
    private PersonneRepository personneRepository;


    public Optional<Personne> getPersonneById(Long personneId) {
        return personneRepository.findById(personneId);
    }

    public Personne updatePersonne(Long personneId, Personne updatedPersonne) {
        // Check if the personne with given ID exists
        Optional<Personne> existingPersonne = personneRepository.findById(personneId);

        if (existingPersonne.isPresent()) {
            // Update the existing personne with the new details
            Personne updated = existingPersonne.get();
            // Add logic to update fields as needed
            // e.g., updated.setName(updatedPersonne.getName());
            return personneRepository.save(updated);
        } else {
            // Handle the case where personne with the given ID is not found
            // You can throw an exception or return null based on your requirements
            return null;
        }
    }
}
