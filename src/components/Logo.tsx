import Link from "next/link";
import { DallahIcon } from "./DallahIcon";

/** The "A Gahwa Log" wordmark. Links home, or to the dashboard when signed in. */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 rounded-lg text-ink-900 transition-opacity hover:opacity-80"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gahwa-500 text-sand-50 shadow-sm">
        <DallahIcon className="h-5 w-5" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
        A Gahwa Log
      </span>
    </Link>
  );
}
