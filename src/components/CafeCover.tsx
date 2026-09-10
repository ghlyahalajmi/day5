import { initials, nameSeed, type Cafe } from "@/lib/cafes";

/**
 * The visual at the top of each café card: a background, and a round brand
 * badge sitting on it — the layout you see on any café directory.
 *
 * Background: the café's own photo if it has one, otherwise a warm gradient
 * with a band of Sadu weaving, both picked deterministically from the name
 * so a café always looks the same.
 *
 * Badge: the café's own logo if it has one, otherwise its monogram.
 *
 * We do not ship anyone's logo or photograph we do not have. A stock image
 * beside a real business implies it is a picture of that place, and a
 * scraped logo is someone else's trademark. Both `photo` and `logo` are
 * slots: drop your own files into /public/cafes/ and they appear here.
 */

const GRADIENTS = [
  "from-espresso-900 via-espresso-700 to-gahwa-700",
  "from-gahwa-700 via-gahwa-600 to-saffron-500",
  "from-espresso-800 via-gahwa-700 to-espresso-900",
  "from-gahwa-600 via-saffron-500 to-gahwa-500",
  "from-espresso-900 via-gahwa-600 to-espresso-700",
  "from-saffron-500 via-gahwa-500 to-gahwa-700",
];

export function CafeCover({ cafe }: { cafe: Cafe }) {
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
            className="sadu-band sadu-band-light absolute inset-x-0 top-3 opacity-60"
            style={{ backgroundPositionX: `${offset}px` }}
          />
          <div
            className="sadu-band sadu-band-light absolute inset-x-0 bottom-3 opacity-35"
            style={{ backgroundPositionX: `${(offset + 20) % 40}px` }}
          />
        </div>
      )}

      {/* The brand badge, centred over the cover. */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-sand-50 bg-sand-50 shadow-lg">
          {cafe.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cafe.logo}
              alt={`${cafe.name} logo`}
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
            />
          ) : (
            <span
              aria-hidden="true"
              className="font-display text-xl font-semibold tracking-tight text-gahwa-700"
            >
              {initials(cafe.name)}
            </span>
          )}
        </span>
      </span>
    </div>
  );
}
