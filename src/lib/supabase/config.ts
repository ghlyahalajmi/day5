/**
 * Supabase connection settings.
 *
 * These two values are safe to ship to the browser:
 *  - the project URL is just an address
 *  - the publishable key only lets someone *ask* the database for data.
 *    Row Level Security decides what actually comes back.
 *
 * The secret / service-role key is NOT used anywhere in this project.
 *
 * They are read from environment variables first, so you can point the app
 * at a different Supabase project without touching the code. If the host
 * does not pass them through, we fall back to this project's own values so
 * the app still works instead of showing a broken login page.
 */
const FALLBACK_SUPABASE_URL = "https://obowyaecgiekhdqjziwd.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_08t5cqDLCDmfH1SM3Xhf7Q_hUK_eely";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY;

/** True when we have both values, from the environment or the fallback. */
export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_PUBLISHABLE_KEY.length > 0;
}

/**
 * Used by code that cannot continue without Supabase.
 * Throws a message aimed at the developer, never shown raw to a visitor.
 */
export function requireSupabaseConfig(): { url: string; key: string } {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Missing Supabase settings. Add NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local (locally) or to your " +
        "Vercel project settings (in production).",
    );
  }
  return { url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY };
}
