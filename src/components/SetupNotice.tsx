/** Shown instead of a crash when the Supabase environment variables are missing. */
export function SetupNotice() {
  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-sand-300 bg-sand-50 p-6 text-sm text-ink-700 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-ink-900">Almost there</h2>
      <p className="mt-2">
        A Gahwa Log is not connected to its database yet. Add these two values to{" "}
        <code className="rounded bg-sand-200 px-1.5 py-0.5 text-xs">.env.local</code> (or to your
        Vercel project settings) and restart the app:
      </p>
      <ul className="mt-3 space-y-1 font-mono text-xs text-ink-900">
        <li>NEXT_PUBLIC_SUPABASE_URL</li>
        <li>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</li>
      </ul>
    </div>
  );
}
