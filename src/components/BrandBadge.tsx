"use client";

import { useState } from "react";
import { initials, logoSources, nameSeed, type Cafe } from "@/lib/cafes";

/**
 * The round badge on a café card: the café's OWN logo whenever we can get
 * one, and a drawn emblem when we cannot.
 *
 * `logoSources` hands back the places to look, best first. We try them in
 * order and keep the first image that actually loads. Every source is
 * fetched by the visitor's browser from the café's own channel, so no
 * business's artwork is copied into this repository, and a source that is
 * down or gone simply falls through to the next one.
 *
 * When nothing loads we draw an emblem instead of leaving a hole: a ring in
 * the café's own hue, its monogram, and a woven diamond. Deterministic from
 * the name, so a place always looks like itself.
 */

/** Ring colours, one per palette hue. */
const RINGS = [
  { ring: "border-lilac-300", tint: "bg-lilac-300/25" },
  { ring: "border-blush-200", tint: "bg-blush-200/30" },
  { ring: "border-rose-300", tint: "bg-rose-300/25" },
  { ring: "border-sky-200", tint: "bg-sky-200/30" },
  { ring: "border-azure-300", tint: "bg-azure-300/25" },
];

export function BrandBadge({ cafe }: { cafe: Cafe }) {
  const sources = logoSources(cafe);
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];

  if (src) {
    return (
      <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-lg ring-1 ring-plum-900/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${cafe.name} logo`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setAttempt((current) => current + 1)}
        />
      </span>
    );
  }

  const { ring, tint } = RINGS[nameSeed(cafe.name) % RINGS.length];

  return (
    <span
      aria-hidden="true"
      className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white shadow-lg ${ring}`}
    >
      <span className={`absolute inset-1.5 rounded-full ${tint}`} />
      <span className="relative font-display text-xl font-semibold tracking-tight text-plum-900">
        {initials(cafe.name)}
      </span>
      <span className="sadu-diamond absolute -bottom-1 h-2.5 w-2.5 bg-white ring-2 ring-white">
        <span className={`block h-full w-full ${tint.replace("/25", "").replace("/30", "")}`} />
      </span>
    </span>
  );
}
