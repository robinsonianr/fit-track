package com.robinsonir.fittrack.data.repository.workout;

import com.robinsonir.fittrack.data.Gender;
import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.entity.workout.WorkoutEntity;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class WorkoutRepositoryTest {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void testSaveWorkout() {
        // Create and save a member
        MemberEntity member = new MemberEntity();
        member.setName("John Doe");
        member.setEmail("john.doe@example.com");
        member.setPassword("password123");
        member.setAge(30);
        member.setGender(Gender.MALE);

        memberRepository.save(member);

        // Create a workout entity
        WorkoutEntity workout = new WorkoutEntity();
        workout.setMember(member);
        workout.setTitle("Cardio");
        workout.setWorkoutType("Running");
        workout.setCalories(500);
        workout.setDurationMinutes(60);
        workout.setWorkoutDate(OffsetDateTime.now());

        // Save the workout
        WorkoutEntity savedWorkout = workoutRepository.save(workout);

        // Validate workout is saved and has an ID
        assertThat(savedWorkout.getId()).isNotNull();
        assertThat(savedWorkout.getWorkoutType()).isEqualTo("Running");
        assertThat(savedWorkout.getCalories()).isEqualTo(500);
        assertThat(savedWorkout.getDurationMinutes()).isEqualTo(60);
    }

    @Test
    void testFindWorkoutById() {
        // Create and save a member
        MemberEntity member = new MemberEntity();
        member.setName("Jane Doe");
        member.setEmail("jane.doe@example.com");
        member.setPassword("securePass");
        member.setAge(28);
        member.setGender(Gender.FEMALE);

        memberRepository.save(member);

        // Create and save a workout
        WorkoutEntity workout = new WorkoutEntity();
        workout.setMember(member);
        workout.setTitle("Cardio");
        workout.setWorkoutType("Cycling");
        workout.setCalories(300);
        workout.setDurationMinutes(45);
        workout.setWorkoutDate(OffsetDateTime.now());
        workoutRepository.save(workout);

        // Fetch the workout by ID
        Optional<WorkoutEntity> foundWorkout = workoutRepository.findById(workout.getId());

        // Assert the workout was found and data is correct
        assertTrue(foundWorkout.isPresent());
        assertThat(foundWorkout.get().getWorkoutType()).isEqualTo("Cycling");
    }

    @Test
    void testFindAllWorkouts() {
        // Create and save members
        MemberEntity member1 = new MemberEntity();
        member1.setName("Bob Smith");
        member1.setEmail("bob.smith@example.com");
        member1.setPassword("bobPass");
        member1.setAge(35);
        member1.setGender(Gender.MALE);

        memberRepository.save(member1);

        MemberEntity member2 = new MemberEntity();
        member2.setName("Alice Johnson");
        member2.setEmail("alice.johnson@example.com");
        member2.setPassword("alicePass");
        member2.setAge(29);
        member2.setGender(Gender.FEMALE);
        memberRepository.save(member2);

        // Create and save workouts
        WorkoutEntity workout1 = new WorkoutEntity();
        workout1.setMember(member1);
        workout1.setTitle("Cardio");
        workout1.setWorkoutType("Swimming");
        workout1.setCalories(400);
        workout1.setDurationMinutes(50);
        workout1.setWorkoutDate(OffsetDateTime.now());
        workoutRepository.save(workout1);

        WorkoutEntity workout2 = new WorkoutEntity();
        workout2.setMember(member2);
        workout2.setTitle("Cardio");
        workout2.setWorkoutType("Yoga");
        workout2.setCalories(200);
        workout2.setDurationMinutes(30);
        workout2.setWorkoutDate(OffsetDateTime.now());
        workoutRepository.save(workout2);

        // Fetch all workouts
        List<WorkoutEntity> workouts = workoutRepository.findAll();

        // Assert that the workouts were fetched
        assertThat(workouts).isNotNull();
        assertThat(workouts.size()).isEqualTo(2);
    }

    @Test
    void testExistsWorkoutEntityByMember() {
        // Create and save a member
        MemberEntity member = new MemberEntity();
        member.setName("Chris Evans");
        member.setEmail("chris.evans@example.com");
        member.setPassword("captain123");
        member.setAge(40);
        member.setGender(Gender.MALE);
        memberRepository.save(member);

        // Create and save a workout
        WorkoutEntity workout = new WorkoutEntity();
        workout.setMember(member);
        workout.setTitle("Strength Training");
        workout.setWorkoutType("Weightlifting");
        workout.setCalories(600);
        workout.setDurationMinutes(75);
        workout.setWorkoutDate(OffsetDateTime.now());
        workoutRepository.save(workout);

        // Test if a workout exists for the member
        boolean exists = workoutRepository.existsWorkoutEntityByMember(member);
        assertTrue(exists);

        // Test for a non-existent member (without any workouts)
        MemberEntity newMember = new MemberEntity();
        newMember.setName("Mark Ruffalo");
        newMember.setEmail("mark.ruffalo@example.com");
        newMember.setPassword("hulk123");
        newMember.setAge(53);
        newMember.setGender(Gender.MALE);
        memberRepository.save(newMember);

        boolean notExists = workoutRepository.existsWorkoutEntityByMember(newMember);
        assertFalse(notExists);
    }

    @Test
    void testFindAllWorkoutsByMemberId() {
        // Create a member entity
        MemberEntity member = new MemberEntity();
        member.setName("John Doe");
        member.setEmail("johndoe@example.com");
        member.setPassword("password");
        member.setAge(30);
        member.setGender(Gender.MALE);

        // Create some workouts for the member
        WorkoutEntity workout1 = new WorkoutEntity();
        workout1.setTitle("Cardio");
        workout1.setWorkoutType("Running");
        workout1.setCalories(500);
        workout1.setDurationMinutes(60);
        workout1.setWorkoutDate(OffsetDateTime.now());
        workout1.setExercises(new HashSet<>());
        workout1.setMember(member);

        WorkoutEntity workout2 = new WorkoutEntity();
        workout2.setTitle("Cardio");
        workout2.setWorkoutType("Cycling");
        workout2.setCalories(600);
        workout2.setDurationMinutes(45);
        workout2.setWorkoutDate(OffsetDateTime.now());
        workout2.setExercises(new HashSet<>());
        workout2.setMember(member);

        // Save the member and workouts
        memberRepository.save(member);
        workoutRepository.save(workout1);
        workoutRepository.save(workout2);

        // When
        List<WorkoutEntity> workouts = workoutRepository.findAllWorkoutsByMember_Id(member.getId());

        // Then
        assertThat(workouts).isNotEmpty();
        assertThat(workouts.size()).isEqualTo(2);
        assertThat(workouts.get(0).getMember().getId()).isEqualTo(member.getId());
    }
}
