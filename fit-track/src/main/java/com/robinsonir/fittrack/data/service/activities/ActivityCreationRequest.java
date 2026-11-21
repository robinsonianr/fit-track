package com.robinsonir.fittrack.data.service.activities;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        property = "activityType")
@JsonSubTypes({
        @JsonSubTypes.Type(value =
                WorkoutCreationRequest.class, name = "Workout")
})
public sealed interface ActivityCreationRequest permits WorkoutCreationRequest {
    String activityType();

    Long memberId();
}
