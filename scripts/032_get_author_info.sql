-- Check existing posts to get author_id and category_id
SELECT id as author_id, display_name FROM profiles LIMIT 1;
SELECT DISTINCT author_id FROM posts WHERE status = 'published' LIMIT 1;
SELECT DISTINCT category_id FROM posts WHERE status = 'published' LIMIT 1;
