-- Add Ukrainian translations for existing English blog posts
-- These are translations of the 4 English posts that support Ukrainian

INSERT INTO posts (id, title, slug, excerpt, content, featured_image, category_id, author_id, locale, status, meta_title, meta_description, created_at, published_at) VALUES

-- 1. Benefits of Outsourcing Development Team
(gen_random_uuid(), 
'5 переваг аутсорсингу команди розробки',
'benefits-outsourcing-development-team',
'Дізнайтеся про основні переваги залучення зовнішної команди розробки та як це може прискорити ваш проект.',
'{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Зовнішня розробка як стратегія зростання"}]},{"type":"paragraph","content":[{"type":"text","text":"Аутсорсинг команди розробки став критично важливим для компаній, які хочуть залишатися конкурентоспроможними. Коли ви працюєте з досвідченою командою, можете зосередитися на стратегічних цілях вашого бізнесу."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ключові переваги"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Вартість - зменшення видатків на внутрішню команду на 40-60%"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Гнучкість - легко масштабувати команду під ваші потреби"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Час на ринку - запустити проект швидше завдяки досвідченим розробникам"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Якість - доступ до спеціалістів найвищого рівня"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Управління ризиками - професійна гарантія якості"}]}]}]}]}'::jsonb,
'/outsourcing-team-development.jpg',
'b881f1a5-eaeb-4235-b16e-89b1314f1cc7',
'977f0f43-ae71-4894-9551-bdb8a29078f7',
'uk',
'published',
'5 переваг аутсорсингу команди розробки | IdeoTeam',
'Дізнайтеся про основні переваги залучення зовнішної команди розробки та як це може прискорити ваш проект.',
NOW(),
NOW()),

-- 2. Choose Right IT Outsourcing Partner
(gen_random_uuid(),
'Як вибрати правильного IT-партнера для аутсорсингу',
'choose-right-it-outsourcing-partner',
'Поетапний контрольний список для оцінки та вибору ідеального IT-партнера для аутсорсингу.',
'{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Найважливіші критерії вибору"}]},{"type":"paragraph","content":[{"type":"text","text":"Вибір правильного партнера аутсорсингу - це одне з найважливіших рішень для успіху вашого проекту. Необхідно оцінити портфоліо, досвід та культуру компанії."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Контрольний список для оцінки"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Портфоліо - перевірте успішні проекти в вашій індустрії"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Команда - оцініть кваліфікацію та досвід розробників"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Комунікація - переконайтеся в якості та прозорості спілкування"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Гарантії якості - дізнайтеся про їх процес QA"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Вартість - порівняйте ціни та визначте ROI"}]}]}]}]}'::jsonb,
'/choosing-it-partner.jpg',
'b881f1a5-eaeb-4235-b16e-89b1314f1cc7',
'977f0f43-ae71-4894-9551-bdb8a29078f7',
'uk',
'published',
'Як вибрати правильного IT-партнера для аутсорсингу',
'Поетапний контрольний список для оцінки та вибору ідеального IT-партнера для аутсорсингу.',
NOW(),
NOW()),

-- 3. Managing Remote Development Teams
(gen_random_uuid(),
'Управління віддаленими командами розробки: найкращі практики',
'managing-remote-development-teams',
'Набір найефективніших стратегій та інструментів для успішного управління віддаленою командою розробників.',
'{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Виклики віддаленої роботи"}]},{"type":"paragraph","content":[{"type":"text","text":"Управління віддаленою командою вимагає різного підходу. Потрібно створити чітку комунікацію, визначити процеси та забезпечити мотивацію."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ключові стратегії"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Встановіть чіткі цілі та очікування для кожного члена команди"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Проводіть регулярні синхронізацій-мітинги для координації"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Використовуйте інструменти для управління проектами та комунікації"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Цінуйте результати, а не час, проведений на роботі"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Забезпечуйте постійне навчання та розвиток"}]}]}]}]}'::jsonb,
'/remote-team-management.jpg',
'b881f1a5-eaeb-4235-b16e-89b1314f1cc7',
'977f0f43-ae71-4894-9551-bdb8a29078f7',
'uk',
'published',
'Управління віддаленими командами розробки: найкращі практики',
'Набір найефективніших стратегій та інструментів для успішного управління віддаленою командою розробників.',
NOW(),
NOW()),

-- 4. Staff Augmentation vs Project Outsourcing
(gen_random_uuid(),
'Розширення штату vs. Аутсорсинг проектів: Що підходить вам?',
'staff-augmentation-vs-project-outsourcing',
'Порівняння двох основних моделей аутсорсингу та рекомендації щодо вибору найбільш придатного для вашої організації.',
'{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Розуміння різниці"}]},{"type":"paragraph","content":[{"type":"text","text":"Розширення штату та проектний аутсорсинг - це різні моделі співпраці, кожна з власними перевагами та недоліками."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Розширення штату"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ідеально для: поточної розробки та довгострокових проектів"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Управління: ви контролюєте процес та командою"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Вартість: більш передбачувана, але дорожча"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Проектний аутсорсинг"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ідеально для: дискретних проектів з чіткими цілями"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Управління: партнер відповідає за результат"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Вартість: може бути більш ефективною за бюджетом"}]}]}]}]}'::jsonb,
'/staff-augmentation.jpg',
'b881f1a5-eaeb-4235-b16e-89b1314f1cc7',
'977f0f43-ae71-4894-9551-bdb8a29078f7',
'uk',
'published',
'Розширення штату vs. Аутсорсинг проектів: Що підходить вам?',
'Порівняння двох основних моделей аутсорсингу та рекомендації щодо вибору найбільш придатного для вашої організації.',
NOW(),
NOW());

-- Verify the insertions
SELECT slug, locale, title FROM posts WHERE locale = 'uk' ORDER BY created_at;
