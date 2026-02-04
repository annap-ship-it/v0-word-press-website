-- Fix Ukrainian Blog Posts Featured Images and Translations
-- This script corrects the featured_image URLs for Ukrainian blog posts to match the actual files
-- and ensures proper localization setup

-- Update Ukrainian posts with correct featured image URLs
UPDATE posts 
SET featured_image = '/it-team-working-remotely-on-computers.jpg'
WHERE slug = 'benefits-outsourcing-development-team-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/developers-collaborating-on-project.jpg'
WHERE slug = 'choose-right-it-outsourcing-partner-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/team-planning-strategy-whiteboard.jpg'
WHERE slug = 'managing-remote-development-teams-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/business-meeting-handshake-partnership.jpg'
WHERE slug = 'staff-augmentation-vs-project-outsourcing-uk' AND locale = 'uk';

-- Verify the updates
SELECT slug, locale, title, featured_image, status FROM posts WHERE locale = 'uk' AND status = 'published' ORDER BY created_at DESC;
