"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "./Alert";
import { fieldClass, labelClass, primaryButtonClass } from "./AuthShell";
import { NETWORK_MESSAGE, isNetworkError } from "@/lib/auth-messages";
import { createClient } from "@/lib/supabase/client";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address, for example you@example.com.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Your password needs to be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
      });

      if (signUpError) {
        console.error("Supabase sign-up failed:", signUpError.message);

        if (isNetworkError(signUpError)) {
          setError(NETWORK_MESSAGE);
        } else if (signUpError.code === "user_already_exists") {
          setError("An account with this email already exists. Try logging in instead.");
        } else if (signUpError.code === "weak_password") {
          setError("That password is too easy to guess. Please choose a stronger one.");
        } else if (signUpError.code === "over_email_send_rate_limit") {
          setError("Too many attempts just now. Please wait a minute and try again.");
        } else {
          setError("We couldn't create your account. Please check your details and try again.");
        }
        return;
      }

      // When email confirmation is ON, Supabase hides whether the address is
      // already taken by returning a user with no identities.
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists. Try logging in instead.");
        return;
      }

      if (data.session) {
        // Supabase logged the new account straight in.
        setSuccess("Account created ☕ Taking you to your log…");
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      // No session came back, which usually means "Confirm email" is on.
      // The account may still be usable, so try logging in right away
      // rather than sending the user off to check their inbox for nothing.
      const signIn = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (!signIn.error) {
        setSuccess("Account created ☕ Taking you to your log…");
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      // The account really does need confirming first.
      console.error("Post-signup sign-in failed:", signIn.error.message);
      setSuccess(
        "Account created ☕ Check your inbox for a confirmation link, then come back and log in.",
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (unknownError) {
      console.error("Unexpected sign-up error:", unknownError);
      setError("We couldn't create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error ? <Alert tone="error">{error}</Alert> : null}
      {success ? <Alert tone="success">{success}</Alert> : null}

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
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          aria-describedby="password-hint"
          className={fieldClass}
        />
        <p id="password-hint" className="mt-1.5 text-xs text-ink-500">
          Use at least {MIN_PASSWORD_LENGTH} characters.
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Type your password again"
          className={fieldClass}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
        {isSubmitting ? "Creating your account…" : "Create account"}
      </button>
    </form>
  );
}
