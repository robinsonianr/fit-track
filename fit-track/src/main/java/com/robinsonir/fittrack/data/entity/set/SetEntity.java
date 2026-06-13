package com.robinsonir.fittrack.data.entity.set;

import com.robinsonir.fittrack.data.entity.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(schema = "fit_tracker", name = "sets")
public class SetEntity extends AbstractEntity {

    @Column(name = "set_number")
    private Integer setNumber;

    @Column(name = "reps")
    private Integer reps;

    @Column(name = "weight")
    private Integer weight;
}
