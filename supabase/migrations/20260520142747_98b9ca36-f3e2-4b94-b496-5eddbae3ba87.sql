
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL DEFAULT 'netherlands',
  uploader_name TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous uploads from QR code)
CREATE POLICY "Anyone can upload a photo"
ON public.photos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No direct SELECT policy — reads go through the edge function which enforces the reveal time.
-- No DELETE policy — deletion goes through the edge function with the moderator code (service role).

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wedding-photos-nl',
  'wedding-photos-nl',
  true,
  10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/heic','image/heif','image/gif']
);

-- Storage policies: anyone can upload, anyone can read (gallery is gated at app level via edge function returning rows)
CREATE POLICY "Anyone can upload wedding photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'wedding-photos-nl');

CREATE POLICY "Anyone can read wedding photos"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'wedding-photos-nl');
