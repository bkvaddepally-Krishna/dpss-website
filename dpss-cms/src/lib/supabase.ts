import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const serviceKey   = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;

// Public client (for auth)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client (bypasses RLS – use only for data operations)
export const supabaseAdmin = createClient(supabaseUrl, serviceKey);
