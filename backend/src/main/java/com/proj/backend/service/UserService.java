package com.proj.backend.service;


import com.proj.backend.model.Conference;
import com.proj.backend.model.RoleName;
import com.proj.backend.model.User;
import com.proj.backend.repository.ConferenceRepository;
import com.proj.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConferenceRepository conferenceRepository;


    public User createUser(User user) {
        User newUser = new User();
        newUser.setSpecialite(user.getSpecialite());
        newUser.setNom(user.getNom());
        newUser.setPrenom(user.getPrenom());
        newUser.setEmail(user.getEmail());
        newUser.setMotDePasse(user.getMotDePasse());
        newUser.setTele(user.getTele());
        newUser.setImagePath(user.getImagePath());
        newUser.setVille(user.getVille());
        newUser.setRole(RoleName.ROLE_USER);
        return userRepository.save(newUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void participateInConference(Long userId, Long conferenceId) {
        // Retrieve the user and conference entities from the database
        User user = userRepository.findById(userId).orElse(null);
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        conference.getUtilisateursInscrits().add(user);

        // Update the conference in the database
        conferenceRepository.save(conference);
    }
    public void cancelParticipationInConference(Long userId, Long conferenceId) {
        // Retrieve the user and conference entities from the database
        User user = userRepository.findById(userId).orElse(null);
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);

            // Remove the user from the list of participants in the conference
            conference.getUtilisateursInscrits().remove(user);

            // Update the conference in the database
            conferenceRepository.save(conference);

        System.out.println("User or Conference not found");

    }

    // Other methods as needed
    public Set<User> getUsersByConference(Long conferenceId) {
        return conferenceRepository.findById(conferenceId)
                .map(conference -> conference.getUtilisateursInscrits())
                .orElse(null);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    public User updateUser(Long userId, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(userId);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            // Update fields as needed
            existingUser.setSpecialite(updatedUser.getSpecialite());
            existingUser.setTele(updatedUser.getTele());
            existingUser.setMotDePasse(updatedUser.getMotDePasse());
            existingUser.setImagePath(updatedUser.getImagePath());
            existingUser.setVille(updatedUser.getVille());


            // Save the updated user
            return userRepository.save(existingUser);
        } else {
            // Handle user not found
            return null;
        }
    }
}


