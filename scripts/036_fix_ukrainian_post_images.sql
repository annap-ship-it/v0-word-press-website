-- Update Ukrainian posts to use the SAME featured_image URLs as their English counterparts
-- This ensures both locales display the same image

UPDATE posts SET featured_image = '/developers-collaborating-on-project.jpg' WHERE slug = 'benefits-outsourcing-development-team' AND locale = 'uk';
UPDATE posts SET featured_image = '/business-meeting-handshake-partnership.jpg' WHERE slug = 'choose-right-it-outsourcing-partner' AND locale = 'uk';
UPDATE posts SET featured_image = '/financial-charts-data-analysis.jpg' WHERE slug = 'cost-analysis-inhouse-vs-outsourced-it-teams' AND locale = 'uk';
UPDATE posts SET featured_image = '/video-call-remote-team-meeting.jpg' WHERE slug = 'managing-remote-development-teams' AND locale = 'uk';
UPDATE posts SET featured_image = '/modern-office-space-developers.jpg' WHERE slug = 'security-best-practices-outsourcing-it-development' AND locale = 'uk';
UPDATE posts SET featured_image = '/team-planning-strategy-whiteboard.jpg' WHERE slug = 'staff-augmentation-vs-project-outsourcing' AND locale = 'uk';
UPDATE posts SET featured_image = '/it-team-working-remotely-on-computers.jpg' WHERE slug = 'ultimate-guide-it-personnel-outsourcing-2024' AND locale = 'uk';

-- Verify the fix
SELECT slug, locale, featured_image FROM posts WHERE locale = 'uk' ORDER BY slug;
