package com.robinsonir.fittrack.messages;

import lombok.Getter;

@Getter
public enum FitTrackMessageKeys {

    MEMBER_UPDATED_SUCCESS("member.updated","Member updated successfully"),
    MEMBER_IMAGE_UPLOAD_SUCCESS("member.image.updated","Member image updated successfully");

    private final String key;
    private final String message;

    FitTrackMessageKeys(String key, String message) {
        this.key = key;
        this.message = message;
    }


    public ApiMessage toApiMessage() {
        return ApiMessage.of(key, message);
    }
}
