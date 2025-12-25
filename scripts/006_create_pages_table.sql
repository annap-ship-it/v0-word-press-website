-- Create pages table for managing site pages
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON public.pages(is_published);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published pages
CREATE POLICY "Anyone can view published pages"
  ON public.pages FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can view all pages
CREATE POLICY "Authenticated users can view all pages"
  ON public.pages FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update pages
CREATE POLICY "Authenticated users can update pages"
  ON public.pages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (auth.uid() = updated_by);

-- Policy: Authenticated users can insert pages
CREATE POLICY "Authenticated users can insert pages"
  ON public.pages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = updated_by);

-- Insert existing pages
INSERT INTO public.pages (slug, title, content, is_published) VALUES
  ('home', 'Homepage', '[]', true),
  ('about', 'About Us', '[]', true),
  ('contact', 'Contact', '[]', true),
  ('privacy', 'Privacy Policy', '[]', true),
  ('terms', 'Terms of Service', '[]', true),
  ('services', 'Our Services', '[]', true),
  ('cookie-policy', 'Cookie Policy', '[]', true)
ON CONFLICT (slug) DO NOTHING;
