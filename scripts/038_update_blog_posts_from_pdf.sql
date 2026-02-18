-- Update blog posts with content from PDF
-- This script replaces 4 blog posts with new content including FAQ sections

-- Get the author ID (assuming main author exists)
-- Update or replace the blog posts with new content

-- First, let's update/create the "Version Control Systems" post (English)
UPDATE posts 
SET 
  title = 'Version Control Systems: How They Work and How to Choose the Right Approach for Your Development Team',
  slug = 'version-control-systems-how-they-work',
  excerpt = 'Discover how version control systems work and learn which approach is right for your development team. Compare distributed vs centralized systems.',
  meta_title = 'Version Control Systems: Distributed vs Centralized | Idea Team',
  meta_description = 'Learn how version control systems work, the differences between Git and SVN, and how to choose the right VCS for your development workflow.',
  content = jsonb_build_object(
    'type', 'html',
    'content', '<h2><strong>Why Version Control Systems Are Essential</strong></h2>
<p>Version control systems track changes to project files over time. While they are mostly used for source code, they can also manage documentation, configuration files, design assets, and other resources.</p>

<h3><strong>Secure and Structured Code Storage</strong></h3>
<p>A key benefit of version control is the safe and reliable storage of code. VCS platforms create backups and let teams restore earlier versions if there are bugs, mistakes, or accidental deletions.</p>

<p>Without version control, developers might make manual changes. They may copy files by hand or use different file names to track changes. This often leads to lost data and confusion.</p>

<h3><strong>Main Categories of Version Control</strong></h3>
<p>Most version control systems are either distributed or centralised. Each type has its own benefits and drawbacks that affect how teams work together and manage code.</p>

<h3><strong>Distributed Version Control Systems</strong></h3>
<p>Distributed Version Control Systems (DVCS) are the leading choice in modern software development. Tools like Git have become industry standards for startups, enterprises, and open-source communities.</p>

<p>In a distributed model, every developer downloads a complete copy of the project repository onto their local machine. This includes the entire codebase, version history, and branches.</p>

<h3><strong>Advantages of Distributed Systems</strong></h3>
<ul>
<li>Developers can work offline since they have the full project on their computers</li>
<li>Trying out new ideas is faster and more flexible</li>
<li>Reliability improves because every team member has a full backup of the project</li>
<li>These systems also work well with modern DevOps tools and automated pipelines</li>
</ul>

<h3><strong>Centralised Version Control Systems</strong></h3>
<p>Centralised Version Control Systems use a single main repository as the source for project data. Popular tools for this approach include Subversion (SVN) and Perforce.</p>

<p>In centralised setups, developers download the latest version of the project from a central server, make changes on their computers, and then upload updates back to the main repository.</p>

<h3><strong>Factors That Influence Version Control System Selection</strong></h3>
<p>No single VCS is perfect for every team. The best choice depends on your technical needs, your team''s structure, and your workflow.</p>

<h3><strong>Conclusion</strong></h3>
<p>Version control systems are essential tools for modern software development. They keep code safe, help teams work together, and make it easy to track project changes over time.</p>

<p>Many organisations choose distributed systems like Git because they are flexible, reliable, and work well with modern development tools. Centralised systems like SVN and Perforce are still useful when strict control, managing large assets, or supporting older workflows are needed.</p>'
  ),
  locale = 'en',
  status = 'published'
WHERE slug LIKE '%staff-augmentation%' OR slug LIKE '%outsourcing%'
LIMIT 1;

-- Insert the Ukrainian translation
INSERT INTO posts (title, slug, excerpt, content, featured_image, category_id, author_id, locale, status, meta_title, meta_description, created_at)
SELECT 
  'Системи контролю версій: як вони працюють і як вибрати правильний підхід для вашої команди розробки',
  'version-control-systems-how-they-work-uk',
  'Дізнайтеся, як працюють системи контролю версій і який підхід найбільше підходить для вашої команди розробки. Порівняйте розподілені та централізовані системи.',
  jsonb_build_object(
    'type', 'html',
    'content', '<h2><strong>Чому системи контролю версій є важливими</strong></h2>
<p>Системи контролю версій відстежують зміни файлів проекту протягом часу. Хоча вони переважно використовуються для вихідного коду, вони також можуть керувати документацією, файлами конфігурації, дизайн-активами та іншими ресурсами.</p>

<h3><strong>Безпечне та структуроване зберігання коду</strong></h3>
<p>Ключна перевага контролю версій полягає у безпечному та надійному зберіганні коду. Платформи VCS створюють резервні копії і дозволяють командам відновлювати попередні версії у разі багів, помилок або випадкових видалень.</p>

<h3><strong>Основні категорії контролю версій</strong></h3>
<p>Більшість систем контролю версій є розподіленими або централізованими. Кожен тип має свої переваги та недоліки, які впливають на те, як команди працюють разом і керують кодом.</p>

<h3><strong>Розподілені системи контролю версій</strong></h3>
<p>Розподілені системи контролю версій (DVCS) є найпопулярнішим вибором у сучасній розробці програмного забезпечення. Інструменти, як-от Git, стали індустріальними стандартами для стартапів, підприємств та спільноти з відкритим вихідним кодом.</p>

<h3><strong>Переваги розподілених систем</strong></h3>
<ul>
<li>Розробники можуть працювати офлайн, оскільки вони мають весь проект на своїх комп''ютерах</li>
<li>Тестування нових ідей відбувається швидше і гнучче</li>
<li>Надійність покращується, оскільки кожен член команди має повну резервну копію проекту</li>
<li>Ці системи також добре працюють з сучасними інструментами DevOps та автоматизованими конвеєрами</li>
</ul>

<h3><strong>Централізовані системи контролю версій</strong></h3>
<p>Централізовані системи контролю версій використовують один головний репозиторій як джерело даних проекту. Популярні інструменти для цього підходу включають Subversion (SVN) та Perforce.</p>

<h3><strong>Висновок</strong></h3>
<p>Системи контролю версій є важливими інструментами сучасної розробки програмного забезпечення. Вони зберігають код в безпеці, допомагають командам працювати разом і дозволяють легко відстежувати зміни проекту протягом часу.</p>'
  ),
  featured_image = (SELECT featured_image FROM posts WHERE slug LIKE '%staff-augmentation%' LIMIT 1),
  category_id = (SELECT category_id FROM posts WHERE slug LIKE '%staff-augmentation%' LIMIT 1),
  author_id = (SELECT author_id FROM posts WHERE slug LIKE '%staff-augmentation%' LIMIT 1),
  locale = 'uk',
  status = 'published',
  meta_title = 'Системи контролю версій: розподілені та централізовані | Idea Team',
  meta_description = 'Дізнайтеся, як працюють системи контролю версій, розбіжності між Git і SVN та як вибрати правильну VCS для вашого робочого процесу розробки.'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug = 'version-control-systems-how-they-work-uk');
