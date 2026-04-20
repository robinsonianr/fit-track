package com.robinsonir.fittrack.messages;

import lombok.Getter;

@Getter
public enum FitTrackMessageKeys {

    CUSTOMER_UPDATED_SUCCESS("customer.updated","Customer updated successfully"),
    CUSTOMER_IMAGE_UPLOAD_SUCCESS("customer.image.updated","Customer image updated successfully");

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
