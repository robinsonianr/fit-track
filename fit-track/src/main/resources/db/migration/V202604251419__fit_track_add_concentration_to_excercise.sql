ALTER TABLE fit_tracker.exercises
    ADD COLUMN concentration VARCHAR(255);

UPDATE fit_tracker.exercises
    SET concentration = muscle_group
    WHERE concentration IS NULL;

ALTER TABLE fit_tracker.exercises
    ALTER COLUMN concentration SET NOT NULL;