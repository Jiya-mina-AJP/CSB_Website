import { createClient } from '@supabase/supabase-js';

// IN REACT APPS, ENVIRONMENT VARIABLES MUST START WITH REACT_APP_
// Access environment variables or fallback values
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://wudakcftuyfyqwgbfgou.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZGFrY2Z0dXlmeXF3Z2JmZ291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzODI4ODAsImV4cCI6MjA4MDk1ODg4MH0.D_fojtt045WuZNxn2XBlf5RLEITetHngnqsXxYZjOJ0';

if (supabaseAnonKey === 'your-anon-key-here') {
    console.warn('Supabase Anon Key is missing. Check your .env setup properly.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
