-- Verify data integrity for Ukrainian posts
-- Ensure each Ukrainian post has either:
-- 1. An English version with the same slug
-- 2. Or proper meta_title and meta_description for standalone Ukrainian posts

-- Show posts with no English equivalent (this is OK if they have proper metadata)
SELECT 
  'UKRAINE_ONLY' as status,
  p.slug,
  p.locale,
  p.title,
  p.meta_title,
  p.meta_description,
  p.created_at
FROM posts p
WHERE p.locale = 'uk'
AND p.status = 'published'
AND NOT EXISTS (
  SELECT 1 FROM posts p2
  WHERE p2.locale = 'en'
  AND p2.slug = p.slug
)
ORDER BY p.created_at DESC;

-- Show all posts with their English counterparts (if they exist)
SELECT 
  en.slug,
  en.title as "English Title",
  en.meta_title as "English Meta Title",
  en.meta_description as "English Meta Description",
  uk.title as "Ukrainian Title",
  uk.meta_title as "Ukrainian Meta Title",
  uk.meta_description as "Ukrainian Meta Description"
FROM posts en
LEFT JOIN posts uk ON en.slug = uk.slug AND uk.locale = 'uk'
WHERE en.locale = 'en'
AND en.status = 'published'
ORDER BY en.created_at DESC;
