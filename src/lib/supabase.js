import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mafbgedxetayclrzvgqg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZmJnZWR4ZXRheWNscnp2Z3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNjU5NjQsImV4cCI6MjA0Nzg0MTk2NH0.13qIp6uuPFLDoie6OxEkHdbeQgiNI1AfTwcqzSAb2qk';

export const supabase = createClient(supabaseUrl, supabaseKey);