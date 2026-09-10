import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Alert } from "@/components/Alert";
import { DashboardNav } from "@/components/DashboardNav";
import { LogSection } from "@/components/LogSection";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { GahwaLog } from "@/lib/types";

export const metadata: Metadata = {
  title: "My Log",
  description: "Your private gahwa collection.",
};

/** Never cache this page: it is different for every signed-in user. */
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <SetupNotice />
      </main>
    );
  }

  const supabase = await createClient();

  // getUser() validates the session token with Supabase rather than trusting
  // the cookie, so a stranger cannot fake their way in.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // NOTE: there is no `.eq("user_id", ...)` here on purpose.
  // We simply ask for "the gahwa logs". Postgres applies the Row Level
  // Security policy `auth.uid() = user_id` and returns only this user's rows.
  // Privacy is enforced by the database, not by this JavaScript.
  const { data, error } = await supabase
    .from("gahwa_logs")
    .select("id, place_name, date, rating, notes")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase read failed:", error.message);
  }

  const logs: GahwaLog[] = data ?? [];
  const greetingName = user.email?.split("@")[0] ?? "friend";

  return (
    <>
      <DashboardNav email={user.email ?? "Signed in"} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <section>
          <p className="text-sm font-medium text-gahwa-600">
            Welcome back, {greetingName} <span aria-hidden="true">☕</span>
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Your Gahwa Log
          </h1>
          <p className="mt-2 max-w-xl text-base text-ink-700">
            Keep track of the gahwa experiences you want to remember.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          {error ? (
            <Alert tone="error">
              We couldn&rsquo;t load your gahwa log right now. Please refresh the page and try
              again.
            </Alert>
          ) : null}

          <LogSection logs={logs} />
        </div>
      </main>

      <footer className="border-t border-sand-200 py-6">
        <p className="mx-auto w-full max-w-5xl px-5 text-sm text-ink-500 sm:px-8">
          Only you can see this log.
        </p>
      </footer>
    </>
  );
}
