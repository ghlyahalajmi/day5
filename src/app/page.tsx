import Link from "next/link";
import { FinjalIcon } from "@/components/FinjalIcon";
import { Logo } from "@/components/Logo";
import { Stars } from "@/components/Stars";

export default function LandingPage() {
  return (
    <>
      <header className="gahwa-glow">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-sand-200 hover:text-ink-900"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-gahwa-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gahwa-600"
            >
              Create account
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-sand-50/80 px-3 py-1 text-xs font-medium tracking-wide text-ink-700 uppercase">
              <FinjalIcon className="h-3.5 w-3.5 text-gahwa-500" />
              Private by design
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              A Gahwa Log
            </h1>
            <p className="mt-4 font-display text-xl text-gahwa-600 sm:text-2xl">
              Your private log of great gahwa.
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-700 sm:text-lg">
              Save the places, ratings, and memories behind every cup of gahwa. Only you can see
              your log — every record is locked to your account inside the database itself.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-gahwa-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-gahwa-600"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-sand-300 bg-sand-50 px-6 py-3 text-base font-semibold text-ink-900 shadow-sm transition-colors hover:bg-white"
              >
                Create account
              </Link>
            </div>
          </div>

          {/* A small preview of what a saved gahwa looks like. */}
          <div className="relative">
            <div className="rounded-3xl border border-sand-300 bg-sand-50 p-5 shadow-lg shadow-ink-900/5 sm:p-6">
              <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                Your log
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { place: "Qahwa House", rating: 5, date: "20 August 2026", note: "Really smooth gahwa and a calm majlis corner." },
                  { place: "Arabica Café", rating: 4, date: "11 August 2026", note: "Good cardamom balance, a little sweet." },
                ].map((item) => (
                  <article
                    key={item.place}
                    className="rounded-2xl border border-sand-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-ink-900">
                        {item.place}
                      </h3>
                      <Stars rating={item.rating} />
                    </div>
                    <p className="mt-1 text-xs text-ink-500">{item.date}</p>
                    <p className="mt-2 text-sm text-ink-700">&ldquo;{item.note}&rdquo;</p>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-ink-500">
                Example only — your log starts empty.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Log every cup",
              body: "Place, date, a rating out of five, and a note you will be glad you wrote.",
            },
            {
              title: "Yours alone",
              body: "Records are tied to your account with Supabase Row Level Security.",
            },
            {
              title: "Always there",
              body: "Saved in a real database, so a refresh or a new device changes nothing.",
            },
          ].map((feature) => (
            <section
              key={feature.title}
              className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold text-ink-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{feature.body}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-auto border-t border-sand-200 py-6">
        <p className="mx-auto w-full max-w-6xl px-5 text-sm text-ink-500 sm:px-8">
          A Gahwa Log — your private log of great gahwa.
        </p>
      </footer>
    </>
  );
}
