/**
 * A band of Sadu weaving — the geometric diamond pattern of Kuwaiti
 * Bedouin textiles. Purely decorative, so it is hidden from screen readers.
 */
export function SaduBand({ tone = "warm" }: { tone?: "warm" | "light" }) {
  return (
    <div
      aria-hidden="true"
      className={`sadu-band w-full ${tone === "light" ? "sadu-band-light" : ""}`}
    />
  );
}

/** Three woven diamonds, used to separate sections. */
export function SaduDivider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3 py-2">
      <span className="h-px w-12 bg-sand-300 sm:w-20" />
      <span className="sadu-diamond bg-gahwa-500" />
      <span className="sadu-diamond bg-saffron-500" />
      <span className="sadu-diamond bg-gahwa-500" />
      <span className="h-px w-12 bg-sand-300 sm:w-20" />
    </div>
  );
}
