"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { createClient } from "@/lib/supabase/client";

const MAX_STORY = 500;

export default function ShareYourStoryPage() {
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState<"student" | "parent" | "teacher" | "other">("student");
  const [region, setRegion] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [story, setStory] = useState("");
  const [permission, setPermission] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || firstName.length > 60) return setError("Please enter a first name (under 60 characters).");
    if (!story.trim() || story.length < 20) return setError("Please write at least 20 characters.");
    if (story.length > MAX_STORY) return setError(`Please keep your story under ${MAX_STORY} characters.`);
    if (!permission) return setError("We need your permission to receive your story.");

    setSubmitting(true);
    const supabase = createClient();
    const { error: supaError } = await supabase.from("stories").insert({
      first_name: firstName.trim(),
      role,
      region: region.trim() || null,
      year_level: role === "student" ? yearLevel || null : null,
      story: story.trim(),
      permission: true,
    });
    setSubmitting(false);

    if (supaError) {
      setError("Something went wrong submitting your story. Please email admin@navigatenz.org instead.");
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-soft py-20">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-teal" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3">Thank you</h1>
            <p className="text-navy/60 leading-relaxed mb-8">
              We received your story. A human from our team will read it and be in touch if we&apos;d like to share it publicly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/" size="md">Back to home</Button>
              <Button href="/guides" variant="outline" size="md">Browse guides</Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-soft via-white to-teal-50/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-navy/50 mb-4">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-navy/70">Share your story</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">Share your story</h1>
            <p className="mt-4 text-navy/60 text-lg leading-relaxed">
              If Navigate NZ helped you — or someone in your family — tell us. We read every story and only publish with your permission.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16 bg-white">
        <Container>
          <form onSubmit={submit} className="max-w-xl mx-auto space-y-5">
            <Field label="First name" required>
              <input
                type="text"
                required
                maxLength={60}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                placeholder="e.g. Aroha"
              />
            </Field>

            <Field label="Your role" required>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([
                  { id: "student", label: "Student" },
                  { id: "parent", label: "Parent" },
                  { id: "teacher", label: "Teacher" },
                  { id: "other", label: "Other" },
                ] as const).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    aria-pressed={role === r.id}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                      role === r.id
                        ? "border-teal bg-teal-50 text-teal-700"
                        : "border-gray-200 text-navy/60 hover:border-gray-300"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Region (optional)">
              <input
                type="text"
                maxLength={80}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input"
                placeholder="e.g. Auckland, Dunedin, Tāmaki Makaurau"
              />
            </Field>

            {role === "student" && (
              <Field label="Year level (optional)">
                <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} className="input">
                  <option value="">Prefer not to say</option>
                  <option>Year 9</option>
                  <option>Year 10</option>
                  <option>Year 11</option>
                  <option>Year 12</option>
                  <option>Year 13</option>
                  <option>At university</option>
                </select>
              </Field>
            )}

            <Field label={`Your story (max ${MAX_STORY} characters)`} required>
              <textarea
                required
                minLength={20}
                maxLength={MAX_STORY}
                rows={5}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="input resize-none"
                placeholder="What did Navigate NZ help you with? How did it make a difference for your family?"
              />
              <div className="mt-1 flex justify-end text-xs text-navy/40">
                {story.length}/{MAX_STORY}
              </div>
            </Field>

            <label className="flex items-start gap-3 rounded-xl bg-soft p-4 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={permission}
                onChange={(e) => setPermission(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal focus:ring-2 focus:ring-teal/30"
              />
              <span className="text-sm text-navy/80 leading-relaxed">
                I give Navigate NZ permission to share this story on the website and social media. You can email us any time to edit or remove it.
              </span>
            </label>

            {error && (
              <p role="alert" className="text-sm text-coral">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-xl bg-teal text-white px-6 py-3 text-sm font-semibold hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                {submitting ? "Submitting…" : "Submit my story"}
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-navy hover:border-teal hover:text-teal transition-all"
              >
                Cancel
              </Link>
            </div>

            <p className="text-xs text-navy/40 pt-2">
              We store your story on Supabase with row-level security. Only Navigate NZ admins can read submissions. Nothing is published until we reach out to you.
            </p>
          </form>
        </Container>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #1B2A4A;
          background: white;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          outline: none;
          border-color: #2A9D8F;
          box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.15);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-coral ml-1" aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}
