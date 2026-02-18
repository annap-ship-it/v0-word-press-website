-- Update blog posts with featured images
-- Maps the generated images to the blog posts

UPDATE posts 
SET featured_image = '/blog/version-control-systems.jpg'
WHERE slug = 'version-control-systems' AND locale = 'en';

UPDATE posts 
SET featured_image = '/blog/version-control-systems.jpg'
WHERE slug = 'version-control-systems-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/blog/code-reviews.jpg'
WHERE slug = 'code-reviews-boosting-quality' AND locale = 'en';

UPDATE posts 
SET featured_image = '/blog/code-reviews.jpg'
WHERE slug = 'code-reviews-boosting-quality-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/blog/it-outstaffing.jpg'
WHERE slug = 'it-outstaffing-scaling-teams' AND locale = 'en';

UPDATE posts 
SET featured_image = '/blog/it-outstaffing.jpg'
WHERE slug = 'it-outstaffing-scaling-teams-uk' AND locale = 'uk';

UPDATE posts 
SET featured_image = '/blog/web-app-development-cost.jpg'
WHERE slug = 'calculating-web-app-development-cost' AND locale = 'en';

UPDATE posts 
SET featured_image = '/blog/web-app-development-cost.jpg'
WHERE slug = 'calculating-web-app-development-cost-uk' AND locale = 'uk';
