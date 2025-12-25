-- Create media table for storing uploaded files
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON public.media(created_at DESC);

-- Enable RLS
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone authenticated can view media
CREATE POLICY "Authenticated users can view media"
  ON public.media FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can upload media
CREATE POLICY "Authenticated users can upload media"
  ON public.media FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Policy: Users can delete their own media
CREATE POLICY "Users can delete their own media"
  ON public.media FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);
