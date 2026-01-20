-- Remove duplicate English slugs (keep only the cleaner/more recent one)
-- cost-analysis-in-house-vs-outsourced -> cost-analysis-inhouse-vs-outsourced-it-teams (remove first one)
DELETE FROM posts 
WHERE slug = 'cost-analysis-in-house-vs-outsourced' 
AND locale = 'en';

-- it-personnel-outsourcing-guide-2024 -> ultimate-guide-it-personnel-outsourcing-2024 (remove first one)
DELETE FROM posts 
WHERE slug = 'it-personnel-outsourcing-guide-2024' 
AND locale = 'en';

-- staff-augmentation-vs-dedicated-teams (remove this, keep staff-augmentation-vs-project-outsourcing)
DELETE FROM posts 
WHERE slug = 'staff-augmentation-vs-dedicated-teams' 
AND locale = 'en';

-- managing-remote-it-teams-best-practices -> managing-remote-development-teams (remove first one)
DELETE FROM posts 
WHERE slug = 'managing-remote-it-teams-best-practices' 
AND locale = 'en';

-- staff-augmentation-vs-project-outsourcing (remove English, keep Ukrainian)
-- Actually this one is fine - it has Ukrainian translation

-- Verify final clean state
SELECT 
  slug, 
  locale, 
  COUNT(*) as count,
  title
FROM posts
WHERE status = 'published'
GROUP BY slug, locale, title
ORDER BY slug, locale;
