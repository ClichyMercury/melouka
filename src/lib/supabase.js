import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// Utilisation de l'API $env de SvelteKit
const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

// S'assurer que les valeurs existent, sinon utiliser des valeurs par défaut pour SSR
export const supabase = createClient(
  supabaseUrl || 'https://ntxuwqogwojelbrhznix.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eHV3cW9nd29qZWxicmh6bml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjI3OTgsImV4cCI6MjA1ODYzODc5OH0.0LTbuXG6B_boIfjXtNBAm1GLp0JfVZf3Ko5iZzEkblA'
);