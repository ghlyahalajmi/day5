import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Runs on the server BEFORE any page is rendered (Next.js 16 calls this
 * file `proxy.ts`; older tutorials call it `middleware.ts`).
 *
 * It does two jobs:
 *  1. Keeps the Supabase login session fresh by rewriting its cookies.
 *  2. Guards `/dashboard`. A visitor who is not logged in is bounced to
 *     `/login` before a single byte of private data is fetched.
 *
 * This is a convenience, not the real lock. The real lock is Row Level
 * Security inside Postgres, which applies even if someone skips the app.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Without Supabase settings there is no session to check. Let the pages
  // render so they can show a friendly "app not configured yet" message.
  if (!isSupabaseConfigured()) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() re-checks the session token with Supabase, so it cannot be
  // faked by editing a cookie in the browser.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    const redirect = NextResponse.redirect(url);
    // Carry over any refreshed session cookies.
    for (const cookie of response.cookies.getAll()) {
      redirect.cookies.set(cookie);
    }
    return redirect;
  };

  if (!user && pathname.startsWith("/dashboard")) {
    return redirectTo("/login");
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    return redirectTo("/dashboard");
  }

  return response;
}

export const config = {
  // Run on real pages only: skip Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
