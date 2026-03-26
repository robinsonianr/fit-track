DO $$
    BEGIN
        IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'fit_tracker'
              AND table_name = 'workout'
              AND column_name = 'exercises'
        ) THEN
            ALTER TABLE fit_tracker.workout DROP COLUMN exercises;
        END IF;
    END $$;

DO $$
    BEGIN
        IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'fit_tracker'
              AND table_name = 'workout'
              AND column_name = 'volume'
        ) THEN
            ALTER TABLE fit_tracker.workout DROP COLUMN volume;
        END IF;
    END $$;

CREATE TABLE IF NOT EXISTS fit_tracker.exercises (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(255) NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight_per_rep INTEGER NOT NULL,
    workout_id INTEGER REFERENCES fit_tracker.workout(id)
)
