import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tewfnsbvfjrarodqgwnm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld2Zuc2J2ZmpyYXJvZHFnd25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MTY5MjIsImV4cCI6MjA5OTE5MjkyMn0.netOKEYTUZBfynbGBO0X1nPi9Ta1ng5Yyzg1euXEqlo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
  },
});
