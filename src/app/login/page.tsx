import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your private gahwa log.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to open your private gahwa log."
      footer={
        <>
          New here?{" "}
          <Link
            href="/signup"
            className="font-semibold text-rose-700 underline underline-offset-4 hover:text-rose-800"
          >
            Create an account
          </Link>
        </>
      }
    >
      {isSupabaseConfigured() ? <LoginForm /> : <SetupNotice />}
    </AuthShell>
  );
}
