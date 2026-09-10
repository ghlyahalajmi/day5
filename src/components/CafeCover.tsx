import { initials, nameSeed, type Cafe } from "@/lib/cafes";

/**
 * The visual at the top of each café card.
 *
 * If the café has a real photo we show it. Otherwise we DRAW a cover:
 * a warm gradient, a band of Sadu weaving and the café's initials, picked
 * deterministically from the name so a café always looks the same.
 *
 * This is deliberately not a stock photo. Putting a generic stock image
 * next to a real business implies it is a picture of that place, which it
 * is not. A drawn cover is honest and still gives every card an identity.
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
  if (cafe.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cafe.photo}
        alt={`${cafe.name} in ${cafe.area}`}
        className="h-28 w-full object-cover"
        loading="lazy"
      />
    );
  }

  const seed = nameSeed(cafe.name);
  const gradient = GRADIENTS[seed % GRADIENTS.length];
  // Nudge the weave sideways so no two covers line up identically.
  const offset = seed % 40;

  return (
    <div
      aria-hidden="true"
      className={`relative h-28 w-full overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      <div
        className="sadu-band sadu-band-light absolute inset-x-0 top-4 opacity-70"
        style={{ backgroundPositionX: `${offset}px` }}
      />
      <div
        className="sadu-band sadu-band-light absolute inset-x-0 bottom-4 opacity-40"
        style={{ backgroundPositionX: `${(offset + 20) % 40}px` }}
      />
      <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold tracking-tight text-sand-50 drop-shadow">
        {initials(cafe.name)}
      </span>
    </div>
  );
}
