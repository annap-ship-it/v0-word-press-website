-- Update Ukrainian posts with correct featured images
UPDATE posts 
SET featured_image = '/it-team-working-remotely-on-computers.jpg'
WHERE locale = 'uk' AND id = '6aaf2ddd-aa50-45ea-ba19-5198b95d37f4';

UPDATE posts 
SET featured_image = '/remote-team-management-best-practices.jpg'
WHERE locale = 'uk' AND slug = 'managing-remote-development-teams-uk';

UPDATE posts 
SET featured_image = '/5-benefits-outsourcing.jpg'
WHERE locale = 'uk' AND slug = '5-benefits-outsourcing-your-development-team-uk';

UPDATE posts 
SET featured_image = '/choosing-it-partner.jpg'
WHERE locale = 'uk' AND slug LIKE '%partner%' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/distributed-teams-best-practices.jpg'
WHERE locale = 'uk' AND slug LIKE '%teams%' AND locale = 'uk';
