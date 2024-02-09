package com.proj.backend.controller;


import com.proj.backend.model.Admin;
import com.proj.backend.service.AdminService;
import com.proj.backend.service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private FormateurService formateurService;


    //KHDMAT !
    @PutMapping("/validate/formateur/{formateurId}")
    public ResponseEntity<String> validateFormateur(@PathVariable Long formateurId) {
        String validationMessage = adminService.validateFormateur(formateurId);

        if (validationMessage.contains("validated")) {
            return new ResponseEntity<>(validationMessage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(validationMessage, HttpStatus.NOT_FOUND);
        }
    }

    //KHDMAT !
    @PutMapping("/reject/formateur/{formateurId}")
    public ResponseEntity<String> rejectFormateur(@PathVariable Long formateurId) {
        String rejectionMessage = adminService.rejectFormateur(formateurId);

        return new ResponseEntity<>(rejectionMessage, HttpStatus.OK);
    }
    @GetMapping("/{adminId}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long adminId) {
        Admin admin = adminService.getAdminById(adminId);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

}

