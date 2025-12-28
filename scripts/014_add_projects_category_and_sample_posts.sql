-- Add Projects category if not exists
INSERT INTO categories (name, slug, color)
VALUES ('Projects', 'projects', '#FF6200')
ON CONFLICT (slug) DO NOTHING;

-- Get the projects category ID for reference
-- SELECT id FROM categories WHERE slug = 'projects';
-- Use this ID when creating posts with category "projects"

-- Note: Projects are managed through the admin panel blog section
-- When creating a new post, select category "Projects" to make it appear on the Projects PLP page
-- The post content should include:
-- - Challenge: description of the challenge
-- - Solution: description of the solution
-- - Result: description of the result
-- - Stack: comma-separated list of technologies
