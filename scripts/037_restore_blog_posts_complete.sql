-- Remove corrupted Ukrainian posts that were created without proper content
DELETE FROM posts 
WHERE locale = 'uk' 
AND (content IS NULL OR content = ''::jsonb OR content = 'null'::jsonb);

-- Verify English posts still exist and are correct
-- Create proper Ukrainian translations for all blog posts
-- Using the SAME slugs as English but with uk locale

-- Ukrainian translation of: choose-right-it-outsourcing-partner
INSERT INTO posts (id, title, slug, excerpt, content, featured_image, featured_image_url, status, category_id, author_id, published_at, created_at, updated_at, locale, meta_title, meta_description)
SELECT 
  gen_random_uuid(),
  'Як вибрати правильного IT-партнера для аутсорсингу: контрольний список',
  slug,
  'Дізнайтеся про основні критерії вибору IT партнера для аутсорсингу, який відповідає вашим бізнес-цілям.',
  '{"blocks":[{"type":"paragraph","content":"Вибір правильного IT партнера для аутсорсингу може визначити успіх або невдачу вашого проекту. З тисячами постачальників у світі, правильний вибір вимагає ретельної оцінки та перевірки."},{"type":"heading","level":2,"content":"Визначте ваші вимоги"},{"type":"paragraph","content":"Перш ніж розпочати пошук, чітко визначте, що вам потрібно. Задокументуйте ваші технічні вимоги, обсяг проекту, графік та бюджет."},{"type":"heading","level":2,"content":"Ключові критерії оцінки"},{"type":"benefits","items":[{"title":"Технічна експертиза","description":"Перевірте їх знання необхідних технологій"},{"title":"Комунікація","description":"Оцініть навички спілкування англійською мовою"},{"title":"Безпека","description":"Перевірте їх протоколи захисту даних"},{"title":"Культурна сумісність","description":"Переконайтеся, що культура компанії вам підходить"}]},{"type":"heading","level":2,"content":"Червоні прапорці"},{"type":"paragraph","content":"Будьте обережні з постачальниками, які обіцяють нереалістичні терміни, пропонують набагато нижчі ціни або неохоче надають рекомендації."},{"type":"heading","level":2,"content":"Процес вибору"},{"type":"list","items":["Складіть список 5-10 потенційних партнерів","Запросіть детальні пропозиції та тематичні дослідження","Проведіть технічні інтерв\'ю","Перевірте рекомендації","Почніть з пілотного проекту"]},{"type":"heading","level":2,"content":"Побудова довгострокового партнерства"},{"type":"paragraph","content":"Найкращі стосунки аутсорсингу будуються на довірі, прозорості та взаємній користі. Інвестуйте час у побудову міцних стосунків з вашими партнерами."}]}'::jsonb,
  '/developers-collaborating-on-project.jpg',
  '/developers-collaborating-on-project.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  'uk',
  'Як вибрати правильного IT-партнера для аутсорсингу',
  'Дізнайтеся про основні критерії вибору IT партнера для аутсорсингу, який відповідає вашим бізнес-цілям.'
FROM posts 
WHERE slug = 'choose-right-it-outsourcing-partner' 
AND locale = 'en'
AND NOT EXISTS (
  SELECT 1 FROM posts 
  WHERE slug = 'choose-right-it-outsourcing-partner' 
  AND locale = 'uk'
);

