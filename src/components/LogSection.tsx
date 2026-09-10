"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddGahwaForm } from "./AddGahwaForm";
import { EmptyState } from "./EmptyState";
import { GahwaCard } from "./GahwaCard";
import type { GahwaLog } from "@/lib/types";

const addButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-rose-300 px-5 py-2.5 text-sm font-semibold text-plum-900 shadow-sm transition-colors hover:bg-rose-400";

/**
 * Holds the small amount of interactivity the dashboard needs: opening the
 * add form, and asking Next.js to re-fetch the list after a save.
 * The list itself is loaded on the server, so a refresh never loses it.
 */
export function LogSection({
  logs,
  initialPlace = "",
}: {
  logs: GahwaLog[];
  /** Prefilled when arriving from the Kuwait guide via ?place=... */
  initialPlace?: string;
}) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(initialPlace !== "");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900">My collection</h2>
          <p className="mt-0.5 text-sm text-ink-500">
            {logs.length === 0
              ? "No gahwa saved yet."
              : `${logs.length} gahwa ${logs.length === 1 ? "experience" : "experiences"} saved.`}
          </p>
        </div>

        {!isFormOpen ? (
          <button type="button" onClick={() => setIsFormOpen(true)} className={addButtonClass}>
            <span aria-hidden="true">+</span> Add Gahwa
          </button>
        ) : null}
      </div>

      {isFormOpen ? (
        <AddGahwaForm
          initialPlace={initialPlace}
          onAdded={() => router.refresh()}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : null}

      {logs.length === 0 ? (
        <EmptyState
          onAdd={
            isFormOpen ? (
              <p className="text-sm text-ink-500">Fill in the form above to save your first one.</p>
            ) : (
              <button type="button" onClick={() => setIsFormOpen(true)} className={addButtonClass}>
                Add your first gahwa
              </button>
            )
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {logs.map((log) => (
            <li key={log.id}>
              <GahwaCard log={log} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
