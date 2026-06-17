package com.robinsonir.fittrack.data.entity.activities;

import com.robinsonir.fittrack.data.entity.AbstractEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.OffsetDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(schema = "fit_tracker", name = "activities")
public class ActivityEntity extends AbstractEntity {
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "source_id")
    private Long sourceId;

    @Column(name = "activity_type")
    private String activityType;

    @Column(name = "routine_context")
    private String routineContext;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "highlight")
    private String highlight;

    @Column(name = "highlight_is_pr")
    private Boolean highlightIsPR;

    @Column(name = "activity_timestamp")
    private OffsetDateTime activityTimestamp;
}
