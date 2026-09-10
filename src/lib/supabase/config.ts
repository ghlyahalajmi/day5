/**
 * Reads the two Supabase settings the browser needs.
 *
 * Both values are safe to ship to the browser:
 *  - the project URL is just an address
 *  - the publishable key only lets someone *ask* the database for data.
 *    Row Level Security decides what actually comes back.
 *
 * The secret / service-role key is NOT used anywhere in this project.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** True when both environment variables are present. */
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
      "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local (locally) or to your " +
        "Vercel project settings (in production).",
    );
  }
  return { url: SUPABASE_URL, key: SUPABASE_PUBLISHABLE_KEY };
}
