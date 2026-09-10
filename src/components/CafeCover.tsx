import { BrandBadge } from "./BrandBadge";
import { nameSeed, type Cafe } from "@/lib/cafes";

/**
 * The visual at the top of each café card: a background, and a round brand
 * badge sitting on it — the layout you see on any café directory.
 *
 * Background: the café's own photo if it has one, otherwise a pastel gradient
 * with a band of Sadu weaving, both picked deterministically from the name
 * so a café always looks the same.
 *
 * Badge: see BrandBadge — the café's own logo, from a file you supplied or
 * from their own Instagram or website, and a drawn emblem if none loads.
 *
 * We do not ship anyone's photograph we do not have. A stock image beside a
 * real business implies it is a picture of that place. `photo` is a slot:
 * drop your own files into /public/cafes/ and they appear here.
 */

const GRADIENTS = [
  "from-blush-200 via-rose-300 to-lilac-300",
  "from-sky-200 via-azure-300 to-lilac-300",
  "from-lilac-300 via-blush-200 to-sky-200",
  "from-rose-300 via-blush-200 to-azure-300",
  "from-azure-300 via-sky-200 to-blush-200",
  "from-lilac-300 via-azure-300 to-rose-300",
];

export function CafeCover({ cafe, logoFile }: { cafe: Cafe; logoFile?: string }) {
  const seed = nameSeed(cafe.name);
  const gradient = GRADIENTS[seed % GRADIENTS.length];
  // Nudge the weave sideways so no two covers line up identically.
  const offset = seed % 40;

  return (
    <div className="relative h-28 w-full overflow-hidden">
      {cafe.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cafe.photo}
          alt={`${cafe.name} in ${cafe.area}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div aria-hidden="true" className={`h-full w-full bg-gradient-to-br ${gradient}`}>
          <div
            className="sadu-band sadu-band-ink absolute inset-x-0 top-3 opacity-45"
            style={{ backgroundPositionX: `${offset}px` }}
          />
          <div
            className="sadu-band sadu-band-ink absolute inset-x-0 bottom-3 opacity-25"
            style={{ backgroundPositionX: `${(offset + 20) % 40}px` }}
          />
        </div>
      )}

      {/* The brand badge, centred over the cover. */}
      <span className="absolute inset-0 flex items-center justify-center">
        <BrandBadge cafe={cafe} logoFile={logoFile} />
      </span>
    </div>
  );
}
