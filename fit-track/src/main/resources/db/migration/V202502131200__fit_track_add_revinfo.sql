CREATE TABLE IF NOT EXISTS fit_tracker.revinfo (
    rev BIGINT NOT NULL,
    revtstmp BIGINT,
    username VARCHAR(255),
    PRIMARY KEY (rev)
);