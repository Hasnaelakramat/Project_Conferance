package com.proj.backend.service;


import com.proj.backend.model.Admin;
import com.proj.backend.model.Formateur;
import com.proj.backend.repository.AdminRepository;
import com.proj.backend.repository.FormateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {


    @Autowired
    private FormateurRepository formateurRepository;
    @Autowired
    private AdminRepository adminRepository;



    public String validateFormateur(Long formateurId) {
        // Retrieve the Formateur by ID
        Optional<Formateur> optionalFormateur = formateurRepository.findById(formateurId);

        // Check if the Formateur is present in the optional
        if (optionalFormateur.isPresent()) {
            // Update the status to 1 (assuming 1 represents a validated status)
            Formateur formateur = optionalFormateur.get();
            formateur.setStatus(1);

            // Save the updated Formateur
            formateurRepository.save(formateur);

            // Return a success message
            return "Formateur with ID " + formateurId + " has been validated.";
        } else {
            // Return an error message
            return "Formateur with ID " + formateurId + " not found.";
        }
    }

    public String rejectFormateur(Long formateurId) {
        // Retrieve the Formateur by ID
        Optional<Formateur> optionalFormateur = formateurRepository.findById(formateurId);

        // Check if the Formateur is present in the optional
        if (optionalFormateur.isPresent()) {
            // Delete the Formateur
            formateurRepository.deleteById(formateurId);

            // Return a success message
            return "Formateur with ID " + formateurId + " has been rejected and removed.";
        } else {
            // Return an error message
            return "Formateur with ID " + formateurId + " not found. Rejection failed.";
        }
    }
    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
    }
}

