-- Backfill missing featured images for Ukrainian posts
-- Copy featured_image from English version if Ukrainian version has NULL

UPDATE posts uk_post
SET featured_image = en_post.featured_image,
    updated_at = NOW()
FROM posts en_post
WHERE uk_post.locale = 'uk'
  AND uk_post.featured_image IS NULL
  AND en_post.locale = 'en'
  AND en_post.slug = uk_post.slug
  AND en_post.featured_image IS NOT NULL;

-- Also backfill content if it's missing/empty for Ukrainian posts
UPDATE posts uk_post
SET content = en_post.content,
    updated_at = NOW()
FROM posts en_post
WHERE uk_post.locale = 'uk'
  AND (uk_post.content IS NULL OR uk_post.content = '""'::jsonb OR uk_post.content = '{}'::jsonb)
  AND en_post.locale = 'en'
  AND en_post.slug = uk_post.slug
  AND en_post.content IS NOT NULL;

-- Verify the update
SELECT slug, locale, featured_image IS NOT NULL as has_image, content IS NOT NULL as has_content
FROM posts
WHERE status = 'published'
ORDER BY slug, locale;
