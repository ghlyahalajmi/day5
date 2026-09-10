import Link from "next/link";
import { FinjalIcon } from "./FinjalIcon";

/**
 * The "A Gahwa Log" wordmark. The finjal sits inside an arch, the rounded
 * doorway shape you see all over Gulf architecture.
 */
export function Logo({ href = "/", tone = "dark" }: { href?: string; tone?: "dark" | "light" }) {
  const isLight = tone === "light";
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80 ${
        isLight ? "text-sand-100" : "text-ink-900"
      }`}
    >
      <span
        className={`arch-sm flex h-10 w-9 shrink-0 items-end justify-center pb-1.5 shadow-sm ${
          isLight ? "bg-saffron-500 text-espresso-900" : "bg-gahwa-500 text-sand-50"
        }`}
      >
        <FinjalIcon className="h-5 w-5" detail={false} />
      </span>
      <span className="font-display text-base font-semibold whitespace-nowrap tracking-tight sm:text-xl">
        A Gahwa Log
      </span>
    </Link>
  );
}
