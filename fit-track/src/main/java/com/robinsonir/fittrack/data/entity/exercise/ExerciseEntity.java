package com.robinsonir.fittrack.data.entity.exercise;

import com.robinsonir.fittrack.data.entity.AbstractEntity;
import com.robinsonir.fittrack.data.entity.set.SetEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(schema = "fit_tracker", name = "exercises")
public class ExerciseEntity extends AbstractEntity {
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "equipment", nullable = false)
    private String equipment;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "muscle_group", nullable = false)
    private String muscleGroup;

    @Column(name = "concentration", nullable = false)
    private String concentration;

    @Column(name = "is_bilateral", nullable = false)
    private Boolean isBilateral;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "exercise_id")
    private List<SetEntity> sets;
}
