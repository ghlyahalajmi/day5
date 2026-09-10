"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NETWORK_MESSAGE, isNetworkError } from "@/lib/auth-messages";
import { GUEST_EMAIL, GUEST_PASSWORD } from "@/lib/guest";
import { createClient } from "@/lib/supabase/client";

/**
 * "Continue as guest" — lets someone try the app without creating an account.
 *
 * It asks Supabase for an anonymous account first, so each guest gets their
 * own private log and you can see Row Level Security doing its job. If
 * anonymous sign-ins are switched off for the project, it signs in to the
 * shared demo account instead, so the button always works.
 *
 * Either way this is a real Supabase session with a real auth.uid(), so the
 * database rules apply to a guest exactly as they do to anyone else.
 */
export function GuestButton({
  className,
  onError,
}: {
  className: string;
  onError?: (message: string | null) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function continueAsGuest() {
    onError?.(null);
    setIsLoading(true);

    try {
      const supabase = createClient();

      // First choice: a private, throwaway anonymous account.
      const anonymous = await supabase.auth.signInAnonymously();

      if (anonymous.error) {
        console.error("Anonymous sign-in unavailable:", anonymous.error.message);

        if (isNetworkError(anonymous.error)) {
          onError?.(NETWORK_MESSAGE);
          return;
        }

        // Fallback: the shared demo account.
        const shared = await supabase.auth.signInWithPassword({
          email: GUEST_EMAIL,
          password: GUEST_PASSWORD,
        });

        if (shared.error) {
          console.error("Guest sign-in failed:", shared.error.message);
          onError?.(
            isNetworkError(shared.error)
              ? NETWORK_MESSAGE
              : "We couldn't open the guest log right now. Please try again.",
          );
          return;
        }
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (unknownError) {
      console.error("Unexpected guest sign-in error:", unknownError);
      onError?.("We couldn't open the guest log right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button type="button" onClick={continueAsGuest} disabled={isLoading} className={className}>
      {isLoading ? "Opening guest log…" : "Continue as guest"}
    </button>
  );
}
