package com.robinsonir.fittrack.data.repository.member;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class MemberRepositoryImpl implements MemberUpdateRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void updateProfileImageId(String profileImageId, Long customerId) {
        MemberEntity memberEntity = entityManager.find(MemberEntity.class, customerId);

        if (memberEntity == null) {
            throw new ResourceNotFoundException(
                    "customer with id [%s] not found".formatted(customerId)
            );
        }

        memberEntity.setProfileImageId(profileImageId);
    }
}
