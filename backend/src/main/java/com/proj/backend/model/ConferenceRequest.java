package com.proj.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ConferenceRequest {

    private Conference conference;

    private Long mainFormateurId;

    private List<Long> additionalFormateurIds;
}
