"use client";

import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseConfig } from "./config";

/**
 * Supabase client for code running in the browser.
 *
 * It automatically attaches the logged-in user's session (stored in cookies)
 * to every request, which is how the database knows who `auth.uid()` is.
 */
export function createClient() {
  const { url, key } = requireSupabaseConfig();
  return createBrowserClient(url, key);
}
