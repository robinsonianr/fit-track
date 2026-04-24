DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'fit_tracker' AND table_name = 'customer'
    ) THEN
        ALTER TABLE fit_tracker.customer RENAME TO member;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'fit_tracker' AND table_name = 'customer_aud'
    ) THEN
        ALTER TABLE fit_tracker.customer_aud RENAME TO member_aud;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.sequences
        WHERE sequence_schema = 'fit_tracker' AND sequence_name = 'customer_id_seq'
    ) THEN
        ALTER SEQUENCE fit_tracker.customer_id_seq RENAME TO member_id_seq;
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_schema = 'fit_tracker'
          AND table_name = 'workout'
          AND constraint_name = 'workout_customer_id_fkey'
    ) THEN
        ALTER TABLE fit_tracker.workout
            RENAME CONSTRAINT workout_customer_id_fkey TO workout_member_id_fkey;
    END IF;
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
          AND table_name = 'workout'
          AND column_name = 'customer_id'
    ) THEN
        ALTER TABLE fit_tracker.workout
            RENAME COLUMN customer_id TO member_id;
    END IF;
END $$;
