-- CRITICAL: Remove all orphaned Ukrainian posts that don't have English equivalents
-- KEEP ONLY: Ukrainian posts that have matching English versions with same slug

-- First, identify and DELETE Ukrainian posts without English counterparts
DELETE FROM posts p_uk
WHERE p_uk.locale = 'uk'
AND p_uk.status = 'published'
AND NOT EXISTS (
  SELECT 1 FROM posts p_en
  WHERE p_en.slug = p_uk.slug
  AND p_en.locale = 'en'
  AND p_en.status = 'published'
);

-- Verify the cleanup - show remaining posts grouped by slug
SELECT 
  slug,
  locale,
  title,
  COUNT(*) as count
FROM posts
WHERE status = 'published'
GROUP BY slug, locale, title
ORDER BY slug, locale;
