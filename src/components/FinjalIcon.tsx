/**
 * A finjal (فنجال) — the small handleless cup Arabic gahwa is served in,
 * resting on its saucer. Used as the product mark.
 */
export function FinjalIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      {/* two wisps of steam */}
      <path
        d="M19.5 14.6c-1.8-1.6-1.8-3.3 0-4.9s1.8-3.3 0-4.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M28.5 14.6c-1.8-1.6-1.8-3.3 0-4.9s1.8-3.3 0-4.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* the cup */}
      <path d="M12.5 18.5h23l-2.6 11.3c-.6 2.8-3.1 4.9-6 4.9h-5.8c-2.9 0-5.4-2.1-6-4.9z" fill="currentColor" />
      {/* the saucer it rests on */}
      <path d="M6.5 36.2h35c0 3.4-2.8 6.2-6.2 6.2h-22.6c-3.4 0-6.2-2.8-6.2-6.2z" fill="currentColor" />
    </svg>
  );
}
