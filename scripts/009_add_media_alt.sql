-- Add alt_text column to media table
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS alt_text TEXT;
