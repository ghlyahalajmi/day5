import type { Metadata } from "next";
import Link from "next/link";
import { FinjalIcon } from "@/components/FinjalIcon";
import { Logo } from "@/components/Logo";
import { SaduBand, SaduDivider } from "@/components/SaduBand";
import { CAFES, CAFE_AREAS, mapsUrl } from "@/lib/cafes";

export const metadata: Metadata = {
  title: "Where to drink gahwa in Kuwait",
  description: "A guide to Kuwait's specialty coffee scene, by area.",
};

export default function DiscoverPage() {
  return (
    <>
      <SaduBand />

      <header className="ember-glow grain relative bg-espresso-900 text-sand-100">
        <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <Logo tone="light" />
          <Link
            href="/dashboard"
            className="rounded-full bg-saffron-500 px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-espresso-900 shadow-sm transition-colors hover:bg-saffron-400 sm:px-4"
          >
            My Log
          </Link>
        </nav>

        <div className="relative mx-auto w-full max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-saffron-500/40 bg-espresso-800/70 px-3 py-1 text-xs font-medium tracking-[0.14em] text-saffron-400 uppercase">
            <FinjalIcon className="h-3.5 w-3.5" />
            Kuwait guide
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.02] font-semibold tracking-tight text-sand-50 sm:text-5xl lg:text-6xl">
            Where to drink <span className="text-saffron-400">gahwa</span> in Kuwait
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-300 sm:text-lg">
            Shuwaikh Industrial holds the densest specialty coffee scene in the Middle East.
            Salmiya draws a different crowd, Sharq runs at a professional pace. Start here, then
            save what you drink.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {CAFE_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-sand-300/30 px-3 py-1.5 text-sm text-sand-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </header>

      <SaduBand />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-14 sm:px-8 sm:py-16">
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            {CAFES.length} places to start with
          </h2>
          <SaduDivider />
        </div>

        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAFES.map((cafe) => (
            <li key={cafe.name}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white pt-1 shadow-sm transition-shadow hover:shadow-md">
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gahwa-500 via-saffron-500 to-gahwa-500"
                  aria-hidden="true"
                />

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {cafe.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-gahwa-100 px-2.5 py-1 text-xs font-medium text-gahwa-700">
                      {cafe.area}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{cafe.knownFor}</p>

                  <div className="mt-4">
                    <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                      Known for
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cafe.signatures.map((drink) => (
                        <span
                          key={drink}
                          className="rounded-lg border border-sand-200 bg-sand-50 px-2.5 py-1 text-xs text-ink-700"
                        >
                          {drink}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-ink-700">
                    <span className="text-ink-500">Typically</span>{" "}
                    <span className="font-semibold text-gahwa-600">{cafe.priceBand}</span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 pt-1">
                    <Link
                      href={`/dashboard?place=${encodeURIComponent(cafe.name)}`}
                      className="inline-flex items-center justify-center rounded-full bg-gahwa-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gahwa-600"
                    >
                      Log this
                    </Link>
                    <a
                      href={mapsUrl(cafe)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-sand-300 px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:bg-sand-100"
                    >
                      Open in Maps ↗
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Being straight about where the numbers come from. */}
        <aside className="mx-auto mt-12 max-w-2xl rounded-2xl border border-sand-300 bg-sand-50 p-5 text-sm leading-relaxed text-ink-700">
          <h2 className="font-display text-base font-semibold text-ink-900">About this guide</h2>
          <p className="mt-2">
            Names and areas are real places on Kuwait&rsquo;s specialty coffee scene. The prices
            shown are a <strong>typical range</strong> for a specialty coffee in Kuwait, not a
            quoted menu price — menus change and every drink is priced differently, so check
            before you order. Each &ldquo;Open in Maps&rdquo; button runs a live Google Maps
            search rather than a saved pin, so it never goes stale.
          </p>
        </aside>
      </main>

      <footer className="mt-auto bg-espresso-900 text-sand-300">
        <SaduBand tone="light" />
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <p className="font-display text-base text-sand-100">A Gahwa Log</p>
          <Link href="/dashboard" className="text-sm underline underline-offset-4 hover:text-saffron-400">
            Back to my log
          </Link>
        </div>
      </footer>
    </>
  );
}
