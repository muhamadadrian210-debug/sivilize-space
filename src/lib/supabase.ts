import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[SivilizeSpace Security Warning] Supabase URL or Anon Key is missing. Check your .env.local file.'
  );
}

if (!supabaseServiceRoleKey && process.env.NODE_ENV === 'production') {
  console.error(
    '[SivilizeSpace CRITICAL WARNING] SUPABASE_SERVICE_ROLE_KEY is NOT set in production! Server operations will run with anon privileges, which will fail if Row-Level Security (RLS) is enabled.'
  );
}

// Client-side & Public Access Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Privileged Backend & Webhook Supabase Client (Zero-Trust Bypass for Internal Operations)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
