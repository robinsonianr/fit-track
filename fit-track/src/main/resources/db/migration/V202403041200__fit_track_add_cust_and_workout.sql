CREATE TABLE IF NOT EXISTS fit_tracker.customer (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(255) NOT NULL,
    profile_image_id VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS fit_tracker.workout (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,
    workout_date TIMESTAMP NOT NULL,
    workout_type VARCHAR(255) NOT NULL,
    customer_id INTEGER REFERENCES fit_tracker.customer(id)
)