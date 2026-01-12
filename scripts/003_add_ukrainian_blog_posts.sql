-- Add Ukrainian versions of existing blog posts
-- First, update existing posts to have 'en' locale if they don't have it
UPDATE posts SET locale = 'en' WHERE locale IS NULL;

-- Removed invalid 'category' column and fixed structure to match actual schema
-- Insert Ukrainian translations of blog posts
INSERT INTO posts (
  title,
  slug,
  excerpt,
  content,
  author_id,
  featured_image,
  locale,
  status,
  published_at,
  created_at,
  updated_at
) VALUES
(
  'Повний посібник з аутсорсингу IT-персоналу в 2024 році',
  'the-ultimate-guide-to-it-personnel-outsourcing-uk',
  'Дізнайтеся, як аутсорсинг IT-персоналу може трансформувати ваші бізнес-операції, зменшити витрати та надати вам доступ до глобального таланту.',
  '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Повний посібник з аутсорсингу IT-персоналу в 2024 році"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "У сьогоднішньому динамічному бізнес-середовищі компанії постійно шукають способи оптимізувати свої операції та знизити видатки. Один з найефективніших способів досягти цього - це звернутися до аутсорсингу IT-персоналу."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Аутсорсинг дозволяє компаніям отримати доступ до найкращих IT-фахівців по всьому світу, не несучи витрат на утримання повного штату розробників в офісі."}]}]}'::jsonb,
  (SELECT id FROM auth.users LIMIT 1),
  '/images/multi-brand-ecommerce-landing-pages-image.jpg',
  'uk',
  'published',
  NOW(),
  NOW(),
  NOW()
),
(
  '5 переваг аутсорсингу команди розробників',
  'five-benefits-of-outsourcing-your-development-team-uk',
  'Дізнайтеся про ключові переваги роботи з аутсорсингованою командою розробників та як це може прискорити доставку вашого проекту.',
  '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "5 переваг аутсорсингу команди розробників"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Аутсорсинг команди розробників є стратегічним рішенням для компаній, які хочуть масштабуватися швидше і більш ефективно."}]}, {"type": "paragraph", "content": [{"type": "text", "text": "1. Доступ до глобального таланту\n2. Зниження витрат\n3. Збільшена гнучкість\n4. Фокус на основному бізнесі\n5. Швидша розробка"}]}]}'::jsonb,
  (SELECT id FROM auth.users LIMIT 1),
  '/images/multi-brand-ecommerce-landing-pages-image.jpg',
  'uk',
  'published',
  NOW(),
  NOW(),
  NOW()
);
