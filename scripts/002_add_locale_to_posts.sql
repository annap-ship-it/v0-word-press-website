-- Add locale column to posts table
ALTER TABLE public.posts 
ADD COLUMN locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'uk'));

-- Create index for faster locale filtering
CREATE INDEX IF NOT EXISTS idx_posts_locale ON public.posts(locale);
CREATE INDEX IF NOT EXISTS idx_posts_slug_locale ON public.posts(slug, locale);

-- Update existing posts to have 'en' locale (they are all in English)
UPDATE public.posts SET locale = 'en' WHERE locale IS NULL;
