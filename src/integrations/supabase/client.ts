
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pifsemcuxyvwxibzrfbb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZnNlbWN1eHl2d3hpYnpyZmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNTc4ODEsImV4cCI6MjA2MTgzMzg4MX0.4qGSFCQlCMvC_DN7hF8jJsszUIOXfcd42wnawH0Hs5s';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true, 
    autoRefreshToken: true,
  }
});
