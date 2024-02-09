package com.proj.backend.controller;


import com.proj.backend.model.User;
import com.proj.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    //create user
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //participate in conference
    @PostMapping("/{userId}/participate/{conferenceId}")
    public ResponseEntity<String> participateInConference(
            @PathVariable Long userId,
            @PathVariable Long conferenceId) {
        userService.participateInConference(userId, conferenceId);
        return new ResponseEntity<>("User participated in the conference successfully", HttpStatus.OK);
    }


    //annuler participation
    @DeleteMapping("/{userId}/cancel-participation/{conferenceId}")
    public ResponseEntity<String> cancelParticipationInConference(
            @PathVariable Long userId,
            @PathVariable Long conferenceId) {
        userService.cancelParticipationInConference(userId, conferenceId);
        return new ResponseEntity<>("User canceled participation in the conference successfully", HttpStatus.OK);
    }

    //afficher la list des cnferences
    @GetMapping("/{conferenceId}/participants")
    public ResponseEntity<Set<User>> getUsersByConference(@PathVariable Long conferenceId) {
        Set<User> participants = userService.getUsersByConference(conferenceId);

        if (participants != null) {
            return new ResponseEntity<>(participants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userService.getUserById(userId);

        if (userOptional.isPresent()) {
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long userId,
            @RequestBody User updatedUser) {
        User updatedUserData = userService.updateUser(userId, updatedUser);

        if (updatedUserData != null) {
            return new ResponseEntity<>(updatedUserData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
