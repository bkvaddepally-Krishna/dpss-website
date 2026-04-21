import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Single client using anon key — RLS policies allow authenticated staff 
// to access all data. Service role key is NOT needed or used here.
export const supabase = createClient(supabaseUrl, supabaseKey);

// Alias for backward compatibility with existing page components
// Now uses the same authenticated session — safe because RLS policies
// grant full access to logged-in staff members.
export const supabaseAdmin = supabase;
