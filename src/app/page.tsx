import Link from "next/link";
import { FinjalIcon } from "@/components/FinjalIcon";
import { GuestButton } from "@/components/GuestButton";
import { Logo } from "@/components/Logo";
import { SaduBand, SaduDivider } from "@/components/SaduBand";
import { Stars } from "@/components/Stars";

const SAMPLE = [
  {
    place: "Qahwa House",
    rating: 5,
    date: "20 August 2026",
    note: "Really smooth gahwa and a calm majlis corner.",
  },
  {
    place: "Arabica Café",
    rating: 4,
    date: "11 August 2026",
    note: "Good cardamom balance, a little sweet.",
  },
];

const FEATURES = [
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
];

export default function LandingPage() {
  return (
    <>
      {/* A strip of Sadu weaving across the very top of the page. */}
      <SaduBand />

      <header className="ember-glow grain relative bg-espresso-900 text-sand-100">
        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <Logo tone="light" />
          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-sand-200 transition-colors hover:bg-espresso-700 hover:text-sand-50 sm:px-4"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-saffron-500 px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-espresso-900 shadow-sm transition-colors hover:bg-saffron-400 sm:px-4"
            >
              Create account
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-saffron-500/40 bg-espresso-800/70 px-3 py-1 text-xs font-medium tracking-[0.14em] text-saffron-400 uppercase">
              <FinjalIcon className="h-3.5 w-3.5" />
              Private by design
            </p>

            <h1 className="mt-6 font-display text-5xl leading-[0.95] font-semibold tracking-tight text-sand-50 sm:text-6xl lg:text-7xl">
              A Gahwa
              <br />
              <span className="text-saffron-400">Log</span>
            </h1>

            <p className="mt-5 max-w-md font-display text-xl text-sand-200 italic sm:text-2xl">
              Your private log of great gahwa.
            </p>

            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <span className="sadu-diamond bg-saffron-500" />
              <span className="h-px flex-1 max-w-[10rem] bg-gradient-to-r from-saffron-500/70 to-transparent" />
            </div>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-sand-300 sm:text-lg">
              Save the places, ratings, and memories behind every cup of gahwa. Only you can see
              your log — every record is locked to your account inside the database itself.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-saffron-500 px-7 py-3.5 text-base font-semibold text-espresso-900 shadow-lg shadow-black/20 transition-colors hover:bg-saffron-400"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-sand-300/40 px-7 py-3.5 text-base font-semibold text-sand-100 transition-colors hover:bg-espresso-700"
              >
                Create account
              </Link>
            </div>

            <div className="mt-5">
              <GuestButton className="text-sm font-medium text-sand-300 underline underline-offset-4 transition-colors hover:text-saffron-400 disabled:opacity-60" />
              <p className="mt-1 text-xs text-sand-300/70">
                Just want a look? Try it without signing up.
              </p>
            </div>
          </div>

          {/* The preview sits inside an arch, like a doorway. */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="arch absolute -inset-3 border border-saffron-500/25" aria-hidden="true" />
            <div className="arch relative overflow-hidden bg-sand-50 shadow-2xl shadow-black/30">
              <div className="px-6 pt-20 pb-6">
                <p className="text-center text-xs font-medium tracking-[0.18em] text-ink-500 uppercase">
                  Your log
                </p>
                <div className="mt-4 space-y-3">
                  {SAMPLE.map((item) => (
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
        </div>
      </header>

      <SaduBand />

      <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            A locker for your gahwa
          </h2>
          <SaduDivider />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <section
              key={feature.title}
              className="relative rounded-3xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="arch-sm flex h-11 w-9 items-end justify-center bg-gahwa-100 pb-1.5 font-display text-base font-semibold text-gahwa-700">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{feature.body}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-auto bg-espresso-900 text-sand-300">
        <SaduBand tone="light" />
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <p className="font-display text-base text-sand-100">A Gahwa Log</p>
          <p className="text-sm">Your private log of great gahwa.</p>
        </div>
      </footer>
    </>
  );
}