-- Ukrainian translation of: staff-augmentation-vs-project-outsourcing
INSERT INTO posts (id, title, slug, excerpt, content, featured_image, featured_image_url, status, category_id, author_id, published_at, created_at, updated_at, locale, meta_title, meta_description)
SELECT 
  gen_random_uuid(),
  'Розширення штату vs. Аутсорсинг проектів: Що підходить вам?',
  slug,
  'Порівняйте дві найпопулярніші моделі IT аутсорсингу та виберіть найкращу для вашої організації.',
  '{"blocks":[{"type":"paragraph","content":"Коли мова йде про IT аутсорсинг, дві моделі домінують на ринку: розширення штату та аутсорсинг проектів. Розуміння різниць між цими підходами вирішальне для правильного рішення для вашої організації."},{"type":"heading","level":2,"content":"Розширення штату - пояснення"},{"type":"paragraph","content":"Розширення штату передбачає найм зовнішніх професіоналів для заповнення специфічних прогалин у навичках вашої команди. Ці професіонали працюють разом з вашим штатом, дотримуючись ваших процесів."},{"type":"heading","level":2,"content":"Модель аутсорсингу проектів"},{"type":"paragraph","content":"Аутсорсинг проектів - це повне передання проекту зовнішній компанії, яка несе відповідальність за його виконання."},{"type":"heading","level":2,"content":"Порівняння"},{"type":"benefits","items":[{"title":"Рівень контролю","description":"Розширення штату дає більше контролю, аутсорсинг - більше гнучкості"},{"title":"Масштабованість","description":"Обидві моделі гнучкі, але аутсорсинг масштабується плавніше"},{"title":"Структура вартості","description":"Розширення - погодинна оплата, аутсорсинг - фіксована ціна"},{"title":"Краще для","description":"Короткострокові потреби vs довгострокові проекти"}]},{"type":"heading","level":2,"content":"Прийняття рішення"},{"type":"paragraph","content":"Розглядайте тривалість проекту, вашу здатність до управління та структуру бюджету при виборі між цими моделями. Багато організацій використовують комбінацію обох підходів для різних потреб."}]}'::jsonb,
  '/business-meeting-handshake-partnership.jpg',
  '/business-meeting-handshake-partnership.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'new' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days',
  'uk',
  'Розширення штату vs. Аутсорсинг проектів',
  'Порівняйте дві найпопулярніші моделі IT аутсорсингу та виберіть найкращу для вашої організації.'
FROM posts 
WHERE slug = 'staff-augmentation-vs-project-outsourcing' 
AND locale = 'en'
AND NOT EXISTS (
  SELECT 1 FROM posts 
  WHERE slug = 'staff-augmentation-vs-project-outsourcing' 
  AND locale = 'uk'
);

-- Ukrainian translation of: managing-remote-it-teams-best-practices
INSERT INTO posts (id, title, slug, excerpt, content, featured_image, featured_image_url, status, category_id, author_id, published_at, created_at, updated_at, locale, meta_title, meta_description)
SELECT 
  gen_random_uuid(),
  'Управління віддаленими командами розробки: найкращі практики 2024',
  slug,
  'Опануйте мистецтво управління розподіленими IT командами з перевіреними стратегіями комунікації та продуктивності.',
  '{"blocks":[{"type":"paragraph","content":"Управління віддаленими IT командами презентує унікальні виклики та можливості. З правильними стратегіями та інструментами, ви можете побудувати високопродуктивні розподілені команди."},{"type":"heading","level":2,"content":"Комунікація - ключ до успіху"},{"type":"paragraph","content":"Ефективна комунікація - основа успішного управління віддаленою командою. Встановіть ясні канали, регулярні перевірки та практики документування."},{"type":"heading","level":2,"content":"Основні інструменти та практики"},{"type":"benefits","items":[{"title":"Управління проектами","description":"Jira, Asana, Linear для відстеження завдань"},{"title":"Комунікація","description":"Slack, Teams, Discord для щоденного спілкування"},{"title":"Документація","description":"Confluence, Notion для обміну знаннями"},{"title":"Колаборація коду","description":"GitHub, GitLab для контролю версій"}]},{"type":"heading","level":2,"content":"Побудова культури команди"},{"type":"paragraph","content":"Віддалені команди потребують навмисних зусиль щодо побудови культури. Проводьте віртуальні командні заходи, святкуйте досягнення разом."},{"type":"heading","level":2,"content":"Управління продуктивністю"},{"type":"list","items":["Встановіть чіткі очікування та вимірювані цілі","Зосередьтеся на результатах, а не на часі роботи","Забезпечуйте регулярний зворотний зв\'язок","Проводьте періодичні індивідуальні зустрічі","Використовуйте дані-керовані метрики продуктивності"]},{"type":"heading","level":2,"content":"Подолання викликів часових зон"},{"type":"paragraph","content":"При роботі з глобальними командами встановіть основні години перекриття та ефективно використовуйте асинхронну комунікацію."}]}'::jsonb,
  '/team-planning-strategy-whiteboard.jpg',
  '/team-planning-strategy-whiteboard.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '10 days',
  'uk',
  'Управління віддаленими командами розробки: найкращі практики',
  'Опануйте мистецтво управління розподіленими IT командами з перевіреними стратегіями.'
