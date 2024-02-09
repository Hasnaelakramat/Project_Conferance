package com.proj.backend.Request;

import jakarta.validation.constraints.NotBlank;

public class SignUpRequestFormateur extends SignUpRequestPersonne{
    @NotBlank
    private String domaine;

    private String cv;

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

}
