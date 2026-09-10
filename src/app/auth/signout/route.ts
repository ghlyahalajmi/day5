import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Logging out happens on the server so the session cookies are properly
 * cleared. The dashboard posts a plain HTML form here, which means logout
 * still works even if JavaScript fails to load.
 */
export async function POST(request: Request) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  // 303 tells the browser to follow up with a GET, not another POST.
  return NextResponse.redirect(new URL("/login", request.url), { status: 303 });
}
