"use client";

import { useState } from "react";
import { Alert } from "./Alert";
import { RatingInput } from "./RatingInput";
import { fieldClass, labelClass, primaryButtonClass } from "./AuthShell";
import { NETWORK_MESSAGE, isNetworkError } from "@/lib/auth-messages";
import { createClient } from "@/lib/supabase/client";

/** Today's date in the "YYYY-MM-DD" shape a date input expects. */
function todayIsoDate(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

export function AddGahwaForm({
  initialPlace = "",
  onAdded,
  onCancel,
}: {
  initialPlace?: string;
  onAdded: () => void;
  onCancel: () => void;
}) {
  const [placeName, setPlaceName] = useState(initialPlace);
  // The form only mounts after the user clicks "Add Gahwa", so this runs in
  // the browser and picks up the user's own clock.
  const [date, setDate] = useState(todayIsoDate);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedPlace = placeName.trim();
    if (!trimmedPlace) {
      setError("Please enter the place name.");
      return;
    }
    if (!date) {
      setError("Please choose the date you tried this gahwa.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Please choose a rating between 1 and 5.");
      return;
    }

    setIsSaving(true);
    try {
      const supabase = createClient();

      // Confirm the session is still valid before writing anything.
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("No authenticated user when saving:", userError?.message);
        setError(
          isNetworkError(userError)
            ? NETWORK_MESSAGE
            : "Your session has expired. Please log in again.",
        );
        return;
      }

      const { error: insertError } = await supabase.from("gahwa_logs").insert({
        // The row is stamped with the signed-in user's own id. Even if this
        // value were tampered with, the RLS policy
        // `with check (auth.uid() = user_id)` would reject the insert.
        user_id: user.id,
        place_name: trimmedPlace,
        date,
        rating,
        notes: notes.trim() === "" ? null : notes.trim(),
      });

      if (insertError) {
        console.error("Supabase insert failed:", insertError.message);
        setError("We couldn't save your gahwa. Please try again.");
        return;
      }

      setSuccess("Gahwa added to your log ☕");
      setPlaceName("");
      setNotes("");
      setRating(5);
      setDate(todayIsoDate());
      onAdded();
    } catch (unknownError) {
      console.error("Unexpected error saving gahwa:", unknownError);
      setError("We couldn't save your gahwa. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section
      aria-labelledby="add-gahwa-heading"
      className="rounded-3xl border border-mist-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="add-gahwa-heading" className="font-display text-xl font-semibold text-ink-900">
          Add a gahwa
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-500 transition-colors hover:bg-mist-100 hover:text-ink-900"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        {error ? <Alert tone="error">{error}</Alert> : null}
        {success ? <Alert tone="success">{success}</Alert> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="place_name" className={labelClass}>
              Place name
            </label>
            <input
              id="place_name"
              name="place_name"
              type="text"
              required
              maxLength={120}
              value={placeName}
              onChange={(event) => setPlaceName(event.target.value)}
              placeholder="Qahwa House"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <span className={labelClass}>Rating</span>
          <RatingInput value={rating} onChange={setRating} disabled={isSaving} />
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Notes <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={1000}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Really smooth gahwa and a nice atmosphere."
            className={`${fieldClass} resize-y`}
          />
        </div>

        <button type="submit" disabled={isSaving} className={primaryButtonClass}>
          {isSaving ? "Saving…" : "Add to My Log"}
        </button>
      </form>
    </section>
  );
}
