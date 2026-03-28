"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import { useAuth } from "@/lib/auth-context";

const userTypes = [
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "family", label: "Family Member" },
];

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, label: "Weak", color: "bg-coral" };
  if (score <= 2) return { score: 2, label: "Fair", color: "bg-gold" };
  if (score <= 3) return { score: 3, label: "Good", color: "bg-teal-300" };
  return { score: 4, label: "Strong", color: "bg-teal" };
}

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const strength = password ? getPasswordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setSubmitting(true);
    const { error } = await signUp(email, password, {
      full_name: fullName,
      user_type: userType,
    });
    setSubmitting(false);

    if (error) {
      setError(error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <section className="min-h-screen relative bg-soft flex items-center justify-center py-16 px-4">
      <div className="bg-dot-pattern" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold/8 rounded-full blur-3xl" />

      <Container className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            Create your account
          </h1>
          <p className="mt-2 text-navy/60 text-sm">
            Join Navigate NZ — it&apos;s free, always.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2A9D8F" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Check your email</h2>
            <p className="text-navy/60 text-sm leading-relaxed">
              We&apos;ve sent a confirmation link to <strong className="text-navy">{email}</strong>. Click the link to activate your account.
            </p>
            <Link href="/auth/signin" className="inline-block mt-6 text-teal text-sm font-medium hover:text-teal-600 transition-colors">
              Go to Sign In &rarr;
            </Link>
          </div>
        ) : (
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
              <label htmlFor="fullName" className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
              <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
              {strength && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-navy/50">{strength.label}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy mb-1.5">Confirm Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {userTypes.map((ut) => (
                  <button key={ut.value} type="button" onClick={() => setUserType(ut.value)} className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${userType === ut.value ? "border-teal bg-teal-50 text-teal" : "border-gray-100 text-navy/50 hover:border-gray-200"}`}>
                    {ut.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-teal text-white font-semibold py-3.5 text-sm hover:bg-teal-600 shadow-sm hover:shadow-lg hover:shadow-teal/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {submitting ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-navy/50">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-teal font-medium hover:text-teal-600 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </Container>
    </section>
  );
}
