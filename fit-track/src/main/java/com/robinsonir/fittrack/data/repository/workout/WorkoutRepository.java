package com.robinsonir.fittrack.data.repository.workout;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface WorkoutRepository extends JpaRepository<WorkoutEntity, Long> {

    @Query("select w from WorkoutEntity w where w.member.id = ?1")
    List<WorkoutEntity> findAllWorkoutsByMember_Id(Long memberId);

    boolean existsWorkoutEntityByMember(MemberEntity member);
}
