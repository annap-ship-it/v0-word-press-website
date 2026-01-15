-- Add meta_title and meta_description columns to posts table for SEO support
ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Verify columns were added successfully
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'posts' 
AND column_name IN ('meta_title', 'meta_description')
ORDER BY ordinal_position;
