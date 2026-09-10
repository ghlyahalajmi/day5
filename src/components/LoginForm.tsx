"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "./Alert";
import { fieldClass, labelClass, primaryButtonClass } from "./AuthShell";
import { NETWORK_MESSAGE, isNetworkError } from "@/lib/auth-messages";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        // Log the technical detail for the developer, show a plain message to the user.
        console.error("Supabase sign-in failed:", signInError.message);

        if (isNetworkError(signInError)) {
          setError(NETWORK_MESSAGE);
        } else if (signInError.code === "email_not_confirmed") {
          setError("Please confirm your email address first, then log in.");
        } else {
          setError("Email or password is incorrect.");
        }
        return;
      }

      // refresh() re-runs the server components so they see the new session.
      router.replace("/dashboard");
      router.refresh();
    } catch (unknownError) {
      console.error("Unexpected sign-in error:", unknownError);
      setError("We couldn't log you in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error ? <Alert tone="error">{error}</Alert> : null}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          className={fieldClass}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
