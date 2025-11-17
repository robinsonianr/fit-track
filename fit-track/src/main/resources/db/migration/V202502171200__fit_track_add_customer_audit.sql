DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'created_by'
    ) THEN
ALTER TABLE fit_tracker.customer ADD COLUMN created_by VARCHAR(255);
END IF;

IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'created_date'
    ) THEN
ALTER TABLE fit_tracker.customer ADD COLUMN created_date TIMESTAMP;
END IF;

IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'last_modified_date'
    ) THEN
ALTER TABLE fit_tracker.customer ADD COLUMN last_modified_date TIMESTAMP;
END IF;
END $$;



CREATE TABLE IF NOT EXISTS fit_tracker.customer_aud (
    id INTEGER NOT NULL,
    rev BIGINT NOT NULL,
    revtype SMALLINT,
    email VARCHAR(255),
    email_mod BOOLEAN,
    age INTEGER,
    age_mod BOOLEAN,
    gender VARCHAR(255),
    gender_mod BOOLEAN,
    profile_image_id VARCHAR(255),
    profile_image_id_mod BOOLEAN,
    activity VARCHAR(50),
    activity_mod BOOLEAN,
    body_fat INTEGER,
    body_fat_mod BOOLEAN,
    height INTEGER,
    height_mod BOOLEAN,
    weight INTEGER,
    weight_mod BOOLEAN,
    weight_goal INTEGER,
    weight_goal_mod BOOLEAN,
    last_modified_date TIMESTAMP,
    last_modified_date_mod BOOLEAN,
    PRIMARY KEY (id, rev),
    FOREIGN KEY (rev) REFERENCES fit_tracker.revinfo(rev)
);