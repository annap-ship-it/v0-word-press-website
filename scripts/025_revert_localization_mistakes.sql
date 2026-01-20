-- Revert localization mistakes
-- This script removes duplicate posts created during failed migrations
-- Keeps the original Ukrainian posts that have no English counterparts
-- And keeps proper English-Ukrainian pairs

-- First, identify and remove English stub posts that were created for Ukrainian originals
-- These are posts created after a certain timestamp with no real content
DELETE FROM posts p1
WHERE p1.locale = 'en'
AND p1.content IS NULL
AND EXISTS (
  SELECT 1 FROM posts p2
  WHERE p2.slug = p1.slug
  AND p2.locale = 'uk'
  AND p2.id != p1.id
);

-- Remove duplicate posts (same slug, same locale) - keep the one with more content
DELETE FROM posts p1
WHERE EXISTS (
  SELECT 1 FROM posts p2
  WHERE p2.slug = p1.slug
  AND p2.locale = p1.locale
  AND p2.id < p1.id
  AND (p2.content IS NOT NULL OR p2.featured_image IS NOT NULL)
);

-- Verify results
SELECT 
  slug,
  locale,
  COUNT(*) as count,
  COUNT(DISTINCT id) as unique_ids
FROM posts
WHERE status = 'published'
GROUP BY slug, locale
HAVING COUNT(*) > 1
ORDER BY slug, locale;
