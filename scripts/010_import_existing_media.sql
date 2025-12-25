-- Import existing images from public folder into media library
-- This script creates media records for all existing site images

DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the first admin user
  SELECT id INTO admin_user_id FROM auth.users LIMIT 1;
  
  -- Only proceed if we have a user
  IF admin_user_id IS NOT NULL THEN
    -- Insert existing images
    INSERT INTO media (filename, file_path, file_type, file_size, uploaded_by, alt_text, created_at, updated_at)
    VALUES
      -- Logo images
      ('logo-bg.png', '/images/logo-bg.png', 'image/png', 0, admin_user_id, 'IdeaTeam Logo Background', NOW(), NOW()),
      ('logo-bg.svg', '/images/logo-bg.svg', 'image/svg+xml', 0, admin_user_id, 'IdeaTeam Logo Background SVG', NOW(), NOW()),
      ('logo-dark.svg', '/images/logo-dark.svg', 'image/svg+xml', 0, admin_user_id, 'IdeaTeam Dark Logo', NOW(), NOW()),
      ('logo-light.svg', '/images/logo-light.svg', 'image/svg+xml', 0, admin_user_id, 'IdeaTeam Light Logo', NOW(), NOW()),
      
      -- Banner images
      ('banner-dark.png', '/images/banner-dark.png', 'image/png', 0, admin_user_id, 'Dark Theme Banner', NOW(), NOW()),
      ('banner-light.png', '/images/banner-light.png', 'image/png', 0, admin_user_id, 'Light Theme Banner', NOW(), NOW()),
      ('banner-terms-dark.png', '/images/banner-terms-dark.png', 'image/png', 0, admin_user_id, 'Terms Banner Dark', NOW(), NOW()),
      ('banner-terms-light.png', '/images/banner-terms-light.png', 'image/png', 0, admin_user_id, 'Terms Banner Light', NOW(), NOW()),
      
      -- Policy banners
      ('privacy-dark.png', '/images/privacy-dark.png', 'image/png', 0, admin_user_id, 'Privacy Policy Dark Banner', NOW(), NOW()),
      ('privacy-light.png', '/images/privacy-light.png', 'image/png', 0, admin_user_id, 'Privacy Policy Light Banner', NOW(), NOW()),
      ('cookie-dark.png', '/images/cookie-dark.png', 'image/png', 0, admin_user_id, 'Cookie Policy Dark Banner', NOW(), NOW()),
      ('cookie-light.png', '/images/cookie-light.png', 'image/png', 0, admin_user_id, 'Cookie Policy Light Banner', NOW(), NOW()),
      
      -- Content images
      ('blog-article-laptop.jpg', '/images/blog-article-laptop.jpg', 'image/jpeg', 0, admin_user_id, 'Blog Article on Laptop', NOW(), NOW()),
      ('laptop-ecommerce.png', '/images/laptop-ecommerce.png', 'image/png', 0, admin_user_id, 'E-commerce on Laptop', NOW(), NOW()),
      ('projects-laptop.png', '/images/projects-laptop.png', 'image/png', 0, admin_user_id, 'Projects on Laptop', NOW(), NOW()),
      ('projects-mobile-card.png', '/images/projects-mobile-card.png', 'image/png', 0, admin_user_id, 'Projects Mobile Card', NOW(), NOW()),
      ('portfolio-card-mobile.png', '/images/portfolio-card-mobile.png', 'image/png', 0, admin_user_id, 'Portfolio Mobile Card', NOW(), NOW()),
      
      -- Icons
      ('market-rate-icon.svg', '/images/market-rate-icon.svg', 'image/svg+xml', 0, admin_user_id, 'Market Rate Icon', NOW(), NOW()),
      ('team-icon.svg', '/images/team-icon.svg', 'image/svg+xml', 0, admin_user_id, 'Team Icon', NOW(), NOW()),
      ('trending-icon.svg', '/images/trending-icon.svg', 'image/svg+xml', 0, admin_user_id, 'Trending Icon', NOW(), NOW()),
      ('wallet-icon.svg', '/images/wallet-icon.svg', 'image/svg+xml', 0, admin_user_id, 'Wallet Icon', NOW(), NOW()),
      
      -- Rating logos
      ('clutch-logo.svg', '/images/clutch-logo.svg', 'image/svg+xml', 0, admin_user_id, 'Clutch Logo', NOW(), NOW()),
      ('dou-logo.svg', '/images/dou-logo.svg', 'image/svg+xml', 0, admin_user_id, 'DOU Logo', NOW(), NOW()),
      ('g2-logo.svg', '/images/g2-logo.svg', 'image/svg+xml', 0, admin_user_id, 'G2 Logo', NOW(), NOW()),
      ('sortlist-logo.svg', '/images/sortlist-logo.svg', 'image/svg+xml', 0, admin_user_id, 'Sortlist Logo', NOW(), NOW()),
      ('google-logo.svg', '/images/google-logo.svg', 'image/svg+xml', 0, admin_user_id, 'Google Logo', NOW(), NOW()),
      ('raiting-logos.png', '/images/raiting-logos.png', 'image/png', 0, admin_user_id, 'Rating Logos Combined', NOW(), NOW()),
      
      -- Maps
      ('world-map.svg', '/images/world-map.svg', 'image/svg+xml', 0, admin_user_id, 'World Map', NOW(), NOW()),
      ('world-map-light.svg', '/images/world-map-light.svg', 'image/svg+xml', 0, admin_user_id, 'World Map Light', NOW(), NOW()),
      
      -- Other images
      ('objects.png', '/images/objects.png', 'image/png', 0, admin_user_id, 'Objects', NOW(), NOW()),
      ('sun-light.png', '/images/sun-light.png', 'image/png', 0, admin_user_id, 'Sun Light', NOW(), NOW()),
      ('candidate-4.jpg', '/images/candidate-4.jpg', 'image/jpeg', 0, admin_user_id, 'Team Member Photo', NOW(), NOW()),
      
      -- Root level images
      ('female-developer-portrait.png', '/female-developer-portrait.png', 'image/png', 0, admin_user_id, 'Female Developer Portrait', NOW(), NOW()),
      ('female-developer-portrait-casual.jpg', '/female-developer-portrait-casual.jpg', 'image/jpeg', 0, admin_user_id, 'Female Developer Casual Portrait', NOW(), NOW()),
      ('male-developer-portrait.png', '/male-developer-portrait.png', 'image/png', 0, admin_user_id, 'Male Developer Portrait', NOW(), NOW()),
      ('placeholder.jpg', '/placeholder.jpg', 'image/jpeg', 0, admin_user_id, 'Placeholder Image', NOW(), NOW())
    ON CONFLICT (file_path) DO NOTHING;
    
    RAISE NOTICE 'Successfully imported existing media files';
  ELSE
    RAISE NOTICE 'No admin user found, skipping media import';
  END IF;
END $$;
