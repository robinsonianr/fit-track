DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'activity'
    ) THEN
        ALTER TABLE fit_tracker.customer ADD COLUMN activity VARCHAR(50);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'body_fat'
    ) THEN
        ALTER TABLE fit_tracker.customer ADD COLUMN body_fat INTEGER;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'height'
    ) THEN
        ALTER TABLE fit_tracker.customer ADD COLUMN height INTEGER;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'weight'
    ) THEN
        ALTER TABLE fit_tracker.customer ADD COLUMN weight INTEGER;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'fit_tracker'
        AND table_name = 'customer'
        AND column_name = 'weight_goal'
    ) THEN
        ALTER TABLE fit_tracker.customer ADD COLUMN weight_goal INTEGER;
    END IF;
END $$;