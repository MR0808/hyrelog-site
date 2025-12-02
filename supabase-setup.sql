-- Supabase SQL Migration for Early Access Waitlist
-- Run this in your Supabase SQL Editor

-- Create the early_access_signups table
CREATE TABLE IF NOT EXISTS early_access_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT NOT NULL,
  use_case TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_early_access_signups_email ON early_access_signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at ON early_access_signups(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

-- Note: When using service_role key in server actions, it bypasses RLS automatically
-- These policies are optional but good for documentation
-- If you want to use anon keys instead, you would need these policies:
-- CREATE POLICY "Allow authenticated inserts" ON early_access_signups FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Allow authenticated selects" ON early_access_signups FOR SELECT TO authenticated USING (true);

