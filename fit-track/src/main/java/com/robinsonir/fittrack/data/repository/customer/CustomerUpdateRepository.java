package com.robinsonir.fittrack.data.repository.customer;

import com.robinsonir.fittrack.data.Gender;

public interface CustomerUpdateRepository {


    void updateProfileImageId(String profileImageId, Long customerId);

}
