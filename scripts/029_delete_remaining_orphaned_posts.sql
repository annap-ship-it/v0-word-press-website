-- FINAL CLEANUP: Delete remaining orphaned Ukrainian posts and fix slugs

-- Step 1: Delete all orphaned Ukrainian posts (those without English counterpart)
DELETE FROM posts p_uk
WHERE p_uk.locale = 'uk'
AND p_uk.slug LIKE '%-uk'
AND NOT EXISTS (
  SELECT 1 FROM posts p_en
  WHERE p_en.locale = 'en'
  AND (
    p_en.slug = REPLACE(p_uk.slug, '-uk', '') 
    OR p_en.slug = REPLACE(p_uk.slug, '-uk', '')
  )
  AND p_en.status = 'published'
);

-- Step 2: Delete all orphaned Ukrainian posts without English matching by similar content
DELETE FROM posts p_uk
WHERE p_uk.locale = 'uk'
AND p_uk.status = 'published'
AND NOT EXISTS (
  SELECT 1 FROM posts p_en
  WHERE p_en.locale = 'en'
  AND p_en.slug = p_uk.slug
  AND p_en.status = 'published'
);

-- Step 3: Verify final state - show all remaining posts
SELECT 
  slug, 
  locale, 
  COUNT(*) as count,
  STRING_AGG(title, ' | ') as titles
FROM posts
WHERE status = 'published'
GROUP BY slug, locale
ORDER BY slug, locale;
