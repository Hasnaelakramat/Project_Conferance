package com.proj.backend.controller;


import com.proj.backend.Request.*;
import com.proj.backend.Security.JwtTokenProvider;
import com.proj.backend.model.*;
import com.proj.backend.repository.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", methods = {RequestMethod.POST, RequestMethod.OPTIONS}, allowedHeaders = {"Content-Type", "Authorization"})

public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PersonneRepository personneRepository;

    @Autowired
    FormateurRepository formateurRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Check if the email exists in the Formateur repository
            if (personneRepository.existsByEmail(loginRequest.getEmail())) {
                // The email exists, proceed with authentication
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getEmail().toLowerCase(),
                                loginRequest.getPassword()
                        )
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateToken(authentication);
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
            } else {
                // The email doesn't exist, return authentication failure
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: User not found");
            }
        } catch (Exception ex) {
            // Handle other exceptions (e.g., bad credentials) and log the error
            logger.error("Authentication failed", ex);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + ex.getMessage());
        }
    }


    @PostMapping("/signup/formateur")
    public ResponseEntity<?> registerFormateur(@Valid @RequestBody SignUpRequestFormateur signUpRequestFormateur) {
        if (personneRepository.existsByEmail(signUpRequestFormateur.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
        }

        Formateur formateur = new Formateur(
                signUpRequestFormateur.getNom(),
                signUpRequestFormateur.getPrenom(),
                signUpRequestFormateur.getEmail(),
                signUpRequestFormateur.getMotDePasse(),
                signUpRequestFormateur.getTele(),
                signUpRequestFormateur.getImage(),
                signUpRequestFormateur.getVille(),
                signUpRequestFormateur.getDomaine(),
                signUpRequestFormateur.getCv()
        );
        formateur.setMotDePasse(passwordEncoder.encode(formateur.getMotDePasse()));

        // Fix: Use roleRepository.findByName(RoleName.ROLE_FORMATEUR)
        formateur.setRole(RoleName.ROLE_FORMATEUR);

        // Use formateurRepository.save instead of userRepository.save
        Formateur result = formateurRepository.save(formateur);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/formateurs/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Formateur registered successfully"));
    }



    @PostMapping("/signup/user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestUser signUpRequestUser){
        if(personneRepository.existsByEmail(signUpRequestUser.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false,"Username is already taken!"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(
                signUpRequestUser.getNom(),
                signUpRequestUser.getPrenom(),
                signUpRequestUser.getEmail(),
                signUpRequestUser.getMotDePasse(),
                signUpRequestUser.getTele(),
                signUpRequestUser.getImage(),
                signUpRequestUser.getVille(),
                signUpRequestUser.getSpecialite()
        );
        user.setMotDePasse(passwordEncoder.encode(user.getMotDePasse()));

        user.setRole(RoleName.ROLE_USER);
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));

    }
    @PostMapping("/signup/admin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignUpRequestAdmin signUpRequestAdmin){
        if(personneRepository.existsByEmail(signUpRequestAdmin.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false,"Username is already taken!"), HttpStatus.BAD_REQUEST);
        }

        Admin admin = new Admin(
                signUpRequestAdmin.getNom(),
                signUpRequestAdmin.getPrenom(),
                signUpRequestAdmin.getEmail(),
                signUpRequestAdmin.getMotDePasse(),
                signUpRequestAdmin.getTele(),
                signUpRequestAdmin.getImage(),
                signUpRequestAdmin.getVille(),
                signUpRequestAdmin.getPosition()
        );
        admin.setMotDePasse(passwordEncoder.encode(admin.getMotDePasse()));

        admin.setRole(RoleName.ROLE_ADMIN);
        Admin result = adminRepository.save(admin);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/admins/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Admin registered successfully"));

    }
}
