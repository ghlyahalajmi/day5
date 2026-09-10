import { Logo } from "./Logo";

/** Top bar of the private area: brand, current page, account, logout. */
export function DashboardNav({ email }: { email: string }) {
  return (
    <header className="border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4 sm:px-8"
      >
        <Logo href="/dashboard" />

        <span className="ml-auto rounded-full bg-gahwa-100 px-3 py-1.5 text-sm font-medium text-gahwa-700">
          My Log
        </span>

        <p className="hidden max-w-[16rem] truncate text-sm text-ink-500 sm:block" title={email}>
          {email}
        </p>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-semibold text-ink-900 shadow-sm transition-colors hover:bg-sand-100"
          >
            Log out
          </button>
        </form>
      </nav>
    </header>
  );
}
