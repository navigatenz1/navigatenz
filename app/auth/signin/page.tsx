"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import { useAuth } from "@/lib/auth-context";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) {
      setError(error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="min-h-screen relative bg-soft flex items-center justify-center py-16 px-4">
      <div className="bg-dot-pattern" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gold/8 rounded-full blur-3xl" />

      <Container className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            Welcome back
          </h1>
          <p className="mt-2 text-navy/60 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 space-y-5"
        >
          {error && (
            <div className="bg-coral-50 border border-coral/20 text-coral-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-navy">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-teal hover:text-teal-600 transition-colors">
                Forgot password?
              </Link>
            </div>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-teal text-white font-semibold py-3.5 text-sm hover:bg-teal-600 shadow-sm hover:shadow-lg hover:shadow-teal/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {submitting ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-navy/50">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-teal font-medium hover:text-teal-600 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </Container>
    </section>
  );
}
