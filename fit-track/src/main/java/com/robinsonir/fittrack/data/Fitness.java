package com.robinsonir.fittrack.data;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;

@Schema(name = "Fitness", enumAsRef = true)
@AllArgsConstructor
public enum Fitness {

    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");

    @JsonValue
    private final String value;

    @Override
    public String toString() {
        return value;
    }
}
