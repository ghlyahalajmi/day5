/**
 * A starter guide to Kuwait's specialty coffee scene.
 *
 * Names and areas are real. The `priceBand` is an INDICATIVE range for a
 * specialty coffee in Kuwait — it is not a quoted menu price, because menu
 * prices change constantly and vary by drink. The page says so plainly.
 *
 * To add a café, just add an object to this list. Nothing else to change.
 */
export type Cafe = {
  name: string;
  area: string;
  knownFor: string;
  /** Drinks the place is known for. */
  signatures: string[];
  /** Indicative price range in Kuwaiti dinar, not a quoted menu price. */
  priceBand: string;
};

export const CAFES: Cafe[] = [
  {
    name: "JUMO Coffee Roasters",
    area: "Shuwaikh Industrial",
    knownFor: "One of the most talked-about roasteries in the country, in the middle of Kuwait's densest coffee district.",
    signatures: ["Espresso", "Filter / pour-over", "House roasts"],
    priceBand: "1.5 – 3.0 KD",
  },
  {
    name: "Stockroom",
    area: "Shuwaikh Industrial",
    knownFor: "A no-frills, serious roastery built around bean buying, profile cupping and expert roasting.",
    signatures: ["Cupping flights", "Single origin filter", "Retail beans"],
    priceBand: "1.5 – 3.0 KD",
  },
  {
    name: "VOL.1",
    area: "Shuwaikh Industrial",
    knownFor: "A design-led warehouse café, a regular fixture on Kuwait specialty coffee lists.",
    signatures: ["Espresso", "Batch brew", "Signature lattes"],
    priceBand: "1.5 – 3.0 KD",
  },
  {
    name: "Tamper",
    area: "Kuwait City",
    knownFor: "Carefully dialled espresso and playful signatures alongside a bakery-forward pastry programme.",
    signatures: ["Spanish latte", "Saffron latte", "Pastries"],
    priceBand: "1.5 – 3.5 KD",
  },
  {
    name: "EAST Café",
    area: "Kuwait City",
    knownFor: "Opened in 2017 by a group of Kuwaiti friends, known for a calm room and a playful signature menu.",
    signatures: ["Casper Latte", "East Latte", "Panda Latte"],
    priceBand: "1.5 – 3.0 KD",
  },
  {
    name: "The Coffee Department",
    area: "Souq Sharq, Sharq",
    knownFor: "Waterfront mall spot with a modern, airy room — specialty espresso and pour-over.",
    signatures: ["Espresso", "Pour-over", "Flat white"],
    priceBand: "1.5 – 3.0 KD",
  },
  {
    name: "Richards Coffee",
    area: "Kuwait City",
    knownFor: "A long-standing name on Kuwait City specialty coffee guides.",
    signatures: ["Espresso", "Cortado", "Filter"],
    priceBand: "1.5 – 3.0 KD",
  },
];

/** The coffee districts, for the little area filter chips. */
export const CAFE_AREAS = Array.from(new Set(CAFES.map((cafe) => cafe.area))).sort();

/** A Google Maps search link — always resolves live, so it is never a stale pin. */
export function mapsUrl(cafe: Cafe): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cafe.name} ${cafe.area} Kuwait`,
  )}`;
}
