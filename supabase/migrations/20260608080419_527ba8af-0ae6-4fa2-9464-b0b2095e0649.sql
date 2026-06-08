GRANT SELECT, INSERT, UPDATE, DELETE ON public.rsvps TO authenticated;
GRANT SELECT, INSERT ON public.rsvps TO anon;
GRANT ALL ON public.rsvps TO service_role;