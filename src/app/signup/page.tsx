import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { SetupNotice } from "@/components/SetupNotice";
import { SignupForm } from "@/components/SignupForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your private gahwa log.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your own private log of great gahwa."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-gahwa-600 underline underline-offset-4 hover:text-gahwa-700"
          >
            Log in
          </Link>
        </>
      }
    >
      {isSupabaseConfigured() ? <SignupForm /> : <SetupNotice />}
    </AuthShell>
  );
}
