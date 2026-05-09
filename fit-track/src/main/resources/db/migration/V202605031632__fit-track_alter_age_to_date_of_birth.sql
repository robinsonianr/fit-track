ALTER TABLE fit_tracker.member
    DROP COLUMN age,
    ADD COLUMN date_of_birth DATE NOT NULL DEFAULT '1900-01-01';


ALTER TABLE fit_tracker.member_aud
    DROP COLUMN age,
    DROP COLUMN age_mod,
    ADD COLUMN date_of_birth DATE NOT NULL DEFAULT '1900-01-01',
    ADD COLUMN date_of_birth_mod BOOLEAN;