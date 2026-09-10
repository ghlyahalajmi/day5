import { Logo } from "./Logo";
import { SaduBand } from "./SaduBand";

/** Top bar of the private area: brand, current page, account, logout. */
export function DashboardNav({ email, isGuest = false }: { email: string; isGuest?: boolean }) {
  return (
    <header>
      <SaduBand />
      <div className="ember-glow grain relative bg-espresso-900">
        <nav
          aria-label="Main"
          className="relative mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-3 gap-y-3 px-5 py-4 sm:px-8"
        >
          <Logo href="/dashboard" tone="light" />

          <span className="ml-auto rounded-full bg-espresso-700 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-saffron-400">
            My Log
          </span>

          {isGuest ? (
            <span className="rounded-full border border-saffron-500/50 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-saffron-400">
              Guest
            </span>
          ) : (
            <p className="hidden max-w-[14rem] truncate text-sm text-sand-300 lg:block" title={email}>
              {email}
            </p>
          )}

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-full border border-sand-300/40 px-4 py-2 text-sm font-semibold whitespace-nowrap text-sand-100 transition-colors hover:bg-espresso-700"
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
