import type { Metadata } from "next";
import Link from "next/link";
import { CafeCover } from "@/components/CafeCover";
import { FinjalIcon } from "@/components/FinjalIcon";
import { Logo } from "@/components/Logo";
import { SaduBand, SaduDivider } from "@/components/SaduBand";
import { CAFES, CAFE_AREAS, instagramUrl, mapsUrl, type Cafe } from "@/lib/cafes";

export const metadata: Metadata = {
  title: "Where to drink gahwa in Kuwait",
  description: "A guide to Kuwait's specialty coffee scene, area by area.",
};

/** Group the list so the page reads as a tour of the districts. */
function byArea(): [string, Cafe[]][] {
  return CAFE_AREAS.map((area) => [area, CAFES.filter((cafe) => cafe.area === area)]);
}

const linkClass =
  "inline-flex items-center justify-center rounded-full border border-sand-300 px-3.5 py-2 text-sm font-semibold text-ink-900 transition-colors hover:bg-sand-100";

function CafeCard({ cafe }: { cafe: Cafe }) {
  const instagram = instagramUrl(cafe);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CafeCover cafe={cafe} />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight font-semibold text-ink-900">
          {cafe.name}
        </h3>
        <p className="mt-1 text-xs font-medium tracking-wide text-gahwa-600 uppercase">
          {cafe.area}
        </p>

        {cafe.knownFor ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{cafe.knownFor}</p>
        ) : null}

        {cafe.signatures?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cafe.signatures.map((drink) => (
              <span
                key={drink}
                className="rounded-lg border border-sand-200 bg-sand-50 px-2.5 py-1 text-xs text-ink-700"
              >
                {drink}
              </span>
            ))}
          </div>
        ) : null}

        {cafe.priceBand ? (
          <p className="mt-3 text-sm text-ink-700">
            <span className="text-ink-500">Typically</span>{" "}
            <span className="font-semibold text-gahwa-600">{cafe.priceBand}</span>
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/dashboard?place=${encodeURIComponent(cafe.name)}`}
            className="inline-flex items-center justify-center rounded-full bg-gahwa-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gahwa-600"
          >
            Log this
          </Link>
          <a href={mapsUrl(cafe)} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Maps ↗
          </a>
          {instagram ? (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Instagram ↗
            </a>
          ) : null}
          {cafe.website ? (
            <a href={cafe.website} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Website ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function DiscoverPage() {
  const groups = byArea();

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
            <FinjalIcon className="h-3.5 w-3.5" detail={false} />
            Kuwait guide
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.02] font-semibold tracking-tight text-sand-50 sm:text-5xl lg:text-6xl">
            Where to drink <span className="text-saffron-400">gahwa</span> in Kuwait
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand-300 sm:text-lg">
            {CAFES.length} places across {CAFE_AREAS.length} areas. Shuwaikh Industrial holds the
            densest specialty coffee cluster in the Gulf; Salmiya draws a different crowd, Sharq
            runs at a professional pace. Start here, then save what you drink.
          </p>

          <nav aria-label="Jump to area" className="mt-7 flex flex-wrap gap-2">
            {groups.map(([area, list]) => (
              <a
                key={area}
                href={`#${encodeURIComponent(area)}`}
                className="rounded-full border border-sand-300/30 px-3 py-1.5 text-sm text-sand-200 transition-colors hover:border-saffron-500/60 hover:text-saffron-400"
              >
                {area} <span className="text-sand-300/60">{list.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <SaduBand />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-14 sm:px-8 sm:py-16">
        {groups.map(([area, list], index) => (
          <section key={area} id={encodeURIComponent(area)} className={index > 0 ? "mt-16" : ""}>
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                {area}
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                {list.length} {list.length === 1 ? "place" : "places"}
              </p>
              <SaduDivider />
            </div>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((cafe) => (
                <li key={cafe.name}>
                  <CafeCard cafe={cafe} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Being straight about where the data and the artwork come from. */}
        <aside className="mx-auto mt-16 max-w-2xl rounded-2xl border border-sand-300 bg-sand-50 p-5 text-sm leading-relaxed text-ink-700">
          <h2 className="font-display text-base font-semibold text-ink-900">About this guide</h2>
          <p className="mt-2">
            Names and areas are real places, gathered from published Kuwait coffee guides. Prices
            are a <strong>typical range</strong> for a specialty coffee here, not a quoted menu
            price — check before you order.
          </p>
          <p className="mt-2">
            The artwork on each card is <strong>drawn, not photographed</strong>: a Sadu weave
            generated from the café&rsquo;s own name. Putting a stock photo next to a real
            business would suggest it is a picture of that place, which it would not be. Drop a
            real photo into <code className="rounded bg-sand-200 px-1.5 py-0.5 text-xs">/public/cafes/</code>{" "}
            and set <code className="rounded bg-sand-200 px-1.5 py-0.5 text-xs">photo</code> on the
            café to use it instead.
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
