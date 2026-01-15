-- Fix Ukrainian posts with correct featured images per post
-- This ensures Ukrainian posts have the same images as English version

UPDATE posts 
SET featured_image = '/it-team-working-remotely-on-computers.jpg'
WHERE locale = 'uk' AND slug = 'the-ultimate-guide-to-it-personnel-outsourcing-uk';

UPDATE posts 
SET featured_image = '/developers-collaborating-on-project.jpg'
WHERE locale = 'uk' AND slug = '5-benefits-outsourcing-your-development-team-uk';

UPDATE posts 
SET featured_image = '/business-meeting-handshake-partnership.jpg'
WHERE locale = 'uk' AND slug = 'choose-right-it-outsourcing-partner-uk';

UPDATE posts 
SET featured_image = '/team-planning-strategy-whiteboard.jpg'
WHERE locale = 'uk' AND slug = 'staff-augmentation-vs-project-outsourcing-uk';

UPDATE posts 
SET featured_image = '/video-call-remote-team-meeting.jpg'
WHERE locale = 'uk' AND slug = 'managing-remote-development-teams-uk';

-- Verify the updates
SELECT id, title, locale, featured_image FROM posts WHERE locale = 'uk' ORDER BY created_at DESC;
