-- Insert sample categories
INSERT INTO public.categories (name, slug, color) VALUES
  ('Automation', 'automation', '#FF6B35'),
  ('New', 'new', '#4ECDC4'),
  ('Most Readed', 'most-readed', '#FFE66D')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO public.tags (name, slug) VALUES
  ('Technology', 'technology'),
  ('Development', 'development'),
  ('Design', 'design'),
  ('AI', 'ai'),
  ('Web', 'web')
ON CONFLICT (slug) DO NOTHING;