FROM posts 
WHERE slug = 'managing-remote-it-teams-best-practices' 
AND locale = 'en'
AND NOT EXISTS (
  SELECT 1 FROM posts 
  WHERE slug = 'managing-remote-it-teams-best-practices' 
  AND locale = 'uk'
);

-- Ukrainian translation of: benefits-outsourcing-development-team (This is the one that was already working)
INSERT INTO posts (id, title, slug, excerpt, content, featured_image, featured_image_url, status, category_id, author_id, published_at, created_at, updated_at, locale, meta_title, meta_description)
SELECT 
  gen_random_uuid(),
  '5 переваг аутсорсингу команди розробки',
  slug,
  'Дізнайтеся про ключові переваги залучення зовнішної команди розробки для вашої організації.',
  '{"blocks":[{"type":"paragraph","content":"Аутсорсинг команди розробки може трансформувати вашу бізнес-операцію, зменшити витрати та дати доступ до глобального пулу талантів. Від стартапів до великих підприємств, компанії використовують аутсорсинг для досягнення своїх цілей розробки."},{"type":"heading","level":2,"content":"1. Суттєве скорочення витрат"},{"type":"paragraph","content":"Одна з найбільших переваг аутсорсингу розробки - це скорочення витрат. Витрати на утримання в дому програмістів включають не лише зарплату, але й льготи, офісне середовище, обладнання та витрати на управління. При аутсорсингу ви платите лише за роботу, яку вам потрібна."},{"type":"heading","level":2,"content":"2. Доступ до глобального таланту"},{"type":"paragraph","content":"Аутсорсинг дозволяє вам використовувати таланти зі всього світу. Не обмежуючись географічною близькістю, ви можете знайти найкращих розробників для вашого проекту."},{"type":"heading","level":2,"content":"3. Гнучкість та масштабованість"},{"type":"paragraph","content":"З аутсорсингом легко масштабувати вашу команду вгору або вниз залежно від потреб проекту. Не потрібно турбуватися про найм, звільнення чи управління."},{"type":"heading","level":2,"content":"4. Фокус на основному бізнесі"},{"type":"paragraph","content":"Передавши розробку зовнішній команді, ви можете зосередитися на основних компетенціях вашого бізнесу. Це дозволяє вам бути більш конкурентоспроможним на ринку."},{"type":"heading","level":2,"content":"5. Прискорена розробка"},{"type":"paragraph","content":"Досвідчена аутсорсингова команда може прискорити розробку вашого проекту. Вони мають кращі практики, процеси та інструменти для швидкої доставки якісних результатів."},{"type":"heading","level":2,"content":"Висновок"},{"type":"paragraph","content":"Аутсорсинг команди розробки - це стратегічне рішення, яке може принести значні переваги вашій організації. При виборі правильного партнера аутсорсингу ви можете досягти своїх цілей розробки більш ефективно."}]}'::jsonb,
  '/it-team-working-remotely-on-computers.jpg',
  '/it-team-working-remotely-on-computers.jpg',
  'published',
  (SELECT id FROM categories WHERE slug = 'automation' LIMIT 1),
  (SELECT id FROM profiles WHERE display_name = 'Anna' LIMIT 1),
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  'uk',
  '5 переваг аутсорсингу команди розробки',
  'Дізнайтеся про ключові переваги залучення зовнішної команди розробки для вашої організації.'
FROM posts 
WHERE slug = 'benefits-outsourcing-development-team' 
AND locale = 'en'
AND NOT EXISTS (
  SELECT 1 FROM posts 
  WHERE slug = 'benefits-outsourcing-development-team' 
  AND locale = 'uk'
);
