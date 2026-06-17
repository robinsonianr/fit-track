CREATE TABLE IF NOT EXISTS fit_tracker.activities (
    id SERIAL PRIMARY KEY,
    version INTEGER NOT NULL,
    activity_type VARCHAR(255) NOT NULL,
    routine_context VARCHAR(255),
    duration_minutes INTEGER NOT NULL,
    highlight VARCHAR(255) NOT NULL,
    highlight_is_pr BOOLEAN NOT NULL,
    activity_timestamp TIMESTAMP NOT NULL,
    source_id INTEGER NOT NULL,
    member_id INTEGER REFERENCES fit_tracker.member(id)
)