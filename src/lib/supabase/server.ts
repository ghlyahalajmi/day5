import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { requireSupabaseConfig } from "./config";

/**
 * Supabase client for code running on the server (Server Components and
 * Route Handlers). It reads the session out of the request cookies, so
 * queries made here run as the logged-in user and obey Row Level Security.
 */
export async function createClient() {
  const { url, key } = requireSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components are not allowed to write cookies.
          // That is fine: src/proxy.ts refreshes the session cookies instead.
        }
      },
    },
  });
}
