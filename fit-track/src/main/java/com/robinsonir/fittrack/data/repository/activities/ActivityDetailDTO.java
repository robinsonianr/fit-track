package com.robinsonir.fittrack.data.repository.activities;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import java.time.OffsetDateTime;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        property = "activityType")
@JsonSubTypes({
        @JsonSubTypes.Type(value =
                WorkoutDTO.class, name = "Workout")
})
public sealed interface ActivityDetailDTO permits WorkoutDTO {
    Long id();
    String activityType();
    Long memberId();
    String routineContext();
    Integer durationMinutes();
    OffsetDateTime activityTimestamp();
}
