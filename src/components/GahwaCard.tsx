import { Stars } from "./Stars";
import type { GahwaLog } from "@/lib/types";

/** Turns "2026-08-20" into "August 20, 2026" without timezone surprises. */
function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function GahwaCard({ log }: { log: GahwaLog }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-lg font-semibold text-ink-900">
          <span aria-hidden="true">☕ </span>
          {log.place_name}
        </h3>
        <Stars rating={log.rating} />
      </div>

      <p className="mt-1 text-sm text-ink-500">{formatDate(log.date)}</p>

      {log.notes ? (
        <p className="mt-3 border-l-2 border-sand-300 pl-3 text-sm leading-relaxed text-ink-700 italic">
          &ldquo;{log.notes}&rdquo;
        </p>
      ) : null}
    </article>
  );
}
