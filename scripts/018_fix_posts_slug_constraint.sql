-- Fix posts slug constraint to be locale-aware
-- Drop the old unique constraint
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_slug_key;

-- Add a new composite unique constraint on (slug, locale)
ALTER TABLE public.posts ADD CONSTRAINT posts_slug_locale_unique UNIQUE (slug, locale);

-- Update the index
DROP INDEX IF EXISTS idx_posts_slug;
CREATE INDEX IF NOT EXISTS idx_posts_slug_locale ON public.posts(slug, locale);
