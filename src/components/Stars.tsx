/**
 * Shows a 1-5 rating as filled and empty stars.
 * The stars are decorative; the real value is announced to screen readers.
 */
export function Stars({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(1, Math.round(rating)));
  return (
    <p className="flex items-center gap-0.5" aria-label={`Rated ${safe} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          aria-hidden="true"
          className={star <= safe ? "text-rose-500" : "text-lilac-300"}
        >
          {star <= safe ? "★" : "☆"}
        </span>
      ))}
    </p>
  );
}
