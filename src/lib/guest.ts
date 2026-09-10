/**
 * The shared demo account.
 *
 * These credentials are public on purpose — the whole point is that anyone
 * can press "Continue as guest" and look around without signing up.
 *
 * It is an ordinary Supabase account, so Row Level Security treats it like
 * any other user: it gets its own gahwa rows and can never see anyone
 * else's. Making it public costs no privacy for real accounts.
 */
export const GUEST_EMAIL = "guest@agahwalog.app";
export const GUEST_PASSWORD = "GahwaGuest2026!";

/** True when the signed-in user is a guest rather than a real account. */
export function isGuestUser(user: { email?: string | null; is_anonymous?: boolean }): boolean {
  return Boolean(user.is_anonymous) || user.email === GUEST_EMAIL;
}
