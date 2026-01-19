-- Remove duplicates keeping only the most recent by created_at
DELETE FROM posts p1
WHERE EXISTS (
  SELECT 1 FROM posts p2
  WHERE p1.slug = p2.slug 
    AND p1.locale = p2.locale
    AND p1.id != p2.id
    AND (p2.created_at > p1.created_at OR (p2.created_at = p1.created_at AND p2.id > p1.id))
);

-- Verify all posts have unique (slug, locale) combination
SELECT slug, locale, COUNT(*) as count 
FROM posts 
GROUP BY slug, locale 
HAVING COUNT(*) > 1;
