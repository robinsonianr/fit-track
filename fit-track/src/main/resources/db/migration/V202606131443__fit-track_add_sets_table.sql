CREATE TABLE IF NOT EXISTS fit_tracker.sets (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    set_number INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    exercise_id INTEGER REFERENCES fit_tracker.exercises(id)
);

ALTER TABLE fit_tracker.exercises
    ADD COLUMN IF NOT EXISTS is_bilateral BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE fit_tracker.exercises
    DROP COLUMN IF EXISTS sets;

ALTER TABLE fit_tracker.exercises
    DROP COLUMN IF EXISTS reps;

ALTER TABLE fit_tracker.exercises
    DROP COLUMN IF EXISTS weight_per_rep;