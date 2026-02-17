-- Update featured images for Version Control Systems and Code Reviews posts

-- Update English Version Control Systems
UPDATE posts 
SET featured_image = '/images/version-control-banner.jpg'
WHERE slug = 'version-control-systems-choose-right-approach' AND locale = 'en';

-- Update Ukrainian Version Control Systems
UPDATE posts 
SET featured_image = '/images/version-control-banner.jpg'
WHERE slug = 'version-control-systems-choose-right-approach-uk' AND locale = 'uk';

-- Update English Code Reviews
UPDATE posts 
SET featured_image = '/images/code-review-banner.jpg'
WHERE slug = 'code-reviews-boosting-code-quality' AND locale = 'en';

-- Update Ukrainian Code Reviews
UPDATE posts 
SET featured_image = '/images/code-review-banner.jpg'
WHERE slug = 'code-reviews-boosting-code-quality-uk' AND locale = 'uk';
