import Link from "next/link";
import { Logo } from "./Logo";
import { SaduBand } from "./SaduBand";

/** Shared frame for the login and signup pages. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SaduBand />

      <div className="ember-glow grain relative bg-espresso-900">
        <header className="relative mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
          <Logo tone="light" />
        </header>
      </div>

      <div className="gahwa-glow flex flex-1 flex-col">
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-14">
          {/* The form sits under an arch, matching the landing page. */}
          <div className="arch relative overflow-hidden border border-sand-200 bg-white shadow-xl shadow-ink-900/10">
            <div className="px-6 pt-16 pb-7 sm:px-8 sm:pb-8">
              <div className="flex justify-center" aria-hidden="true">
                <span className="sadu-diamond bg-gahwa-500" />
              </div>
              <h1 className="mt-5 text-center font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-center text-sm text-ink-700">{subtitle}</p>
              <div className="mt-7">{children}</div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-700">{footer}</p>
          <p className="mt-3 text-center text-sm">
            <Link href="/" className="text-ink-500 underline underline-offset-4 hover:text-ink-900">
              Back to home
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}

/** Text input styled once so every form field looks the same. */
export const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-sand-300 bg-sand-50 px-3.5 py-2.5 text-base text-ink-900 placeholder:text-ink-500/70 transition-colors focus:border-gahwa-500 focus:bg-white focus:outline-none";

/** Label styled once. */
export const labelClass = "block text-sm font-medium text-ink-900";

/** The one primary button style used across the app. */
export const primaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-xl bg-gahwa-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-gahwa-600 disabled:cursor-not-allowed disabled:opacity-60";
