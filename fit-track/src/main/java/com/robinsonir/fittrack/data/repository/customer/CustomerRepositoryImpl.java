package com.robinsonir.fittrack.data.repository.customer;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomerRepositoryImpl implements CustomerUpdateRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void updateProfileImageId(String profileImageId, Long customerId) {
        CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, customerId);

        if (customerEntity != null) {
            customerEntity.setProfileImageId(profileImageId);
        }

    }

    @Override
    public void updateCustomer(Long id,
                               String name,
                               String email,
                               Integer age,
                               Gender gender,
                               Integer weight,
                               Integer height,
                               Integer weightGoal,
                               String activity,
                               Integer bodyFat) {
        CustomerEntity customerEntity = entityManager.find(CustomerEntity.class, id);
        if (customerEntity != null) {
            customerEntity.setName(name);
            customerEntity.setEmail(email);
            customerEntity.setAge(age);
            customerEntity.setGender(gender);
            customerEntity.setWeight(weight);
            customerEntity.setHeight(height);
            customerEntity.setWeightGoal(weightGoal);
            customerEntity.setActivity(activity);
            customerEntity.setBodyFat(bodyFat);
        }

    }
}
