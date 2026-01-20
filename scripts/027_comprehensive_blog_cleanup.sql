-- COMPREHENSIVE BLOG CLEANUP
-- Step 1: Identify and delete bad English entries (with Ukrainian titles)
DELETE FROM posts 
WHERE locale = 'en' 
AND (
  title LIKE '%перева%' OR 
  title LIKE '%аутсорсин%' OR
  title LIKE '%команди%' OR
  title LIKE '%розроб%' OR
  title LIKE '%IT-партне%' OR
  title LIKE '%Управління%' OR
  title LIKE '%Розширен%' OR
  title LIKE '%Повний%'
);

-- Step 2: Delete orphaned Ukrainian posts (no English counterpart)
DELETE FROM posts p_uk
WHERE p_uk.locale = 'uk'
AND NOT EXISTS (
  SELECT 1 FROM posts p_en
  WHERE p_en.locale = 'en'
  AND p_en.slug = p_uk.slug
  AND p_en.status = 'published'
);

-- Step 3: Delete duplicate English slugs using DISTINCT ON
DELETE FROM posts 
WHERE locale = 'en' 
AND id NOT IN (
  SELECT DISTINCT ON (slug) id FROM posts 
  WHERE locale = 'en' AND status = 'published'
  ORDER BY slug, created_at DESC
);

-- Step 4: Verify final state
SELECT 
  slug, 
  locale, 
  COUNT(*) as count,
  STRING_AGG(title, ' | ') as titles
FROM posts
WHERE status = 'published'
GROUP BY slug, locale
ORDER BY slug, locale;
