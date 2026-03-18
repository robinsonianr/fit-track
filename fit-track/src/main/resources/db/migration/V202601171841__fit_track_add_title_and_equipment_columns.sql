DO $$
BEGIN
IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'fit_tracker'
      AND table_name = 'workout'
      AND column_name = 'title'
) THEN
    ALTER TABLE fit_tracker.workout ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT 'Untitled Workout';
END IF;

IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'fit_tracker'
      AND table_name = 'exercises'
      AND column_name = 'equipment'
) THEN
    ALTER TABLE fit_tracker.exercises ADD COLUMN equipment VARCHAR(255) NOT NULL DEFAULT 'Unknown Equipment';
END IF;
END $$;