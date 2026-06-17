package com.robinsonir.fittrack.data.repository.activities;

import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<ActivityEntity, Long> {

    List<ActivityEntity> findByMemberIdAndActivityType(Long memberId, String activityType);

    List<ActivityEntity> findByMemberId(Long memberId);
}
