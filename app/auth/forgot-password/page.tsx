"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Please enter your email.");

    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <section className="min-h-screen relative bg-soft flex items-center justify-center py-16 px-4">
      <div className="bg-dot-pattern" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />

      <Container className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            Reset your password
          </h1>
          <p className="mt-2 text-navy/60 text-sm">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Check your email</h2>
            <p className="text-navy/60 text-sm leading-relaxed">
              If an account exists with that email, we&apos;ve sent a reset link. Check your inbox and spam folder.
            </p>
            <Link href="/auth/signin" className="inline-block mt-6 text-teal text-sm font-medium hover:text-teal-600 transition-colors">
              Back to Sign In &rarr;
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 space-y-5">
            {error && (
              <div className="bg-coral-50 border border-coral/20 text-coral-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
            </div>

            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-teal text-white font-semibold py-3.5 text-sm hover:bg-teal-600 shadow-sm hover:shadow-lg hover:shadow-teal/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {submitting ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-navy/50">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-teal font-medium hover:text-teal-600 transition-colors">Sign in</Link>
            </p>
          </form>
        )}
      </Container>
    </section>
  );
}
