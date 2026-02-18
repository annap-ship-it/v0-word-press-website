-- Update existing Staff Augmentation post with Version Control Systems content
UPDATE posts 
SET 
  title = 'Version Control Systems: How They Work and How to Choose the Right Approach for Your Development Team',
  slug = 'version-control-systems-guide',
  excerpt = 'Discover how version control systems work and learn which approach—distributed or centralized—is right for your development team.',
  meta_title = 'Version Control Systems: Distributed vs Centralized | Development Guide',
  meta_description = 'Learn how version control systems (Git, SVN) work, their advantages, and how to choose the right VCS for your development workflow.',
  featured_image = '/blog/version-control-systems.jpg',
  content = jsonb_build_object(
    'blocks', jsonb_build_array(
      jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Why Version Control Systems Are Essential'),
      jsonb_build_object('type', 'paragraph', 'content', 'Version control systems track changes to project files over time. While they are mostly used for source code, they can also manage documentation, configuration files, design assets, and other resources.'),
      jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Secure and Structured Code Storage'),
      jsonb_build_object('type', 'paragraph', 'content', 'A key benefit of version control is the safe and reliable storage of code. VCS platforms create backups and let teams restore earlier versions if there are bugs, mistakes, or accidental deletions.'),
      jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Conclusion'),
      jsonb_build_object('type', 'paragraph', 'content', 'Version control systems are essential tools for modern software development.')
    )
  ),
  locale = 'en',
  status = 'published'
WHERE id IN (SELECT id FROM posts WHERE slug LIKE '%staff%' OR slug LIKE '%outsourcing%' LIMIT 1);

-- Insert Code Reviews post
INSERT INTO posts (title, slug, excerpt, content, locale, status, meta_title, meta_description, featured_image, author_id, category_id)
VALUES (
  'Code Reviews: Boosting Code Quality',
  'code-reviews-boosting-quality',
  'Learn how code reviews improve software quality, enhance team collaboration, and establish best practices for your development process.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Why Code Reviews Matter for Developers'),
    jsonb_build_object('type', 'paragraph', 'content', 'Code review is more than just a cross-check before code is merged. The benefits include improved code quality, knowledge sharing, and continuous learning.')
  )),
  'en',
  'published',
  'Code Reviews: Best Practices for Software Quality',
  'Discover how to implement effective code reviews, improve team collaboration, and boost code quality with practical best practices.',
  '/blog/code-reviews.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
)
ON CONFLICT (slug, locale) DO NOTHING;

-- Insert IT Outstaffing post
INSERT INTO posts (title, slug, excerpt, content, locale, status, meta_title, meta_description, featured_image, author_id, category_id)
VALUES (
  'IT Outstaffing: A Concept-Based Approach to Scaling Development Teams',
  'it-outstaffing-scaling-teams',
  'Understand the differences between outstaffing and outsourcing, and learn why outstaffing is the flexible solution for scaling your development team.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Outsourcing vs. Outstaffing'),
    jsonb_build_object('type', 'paragraph', 'content', 'Outsourcing means hiring an entire external team. Outstaffing enables a firm to have individual specialists while retaining project management control.')
  )),
  'en',
  'published',
  'IT Outstaffing: Scale Your Development Team Flexibly',
  'Learn the differences between outsourcing and outstaffing, and discover why outstaffing gives you control and flexibility when scaling your team.',
  '/blog/it-outstaffing.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
)
ON CONFLICT (slug, locale) DO NOTHING;

-- Insert Web App Development Cost post
INSERT INTO posts (title, slug, excerpt, content, locale, status, meta_title, meta_description, featured_image, author_id, category_id)
VALUES (
  'Calculating the Cost of Web App Development',
  'calculating-web-app-development-cost',
  'Understand the factors that influence web application development costs and learn strategies to optimize your budget while maintaining quality.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Factors Influencing Web Application Development Cost'),
    jsonb_build_object('type', 'paragraph', 'content', 'Web application costs depend on project complexity, technology stack, team composition, timeframe, and maintenance needs.')
  )),
  'en',
  'published',
  'Web Application Development Cost: Budget Guide 2024',
  'Calculate web app development costs, learn pricing factors, and discover strategies to optimize your budget while maintaining code quality.',
  '/blog/web-app-development-cost.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
)
ON CONFLICT (slug, locale) DO NOTHING;
