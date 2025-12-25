-- Add metafields support to pages table
-- Metafields allow custom key-value data for each page

ALTER TABLE pages ADD COLUMN IF NOT EXISTS metafields JSONB DEFAULT '{}';

-- Update existing pages to have empty metafields object if null
UPDATE pages SET metafields = '{}' WHERE metafields IS NULL;

-- Create index for better performance on metafields queries
CREATE INDEX IF NOT EXISTS idx_pages_metafields ON pages USING GIN (metafields);

COMMENT ON COLUMN pages.metafields IS 'Custom metadata fields stored as JSON key-value pairs';
