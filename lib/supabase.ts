import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// We create the tool HERE and export it as 'supabase'
export const supabase = createClient(supabaseUrl, supabaseKey);