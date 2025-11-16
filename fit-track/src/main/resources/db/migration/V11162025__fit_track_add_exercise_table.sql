ALTER TABLE fit_tracker.workout
DROP column exercises;

CREATE TABLE IF NOT EXISTS fit_tracker.exercises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(255) NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    workout_id INTEGER REFERENCES fit_tracker.workout(id)
)
