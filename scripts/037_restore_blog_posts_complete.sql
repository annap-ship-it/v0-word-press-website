-- Remove ALL Ukrainian posts (including duplicates with empty content)
DELETE FROM posts WHERE locale = 'uk';

-- Insert Ukrainian translations directly with hard-coded data
INSERT INTO posts (id, title, slug, excerpt, content, featured_image, status, category_id, author_id, published_at, created_at, updated_at, locale, meta_title, meta_description)
VALUES 
(
  gen_random_uuid(),
  'Як вибрати правильного IT-партнера для аутсорсингу: контрольний список',
  'choose-right-it-outsourcing-partner',
  'Дізнайтеся про основні критерії вибору IT партнера для аутсорсингу.',
  '{"blocks":[{"type":"paragraph","text":"Вибір правильного IT партнера для аутсорсингу може визначити успіх проекту."}]}'::jsonb,
  '/developers-collaborating-on-project.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW(),
  NOW(),
  NOW(),
  'uk',
  'Як вибрати правильного IT-партнера для аутсорсингу',
  'Дізнайтеся про основні критерії вибору IT партнера.'
),
(
  gen_random_uuid(),
  'Розширення штату vs. Аутсорсинг проектів: Що підходить вам?',
  'staff-augmentation-vs-project-outsourcing',
  'Порівняйте дві найпопулярніші моделі IT аутсорсингу та виберіть найкращу.',
  '{"blocks":[{"type":"paragraph","text":"Коли мова йде про IT аутсорсинг, дві моделі домінують на ринку."}]}'::jsonb,
  '/business-meeting-handshake-partnership.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'new' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW(),
  NOW(),
  NOW(),
  'uk',
  'Розширення штату vs. Аутсорсинг проектів',
  'Порівняйте дві найпопулярніші моделі IT аутсорсингу.'
),
(
  gen_random_uuid(),
  'Управління віддаленими командами розробки: найкращі практики 2024',
  'managing-remote-it-teams-best-practices',
  'Опануйте мистецтво управління розподіленими IT командами.',
  '{"blocks":[{"type":"paragraph","text":"Управління віддаленими IT командами презентує унікальні виклики та можливості."}]}'::jsonb,
  '/team-planning-strategy-whiteboard.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW(),
  NOW(),
  NOW(),
  'uk',
  'Управління віддаленими командами розробки: найкращі практики',
  'Опануйте мистецтво управління розподіленими IT командами.'
),
(
  gen_random_uuid(),
  '5 переваг аутсорсингу команди розробки',
  'benefits-outsourcing-development-team',
  'Дізнайтеся про ключові переваги залучення зовнішної команди розробки.',
  '{"blocks":[{"type":"paragraph","text":"Аутсорсинг команди розробки може трансформувати вашу бізнес-операцію."}]}'::jsonb,
  '/it-team-working-remotely-on-computers.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW(),
  NOW(),
  NOW(),
  'uk',
  '5 переваг аутсорсингу команди розробки',
  'Дізнайтеся про ключові переваги залучення зовнішної команди розробки.'
);
