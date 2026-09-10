"use client";

const LABELS = ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"];

/**
 * A 1-5 star picker built from real radio buttons, so it works with a
 * keyboard and with screen readers. The stars are just the visible skin.
 */
export function RatingInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="mt-1.5">
      <legend className="sr-only">Rating out of five</legend>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <label
            key={star}
            className="cursor-pointer p-0.5 leading-none disabled:cursor-not-allowed"
          >
            <input
              type="radio"
              name="rating"
              value={star}
              checked={value === star}
              onChange={() => onChange(star)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`block rounded text-3xl transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gahwa-600 ${
                star <= value ? "text-gahwa-500" : "text-sand-400 hover:text-gahwa-500/60"
              }`}
            >
              {star <= value ? "★" : "☆"}
            </span>
            <span className="sr-only">{LABELS[index]}</span>
          </label>
        ))}
        <span className="ml-2 text-sm text-ink-500">{value} of 5</span>
      </div>
    </fieldset>
  );
}
