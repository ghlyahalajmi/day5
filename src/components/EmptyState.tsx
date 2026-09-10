import { FinjalIcon } from "./FinjalIcon";
import { SaduDivider } from "./SaduBand";

/** Shown when the signed-in user has no gahwa records yet. */
export function EmptyState({ onAdd }: { onAdd: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-mist-300 bg-mist-50 px-6 py-14 text-center">
      <FinjalIcon className="mx-auto h-16 w-16 text-rose-500" />
      <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
        Your locker is empty <span aria-hidden="true">☕</span>
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-700">
        Nothing here yet. Add your first gahwa experience and it will show up right here.
      </p>
      <SaduDivider />
      <div className="mt-4 flex justify-center">{onAdd}</div>
    </div>
  );
}
