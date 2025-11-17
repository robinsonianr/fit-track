DO $$
BEGIN
    IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'fit_tracker'
          AND table_name = 'customer'
          AND column_name = 'member_since'
      ) THEN
ALTER TABLE fit_tracker.customer ALTER COLUMN member_since SET DEFAULT CURRENT_TIMESTAMP;
END IF;
END $$;