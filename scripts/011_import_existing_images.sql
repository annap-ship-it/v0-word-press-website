-- Import all existing images from /public directory into media table
INSERT INTO media (id, filename, url, size, mime_type, uploaded_by, created_at, updated_at, alt_text)
SELECT
  gen_random_uuid(),
  'hero-banner.jpg',
  '/images/hero-banner.jpg',
  0,
  'image/jpeg',
  (SELECT id FROM auth.users LIMIT 1),
  NOW(),
  NOW(),
  'Hero banner background image'
WHERE NOT EXISTS (SELECT 1 FROM media WHERE url = '/images/hero-banner.jpg');

INSERT INTO media (id, filename, url, size, mime_type, uploaded_by, created_at, updated_at, alt_text)
SELECT
  gen_random_uuid(),
  'logo.svg',
  '/images/logo.svg',
  0,
  'image/svg+xml',
  (SELECT id FROM auth.users LIMIT 1),
  NOW(),
  NOW(),
  'Company logo'
WHERE NOT EXISTS (SELECT 1 FROM media WHERE url = '/images/logo.svg');

INSERT INTO media (id, filename, url, size, mime_type, uploaded_by, created_at, updated_at, alt_text)
SELECT
  gen_random_uuid(),
  'logo_bg.svg',
  '/images/logo_bg.svg',
  0,
  'image/svg+xml',
  (SELECT id FROM auth.users LIMIT 1),
  NOW(),
  NOW(),
  'Company logo with background'
WHERE NOT EXISTS (SELECT 1 FROM media WHERE url = '/images/logo_bg.svg');

INSERT INTO media (id, filename, url, size, mime_type, uploaded_by, created_at, updated_at, alt_text)
SELECT
  gen_random_uuid(),
  'pricing-bg.jpg',
  '/images/pricing-bg.jpg',
  0,
  'image/jpeg',
  (SELECT id FROM auth.users LIMIT 1),
  NOW(),
  NOW(),
  'Pricing section background'
WHERE NOT EXISTS (SELECT 1 FROM media WHERE url = '/images/pricing-bg.jpg');
