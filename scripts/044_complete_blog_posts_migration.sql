-- Delete posts that are not in the PDF (staff augmentation and remote management)
DELETE FROM posts 
WHERE slug IN (
  'staff-augmentation-vs-project-outsourcing',
  'managing-remote-development-teams'
);

-- 1. UPDATE/INSERT VERSION CONTROL SYSTEMS POST (ENGLISH)
INSERT INTO posts (
  title, slug, excerpt, content, locale, status, 
  meta_title, meta_description, featured_image, author_id, category_id
) VALUES (
  'Version Control Systems: How They Work and How to Choose the Right Approach for Your Development Team',
  'version-control-systems-guide',
  'In modern software development, teams use tools to track code changes, collaborate, and document their progress. Learn how VCS works and which approach fits your team.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Why Version Control Systems Are Essential'),
    jsonb_build_object('type', 'paragraph', 'content', 'Version control systems track changes to project files over time. A key benefit is the safe and reliable storage of code. VCS platforms create backups and let teams restore earlier versions if there are bugs, mistakes, or accidental deletions.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Main Categories of Version Control'),
    jsonb_build_object('type', 'paragraph', 'content', 'Most version control systems are either distributed or centralised. Distributed Version Control Systems (DVCS) like Git have become industry standards. In a distributed model, every developer downloads a complete copy of the project repository onto their local machine.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Centralised Version Control Systems'),
    jsonb_build_object('type', 'paragraph', 'content', 'Centralised systems use a single main repository as the source for project data. Popular tools include Subversion (SVN) and Perforce. Although distributed systems are popular, centralised solutions are still important, especially in some industries.'),
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Conclusion'),
    jsonb_build_object('type', 'paragraph', 'content', 'Version control systems are essential tools for modern software development. The best version control system fits your team''s workflow, technical needs, and long-term goals.')
  )),
  'en', 'published',
  'Version Control Systems Guide for Development Teams',
  'Learn how version control systems work - distributed vs centralised approaches, and choose the right VCS for your development team.',
  '/blog/version-control-systems.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
) ON CONFLICT (slug, locale) DO UPDATE SET
  title = 'Version Control Systems: How They Work and How to Choose the Right Approach for Your Development Team',
  excerpt = 'In modern software development, teams use tools to track code changes, collaborate, and document their progress. Learn how VCS works and which approach fits your team.',
  featured_image = '/blog/version-control-systems.jpg',
  meta_title = 'Version Control Systems Guide for Development Teams',
  meta_description = 'Learn how version control systems work - distributed vs centralised approaches, and choose the right VCS for your development team.',
  status = 'published';

-- 2. INSERT CODE REVIEWS POST (ENGLISH)
INSERT INTO posts (
  title, slug, excerpt, content, locale, status, 
  meta_title, meta_description, featured_image, author_id, category_id
) VALUES (
  'Code Reviews: Boosting Code Quality and Team Development',
  'code-reviews-best-practices',
  'Modern software development has made code reviews a must. Good code reviews create better quality software and enhance your developers'' capabilities and collaboration.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Why Code Reviews Matter for Developers'),
    jsonb_build_object('type', 'paragraph', 'content', 'Code review is more than just a cross-check before code is merged. The benefits include: Improved Writing Quality, Knowledge Sharing, Continuous Learning, and Team Resilience.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'A Variety of Code Reviews Are Possible'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Self-review: A developer checks their own code before submitting', 'Desk checks: Quick peer reviews at a workstation', 'Peer reviews via tools: GitHub, GitLab, or specialized code review tools', 'Formal review meetings: Structured team sessions', 'Code walkthroughs: Detailed line-by-line reviews')),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Best Practices for Writing Good Code Reviews'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Create psychological safety for collaborative feedback', 'Use checklists to standardize reviews', 'Promote self-review first', 'Keep reviews small (200-400 lines)', 'Minimize duration to prevent fatigue', 'Set transparent processes for defects', 'Track key metrics', 'Use automation tools', 'Automate objective checks', 'Rotate reviewers')),
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Conclusion'),
    jsonb_build_object('type', 'paragraph', 'content', 'Well-executed code reviews strengthen both code quality and team development. They discover bugs early, disseminate knowledge, and enhance productivity.')
  )),
  'en', 'published',
  'Code Reviews: Best Practices for Software Quality',
  'Discover how to implement effective code reviews, improve team collaboration, boost code quality with 10 best practices for development teams.',
  '/blog/code-reviews.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
) ON CONFLICT (slug, locale) DO UPDATE SET
  title = 'Code Reviews: Boosting Code Quality and Team Development',
  excerpt = 'Modern software development has made code reviews a must. Good code reviews create better quality software and enhance your developers'' capabilities and collaboration.',
  featured_image = '/blog/code-reviews.jpg',
  meta_title = 'Code Reviews: Best Practices for Software Quality',
  meta_description = 'Discover how to implement effective code reviews, improve team collaboration, boost code quality with 10 best practices for development teams.',
  status = 'published';

