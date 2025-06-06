import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vusdncuduzoudxrimdjs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1c2RuY3VkdXpvdWR4cmltZGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzkwNTQsImV4cCI6MjA2NDExNTA1NH0.SLp5pYDXO7Lk7Oqzwb_G2piCSf9e6e4fExCpYwK074A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);