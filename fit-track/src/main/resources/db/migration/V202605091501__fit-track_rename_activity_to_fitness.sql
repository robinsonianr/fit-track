ALTER TABLE fit_tracker.member
    RENAME COLUMN activity TO fitness;

ALTER TABLE fit_tracker.member_aud
    RENAME COLUMN activity TO fitness;
ALTER TABLE fit_tracker.member_aud
    RENAME COLUMN activity_mod TO fitness_mod;

UPDATE fit_tracker.member
    SET fitness = CASE upper(fitness)
        WHEN 'BEGINNER'     THEN 'BEGINNER'
        WHEN 'INTERMEDIATE' THEN 'INTERMEDIATE'
        WHEN 'ADVANCED'     THEN 'ADVANCED'
    END;

UPDATE fit_tracker.member_aud
    SET fitness = CASE upper(fitness)
        WHEN 'BEGINNER'     THEN 'BEGINNER'
        WHEN 'INTERMEDIATE' THEN 'INTERMEDIATE'
        WHEN 'ADVANCED'     THEN 'ADVANCED'
    END;