-- 3. INSERT IT OUTSTAFFING POST (ENGLISH)
INSERT INTO posts (
  title, slug, excerpt, content, locale, status, 
  meta_title, meta_description, featured_image, author_id, category_id
) VALUES (
  'IT Outstaffing: A Concept-Based Approach to Scaling Development Teams',
  'it-outstaffing-vs-outsourcing',
  'Understand the differences between outstaffing and outsourcing. Learn why outstaffing is the flexible solution for scaling your development team while maintaining control.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Outsourcing vs. Outstaffing: How Are They Different?'),
    jsonb_build_object('type', 'paragraph', 'content', 'Outsourcing means hiring an entire external team. The outsourced team takes care of everything – development, testing and deployment. By contrast, outstaffing enables a firm to have individual specialists employed through a reliable partner while project management continues.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'When it''s More Advantageous To Outstaff'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Scalability - Rapidly onboard specialists for temporary or long-term projects', 'Flexible resource management - Modify team size when workload changes', 'Diverse technology expertise - Access knowledge across multiple tech stacks', 'Quality and process control - Apply internal standards to development')),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Outstaffing with Idea Team'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Fast availability of talented developers', 'Lower HR and office overhead', 'Scalable teams', 'Knowledge exchange and enhancement')),
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Conclusion'),
    jsonb_build_object('type', 'paragraph', 'content', 'Outstaffing is flexible and effective for scaling development teams. Companies can compete more effectively, produce jobs more quickly, and prevent overburdening internal staff.')
  )),
  'en', 'published',
  'IT Outstaffing vs Outsourcing: Scale Your Dev Team',
  'Learn differences between outsourcing and outstaffing. Discover why outstaffing gives you control and flexibility when scaling your development team.',
  '/blog/it-outstaffing.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
) ON CONFLICT (slug, locale) DO UPDATE SET
  title = 'IT Outstaffing: A Concept-Based Approach to Scaling Development Teams',
  excerpt = 'Understand the differences between outstaffing and outsourcing. Learn why outstaffing is the flexible solution for scaling your development team while maintaining control.',
  featured_image = '/blog/it-outstaffing.jpg',
  meta_title = 'IT Outstaffing vs Outsourcing: Scale Your Dev Team',
  meta_description = 'Learn differences between outsourcing and outstaffing. Discover why outstaffing gives you control and flexibility when scaling your development team.',
  status = 'published';

-- 4. INSERT WEB APP DEVELOPMENT COST POST (ENGLISH)
INSERT INTO posts (
  title, slug, excerpt, content, locale, status, 
  meta_title, meta_description, featured_image, author_id, category_id
) VALUES (
  'Calculating the Cost of Web App Development',
  'web-app-development-cost-guide',
  'Knowing how much web application development costs is important for any business. Understand the factors that influence costs and strategies to optimize your budget.',
  jsonb_build_object('blocks', jsonb_build_array(
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Factors Influencing Web Application Development Cost'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', '1. Project Complexity'),
    jsonb_build_object('type', 'paragraph', 'content', 'Simple projects need fewer developers and less time. Complex apps with real-time processing, payment systems, AI features, multiple languages require larger teams, more time, and specialized skills.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', '2. Technology Stack'),
    jsonb_build_object('type', 'paragraph', 'content', 'A modern web application might need Node.js, Python/Django, Ruby on Rails, Java for backend; PostgreSQL, MongoDB, MySQL for databases; AWS, Azure for cloud infrastructure.'),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', '3. Team Composition'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Front-end and back-end developers', 'UX/UI designers', 'QA engineers and testers', 'Project managers')),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Strategies to Optimise Web Application Development'),
    jsonb_build_object('type', 'list', 'items', jsonb_build_array('Prioritize features: Start with the most important functions', 'Leverage Outstaffing Services: Access skilled developers without HR overhead', 'Pick scalable technology: Flexible frameworks', 'Keep communication clear: Regular updates prevent costs')),
    jsonb_build_object('type', 'heading', 'level', 3, 'content', 'Average Cost Estimates'),
    jsonb_build_object('type', 'paragraph', 'content', 'Simple app: $5,000–$15,000 (1–2 months) | Medium: $15,000–$50,000 (3–6 months) | Complex: $50,000–$150,000+ (6–12+ months)'),
    jsonb_build_object('type', 'heading', 'level', 2, 'content', 'Conclusion'),
    jsonb_build_object('type', 'paragraph', 'content', 'Knowing the cost of web application development is key to planning. By choosing the right partner and managing your project effectively, you can keep costs under control.')
  )),
  'en', 'published',
  'Web App Development Cost Guide 2024',
  'Calculate web app development costs, understand pricing factors, and discover strategies to optimize your budget while maintaining quality.',
  '/blog/web-app-development-cost.jpg',
  (SELECT author_id FROM posts LIMIT 1),
  (SELECT id FROM categories LIMIT 1)
) ON CONFLICT (slug, locale) DO UPDATE SET
  title = 'Calculating the Cost of Web App Development',
  excerpt = 'Knowing how much web application development costs is important for any business. Understand the factors that influence costs and strategies to optimize your budget.',
  featured_image = '/blog/web-app-development-cost.jpg',
  meta_title = 'Web App Development Cost Guide 2024',
  meta_description = 'Calculate web app development costs, understand pricing factors, and discover strategies to optimize your budget while maintaining quality.',
  status = 'published';
