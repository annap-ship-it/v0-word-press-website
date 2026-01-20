-- FIX: Remove locale suffixes from Ukrainian post slugs
-- The locale should come from the 'locale' column, not from slug suffixes
-- This ensures English is primary, Ukrainian versions use same slug with locale='uk'

-- First, identify posts with -uk, -en suffixes
SELECT slug, locale, COUNT(*) as count FROM posts GROUP BY slug, locale ORDER BY slug;

-- For each Ukrainian post with -uk suffix, create a properly localized version:
-- 1. Check if English version exists with base slug
-- 2. If not, copy Ukrainian version to English first
-- 3. Then ensure Ukrainian has the base slug with locale='uk'

-- Update Ukrainian posts: remove -uk suffix and set locale to 'uk'
UPDATE posts 
SET slug = REPLACE(slug, '-uk', ''), locale = 'uk'
WHERE slug LIKE '%-uk' AND locale = 'uk';

-- Update English posts: remove -en suffix if it exists
UPDATE posts 
SET slug = REPLACE(slug, '-en', ''), locale = 'en'
WHERE slug LIKE '%-en' AND locale = 'en';

-- Verify the changes
SELECT slug, locale, COUNT(*) as count FROM posts GROUP BY slug, locale ORDER BY slug;
