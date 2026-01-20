-- Final Blog Post Localization Verification
-- Verifies that the database matches the required structure

-- Check English posts (should be 7)
SELECT 
  slug,
  locale,
  title,
  COUNT(*) as count
FROM posts
WHERE locale = 'en' AND status = 'published'
GROUP BY slug, locale, title
ORDER BY slug;

-- Check Ukrainian posts (should be 2, paired with English)
SELECT 
  slug,
  locale,
  title,
  COUNT(*) as count
FROM posts
WHERE locale = 'uk' AND status = 'published'
GROUP BY slug, locale, title
ORDER BY slug;
