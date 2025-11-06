-- Create table for users in processing state
CREATE TABLE IF NOT EXISTS public.processing_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for navigation instructions
CREATE TABLE IF NOT EXISTS public.navigation_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  route TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.processing_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_instructions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (public dashboard)
CREATE POLICY "Allow all operations on processing_users"
  ON public.processing_users
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on navigation_instructions"
  ON public.navigation_instructions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.processing_users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.navigation_instructions;