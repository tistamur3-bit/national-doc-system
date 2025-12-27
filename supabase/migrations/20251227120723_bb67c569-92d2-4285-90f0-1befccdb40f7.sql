-- Add current_page column to track user's current location
ALTER TABLE public.processing_users 
ADD COLUMN current_page text DEFAULT 'processing-request';

-- Add unique constraint on user_id to enable upsert
ALTER TABLE public.processing_users 
ADD CONSTRAINT processing_users_user_id_unique UNIQUE (user_id);