-- Check if Ukrainian posts have content
SELECT 
  slug, 
  locale, 
  title,
  CASE 
    WHEN content IS NULL THEN 'NULL'
    WHEN content = '{}' THEN 'EMPTY OBJECT'
    WHEN length(content::text) < 100 THEN 'TOO SHORT: ' || length(content::text) || ' chars'
    ELSE 'OK - ' || length(content::text) || ' chars'
  END as content_status
FROM posts 
WHERE locale = 'uk'
ORDER BY slug;
