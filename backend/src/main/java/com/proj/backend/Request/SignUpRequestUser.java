package com.proj.backend.Request;

import jakarta.validation.constraints.NotBlank;

public class SignUpRequestUser extends SignUpRequestPersonne{
    @NotBlank
    private String specialite;
    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }
}
