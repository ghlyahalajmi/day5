/**
 * A guide to Kuwait's specialty coffee scene.
 *
 * WHERE THE DATA COMES FROM
 * Names and areas are real places, gathered from published Kuwait coffee
 * guides (Daymark, ProKuwaiti, Wanderlog, KuwaitMate). Nothing here is
 * invented.
 *
 * `priceBand` is an INDICATIVE range for a specialty coffee in Kuwait, not
 * a quoted menu price — menus change and every drink is priced differently.
 * The page says so plainly.
 *
 * TO ADD A CAFÉ: add one object below. Nothing else to change.
 * TO ADD A PHOTO: drop the file in /public/cafes/ and set `photo` to
 * "/cafes/your-file.jpg". Without a photo the card draws its own
 * Sadu-weave cover, so the grid never looks broken.
 */
export type Cafe = {
  name: string;
  area: string;
  /** Optional one-liner. Left out where we could not verify a description. */
  knownFor?: string;
  /** Drinks or things the place is known for. */
  signatures?: string[];
  /** Indicative price range in Kuwaiti dinar, not a quoted menu price. */
  priceBand?: string;
  /** Optional path to a real photo you have the right to use. */
  photo?: string;
};

const BAND = "1.5 – 3.0 KD";

export const CAFES: Cafe[] = [
  // ---------- Shuwaikh Industrial ----------
  { name: "JUMO Coffee Roasters", area: "Shuwaikh Industrial", knownFor: "Artisan roastery near Sadu House with craft roasts sourced worldwide.", signatures: ["Espresso", "Filter / pour-over", "House roasts"], priceBand: BAND },
  { name: "Stockroom", area: "Shuwaikh Industrial", knownFor: "A no-frills, serious roastery built around bean buying, cupping and roasting.", signatures: ["Cupping flights", "Single origin", "Retail beans"], priceBand: BAND },
  { name: "VOL.1", area: "Shuwaikh Industrial", knownFor: "Design-led warehouse café, a fixture on Kuwait specialty lists.", signatures: ["Espresso", "Batch brew", "Signature lattes"], priceBand: BAND },
  { name: "% Arabica Shuwaikh", area: "Shuwaikh Industrial", knownFor: "Kuwait's largest % Arabica: café, Probat roaster and training centre.", signatures: ["Single origin espresso", "Kyoto filter"], priceBand: "1.75 – 3.5 KD" },
  { name: "Aroma", area: "Shuwaikh Industrial", knownFor: "Smooth, well-executed brews with a calm, understated room.", signatures: ["Espresso", "Filter"], priceBand: BAND },
  { name: "Caffeine", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Boost Cafe", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Car Wash Cafe", area: "Shuwaikh Industrial", knownFor: "One of Shuwaikh's more unusual industrial-unit cafés.", priceBand: BAND },
  { name: "Days*Cafe", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Force Bar", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Keys Coffee Shop", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Shuwaikh Coffee", area: "Shuwaikh Industrial", priceBand: BAND },
  { name: "Ves Vas", area: "Shuwaikh Industrial", priceBand: BAND },

  // ---------- Kuwait City / Sharq ----------
  { name: "Tamper", area: "Kuwait City", knownFor: "Carefully dialled espresso and a bakery-forward pastry programme.", signatures: ["Spanish latte", "Saffron latte", "Pastries"], priceBand: "1.5 – 3.5 KD" },
  { name: "EAST Café", area: "Kuwait City", knownFor: "Opened in 2017 by a group of Kuwaiti friends. Calm room, playful menu.", signatures: ["Casper Latte", "East Latte", "Panda Latte"], priceBand: BAND },
  { name: "The Coffee Department", area: "Souq Sharq, Sharq", knownFor: "Waterfront mall spot, modern and airy.", signatures: ["Espresso", "Pour-over", "Flat white"], priceBand: BAND },
  { name: "Richards Coffee", area: "Kuwait City", knownFor: "A long-standing name on Kuwait City specialty guides.", signatures: ["Espresso", "Cortado", "Filter"], priceBand: BAND },
  { name: "Altitude", area: "Kuwait City", knownFor: "Sleek, detail-driven café from one of Kuwait's most respected roasters.", signatures: ["Slow brew", "Precise espresso"], priceBand: BAND },
  { name: "Beans Roastery", area: "Kuwait City", knownFor: "Locally respected roastery focused on sourcing and consistency.", signatures: ["House-roasted beans"], priceBand: BAND },
  { name: "Space Café", area: "Salhiya Street, Kuwait City", knownFor: "Neighbourhood favourite for espresso and signature drinks.", signatures: ["Espresso", "Signature drinks"], priceBand: BAND },
  { name: "Grace Cafe", area: "South Mubarakiya", knownFor: "European-style café known for its signature lattes.", signatures: ["Fluffy Latte", "Saffron Latte"], priceBand: BAND },
  { name: "20 Grams", area: "Kuwait City", knownFor: "Trendy coffee bar with a hip room.", signatures: ["Amber Latte", "Espresso"], priceBand: BAND },
  { name: "Kaffa Specialty Coffee", area: "Multiple branches", knownFor: "Wide variety of unusual coffee options across several locations.", signatures: ["Specialty filter", "Espresso"], priceBand: BAND },
  { name: "Coffee Republic", area: "Multiple branches", knownFor: "Relaxed neighbourhood chain with branches across Kuwait.", priceBand: "1.0 – 2.5 KD" },
  { name: "Cafe Bazza", area: "Multiple branches", knownFor: "Traditional Kuwaiti breakfast alongside a modern café menu.", signatures: ["Kuwaiti breakfast", "Coffee"], priceBand: "1.5 – 4.0 KD" },
  { name: "Toby's Estate", area: "Mubarak Al Kabeer Street", knownFor: "Australian-style craftsmanship, ethically sourced beans, rich flat whites.", signatures: ["Flat white", "Espresso"], priceBand: BAND },

  // ---------- Salmiya ----------
  { name: "% Arabica Salmiya", area: "Salmiya", knownFor: "Single-origin espresso and clean filter in a Japanese-inspired room.", signatures: ["Single origin espresso", "Filter"], priceBand: "1.75 – 3.5 KD" },
  { name: "Toby's Estate Salmiya", area: "Salmiya", knownFor: "Australian-style roasts with brunch appeal.", signatures: ["Flat white", "Avocado toast"], priceBand: "1.5 – 4.0 KD" },
  { name: "Wild Coffee Bar", area: "Salmiya", priceBand: BAND },
  { name: "New Brew Coffee", area: "Salmiya", priceBand: BAND },
  { name: "Magnet", area: "Salmiya", priceBand: BAND },
  { name: "Muse Lounge", area: "Salmiya", priceBand: BAND },
  { name: "Mr Koobs", area: "Salmiya", priceBand: BAND },

  // ---------- Jabriya ----------
  { name: "Mug Coffee Roastery", area: "Jabriya", knownFor: "A 24/7 roastery café in Jabriya's residential heart.", signatures: ["V60", "Spanish latte", "Single origin"], priceBand: BAND },
  { name: "Toby's Estate Jabriya", area: "Jabriya", knownFor: "Espresso-based drinks, seasonal brews and all-day bites.", signatures: ["Seasonal brews", "All-day menu"], priceBand: "1.5 – 4.0 KD" },
  { name: "% Arabica Jabriya", area: "Jabriya", knownFor: "Single-origin espresso, Kyoto-style filter, Chemex-accented design.", signatures: ["Kyoto filter", "Chemex"], priceBand: "1.75 – 3.5 KD" },
];

/** The coffee districts, for the area chips. */
export const CAFE_AREAS = Array.from(new Set(CAFES.map((cafe) => cafe.area))).sort();

/** A Google Maps search link — resolves live, so it is never a stale pin. */
export function mapsUrl(cafe: Cafe): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cafe.name} ${cafe.area} Kuwait`,
  )}`;
}

/** Stable number from a name, so each café always gets the same cover art. */
export function nameSeed(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Up to two letters for the cover art. */
export function initials(name: string): string {
  const words = name.replace(/[^A-Za-z0-9 %]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "☕";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
