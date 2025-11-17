  -- Add volume column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'fit_tracker'
          AND table_name = 'workout'
          AND column_name = 'volume'
      ) THEN
ALTER TABLE fit_tracker.workout ADD COLUMN volume INTEGER;
END IF;
END $$;

-- Add volume column if it doesn't exist
DO $$
  BEGIN
      IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'fit_tracker'
            AND table_name = 'workout'
            AND column_name = 'exercises'
      ) THEN
          ALTER TABLE fit_tracker.workout ADD COLUMN exercises INTEGER;
      END IF;
  END $$;