import type { AuthError } from "@supabase/supabase-js";

/**
 * Shown when the request never reached Supabase at all (offline, DNS
 * failure, blocked network). Telling someone their password is wrong in
 * that situation would send them chasing the wrong problem.
 */
export const NETWORK_MESSAGE =
  "We couldn't reach the server. Please check your internet connection and try again.";

/** True when the browser could not complete the request. */
export function isNetworkError(error: AuthError | null): boolean {
  if (!error) return false;
  return error.name === "AuthRetryableFetchError" || !error.status;
}
