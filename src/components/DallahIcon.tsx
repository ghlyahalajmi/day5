/** A simplified dallah (Arabic coffee pot) used as the product mark. */
export function DallahIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <circle cx="24" cy="4.5" r="2.2" fill="currentColor" />
      <path d="M16.5 12.5c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6z" fill="currentColor" />
      <path
        d="M15.6 14.5h16.8l2.4 11.6c1.1 5.3-2.9 10.3-8.3 10.3h-5c-5.4 0-9.4-5-8.3-10.3z"
        fill="currentColor"
      />
      <path d="M16.2 17.4 6.4 11c-1.2-.8-2.5 1-1.4 1.9l9 7.4z" fill="currentColor" />
      <path
        d="M33.4 19.2c4.3 1.1 5.6 8.2 1.2 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="15" y="37.5" width="18" height="3.4" rx="1.7" fill="currentColor" />
    </svg>
  );
}
