/**
 * The brand mark: a finjal (فنجال) — the small handleless cup gahwa is
 * served in — standing inside a Gulf arch, under a Sadu diamond.
 *
 * Three motifs in one shape: the cup, the doorway, the weave.
 *
 * `detail` drops the arch and the diamond for tiny sizes, where the extra
 * lines turn to mud. Use it under about 20px.
 */
export function FinjalIcon({
  className = "h-6 w-6",
  detail = true,
}: {
  className?: string;
  detail?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      {detail ? (
        <>
          {/* the arch this all stands in */}
          <path
            d="M6 44V20C6 10.6 14.1 3 24 3s18 7.6 18 17v24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* a single woven diamond in the crown of the arch */}
          <path d="M24 8.5 27.5 12 24 15.5 20.5 12Z" fill="currentColor" opacity="0.75" />
        </>
      ) : null}

      {/* steam */}
      <path
        d="M19.8 21.5c-1.5-1.3-1.5-2.7 0-4s1.5-2.7 0-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M28.2 21.5c-1.5-1.3-1.5-2.7 0-4s1.5-2.7 0-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* the cup */}
      <path
        d="M13.5 24.5h21l-2.4 9.8c-.6 2.5-2.8 4.3-5.4 4.3h-5.4c-2.6 0-4.8-1.8-5.4-4.3z"
        fill="currentColor"
      />

      {/* the saucer */}
      <path
        d="M8 39.8h32c0 3-2.5 5.5-5.5 5.5h-21c-3 0-5.5-2.5-5.5-5.5z"
        fill="currentColor"
      />
    </svg>
  );
}
