ALTER TABLE public.rsvps
  ADD COLUMN IF NOT EXISTS has_plus_one boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS plus_one_name text,
  ADD COLUMN IF NOT EXISTS plus_one_dietary_requirements text;