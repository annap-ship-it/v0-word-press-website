-- Add new fields to pages table
ALTER TABLE public.pages
  ADD COLUMN IF NOT EXISTS redirect_url TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'pending', 'published', 'archived'));

-- Update existing pages to have 'published' status if is_published is true
UPDATE public.pages
SET status = CASE
  WHEN is_published THEN 'published'
  ELSE 'draft'
END
WHERE status IS NULL;

-- We'll keep is_published for backward compatibility, but status is now the primary field
