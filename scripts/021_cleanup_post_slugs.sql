-- Clean up duplicate posts with locale suffixes in slug
-- Keep the clean version (without -uk, -en suffix) and delete the old ones

-- First, identify and delete old posts with -uk suffix that have duplicates without suffix
DELETE FROM posts p1
WHERE p1.slug LIKE '%-uk'
AND EXISTS (
  SELECT 1 FROM posts p2
  WHERE p2.slug = REPLACE(p1.slug, '-uk', '')
  AND p2.locale = p1.locale
  AND p2.id != p1.id
);

-- Similarly for -en suffix
DELETE FROM posts p1
WHERE p1.slug LIKE '%-en'
AND EXISTS (
  SELECT 1 FROM posts p2
  WHERE p2.slug = REPLACE(p1.slug, '-en', '')
  AND p2.locale = p1.locale
  AND p2.id != p1.id
);

-- Remove -uk from remaining Ukrainian post slugs
UPDATE posts
SET slug = REPLACE(slug, '-uk', '')
WHERE locale = 'uk'
AND slug LIKE '%-uk';

-- Remove -en from remaining English post slugs
UPDATE posts
SET slug = REPLACE(slug, '-en', '')
WHERE locale = 'en'
AND slug LIKE '%-en';

-- Verify cleanup - show all posts grouped by slug and locale
SELECT slug, locale, COUNT(*) as count
FROM posts
WHERE status = 'published'
GROUP BY slug, locale
ORDER BY slug, locale;
