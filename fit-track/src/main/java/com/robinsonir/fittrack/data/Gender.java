package com.robinsonir.fittrack.data;

import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;

@Schema(name = "Gender", enumAsRef = true)
@AllArgsConstructor
public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    FORBIDDEN("Forbidden");

    @JsonValue
    private final String value;

    @Override
    public String toString() {
        return value;
    }
}
