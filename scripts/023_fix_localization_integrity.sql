-- Fix critical localization issues

-- Step 1: Backfill missing meta_title and meta_description for English posts
UPDATE posts
SET 
  meta_title = COALESCE(meta_title, title || ' | Blog | Idea Team Dev'),
  meta_description = COALESCE(meta_description, excerpt)
WHERE locale = 'en'
AND status = 'published'
AND (meta_title IS NULL OR meta_description IS NULL);

-- Step 2: For Ukrainian-only posts, create English versions as stubs
-- This ensures every Ukrainian post has an English counterpart for fallback
INSERT INTO posts (
  id, title, slug, excerpt, content, featured_image,
  category_id, created_at, updated_at, author_id, status, locale,
  meta_title, meta_description
)
SELECT
  gen_random_uuid(),
  uk.title,  -- Use Ukrainian title for English version (will show Ukrainian content in English fallback)
  uk.slug,
  uk.excerpt,
  uk.content,
  uk.featured_image,
  uk.category_id,
  uk.created_at,
  uk.updated_at,
  uk.author_id,
  'published',
  'en' as locale,
  uk.title || ' | Blog | Idea Team Dev' as meta_title,
  uk.excerpt as meta_description
FROM posts uk
WHERE uk.locale = 'uk'
AND uk.status = 'published'
AND NOT EXISTS (
  SELECT 1 FROM posts en
  WHERE en.slug = uk.slug
  AND en.locale = 'en'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- Step 3: Backfill meta tags for Ukrainian posts from English equivalents or self
UPDATE posts uk
SET 
  meta_title = COALESCE(
    uk.meta_title,
    COALESCE(
      (SELECT en.meta_title FROM posts en WHERE en.slug = uk.slug AND en.locale = 'en' LIMIT 1),
      uk.title || ' | Blog | Idea Team Dev'
    )
  ),
  meta_description = COALESCE(
    uk.meta_description,
    COALESCE(
      (SELECT en.meta_description FROM posts en WHERE en.slug = uk.slug AND en.locale = 'en' LIMIT 1),
      uk.excerpt
    )
  )
WHERE uk.locale = 'uk'
AND uk.status = 'published'
AND (uk.meta_title IS NULL OR uk.meta_description IS NULL);

-- Verify the result
SELECT 
  slug,
  locale,
  COUNT(*) as count,
  MAX(CASE WHEN meta_title IS NULL THEN 1 ELSE 0 END) as missing_meta_title,
  MAX(CASE WHEN meta_description IS NULL THEN 1 ELSE 0 END) as missing_meta_description
FROM posts
WHERE status = 'published'
GROUP BY slug, locale
ORDER BY slug, locale;
