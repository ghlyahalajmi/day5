import { FinjalIcon } from "./FinjalIcon";
import { SaduDivider } from "./SaduBand";

/** Shown when the signed-in user has no gahwa records yet. */
export function EmptyState({ onAdd }: { onAdd: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed border-sand-300 bg-sand-50 px-6 py-14 text-center">
      <span className="arch-sm mx-auto flex h-16 w-14 items-end justify-center bg-gahwa-100 pb-2.5 text-gahwa-600">
        <FinjalIcon className="h-7 w-7" />
      </span>
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
