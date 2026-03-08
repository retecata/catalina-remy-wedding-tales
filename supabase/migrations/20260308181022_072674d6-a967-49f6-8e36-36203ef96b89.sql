-- Create RSVP table for wedding guest responses
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT true,
  dietary_requirements TEXT,
  song_request TEXT,
  event TEXT NOT NULL CHECK (event IN ('netherlands', 'romania')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public RSVP form, no auth required)
CREATE POLICY "Anyone can submit an RSVP"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admin) can view RSVPs
CREATE POLICY "Authenticated users can view RSVPs"
  ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);