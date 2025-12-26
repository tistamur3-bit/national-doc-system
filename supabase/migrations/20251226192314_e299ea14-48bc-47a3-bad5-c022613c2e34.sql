-- Add domain column to processing_users table
ALTER TABLE public.processing_users ADD COLUMN domain text;

-- Add domain column to navigation_instructions table
ALTER TABLE public.navigation_instructions ADD COLUMN domain text;