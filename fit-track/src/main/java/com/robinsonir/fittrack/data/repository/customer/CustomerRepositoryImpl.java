package com.robinsonir.fittrack.data.repository.customer;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomerRepositoryImpl implements CustomerUpdateRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void updateProfileImageId(String profileImageId, Long customerId) {
        CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);

        if (customerEntity == null) {
            throw new ResourceNotFoundException(
                    "customer with id [%s] not found".formatted(customerId)
            );
        }

        customerEntity.setProfileImageId(profileImageId);
    }
}
