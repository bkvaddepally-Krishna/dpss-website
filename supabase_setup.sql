-- ═══════════════════════════════════════════════════════════════
-- DPSS DATABASE SETUP — Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Fix admissions table: add all missing columns to match the API
ALTER TABLE public.admissions
  ADD COLUMN IF NOT EXISTS reg_id         text,
  ADD COLUMN IF NOT EXISTS first_name     text,
  ADD COLUMN IF NOT EXISTS last_name      text,
  ADD COLUMN IF NOT EXISTS class          text,
  ADD COLUMN IF NOT EXISTS dob            text,
  ADD COLUMN IF NOT EXISTS aadhar         text,
  ADD COLUMN IF NOT EXISTS blood_group    text,
  ADD COLUMN IF NOT EXISTS perm_address   text,
  ADD COLUMN IF NOT EXISTS temp_address   text,
  ADD COLUMN IF NOT EXISTS city           text,
  ADD COLUMN IF NOT EXISTS pin            text,
  ADD COLUMN IF NOT EXISTS father_email   text,
  ADD COLUMN IF NOT EXISTS father_employment text,
  ADD COLUMN IF NOT EXISTS mother_phone   text,
  ADD COLUMN IF NOT EXISTS mother_employment text,
  ADD COLUMN IF NOT EXISTS mother_email   text,
  ADD COLUMN IF NOT EXISTS guardian_name  text,
  ADD COLUMN IF NOT EXISTS source         text,
  ADD COLUMN IF NOT EXISTS status         text DEFAULT 'New';

-- 2. Add status column to contact_inquiries
ALTER TABLE public.contact_inquiries
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'New';

-- 3. Create scholarship_results table (NEW)
CREATE TABLE IF NOT EXISTS public.scholarship_results (
  id                   uuid NOT NULL DEFAULT gen_random_uuid(),
  hall_ticket_no       text NOT NULL UNIQUE,
  student_name         text NOT NULL,
  class                text NOT NULL,
  english_marks        integer,
  science_marks        integer,
  social_marks         integer,
  maths_marks          integer,
  gk_marks             integer,   -- NULL for Class 1-5
  total_marks          integer NOT NULL,
  max_marks            integer NOT NULL DEFAULT 100,
  scholarship_percentage integer NOT NULL DEFAULT 0,
  remarks              text,
  entered_by           text,
  created_at           timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT scholarship_results_pkey PRIMARY KEY (id)
);

-- 4. Disable RLS (Row Level Security) temporarily for easy CMS access
-- You can enable and configure this later with proper policies
ALTER TABLE public.admissions           DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_results  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarship_applicants DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: Add is_published column to scholarship_results
-- Run this in Supabase SQL Editor if the table already exists
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE public.scholarship_results
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT false;

-- Index for faster public lookups (only published results)
CREATE INDEX IF NOT EXISTS idx_results_published
  ON public.scholarship_results (hall_ticket_no, is_published)
  WHERE is_published = true;
