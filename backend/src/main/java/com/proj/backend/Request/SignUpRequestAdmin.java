package com.proj.backend.Request;

import jakarta.validation.constraints.NotBlank;

public class SignUpRequestAdmin extends SignUpRequestPersonne{
    @NotBlank
    private String position;

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
