
"use client";
import IssueReportForms from "./IssueReportForms";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

const enquiryTypes = [
  "Engineering Services",
  "Lift & Escalator Safety",
  "Services by Sector",
  "Training & Skill Development",
  "Employment & Employer Connect",
  "Case Studies & Technical Inputs",
  "Certificate Verification",
  "General Enquiry",
];

const initialForm = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  enquiryType: "",
  sector: "",
  message: "",
  consent: false,
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof typeof initialForm,
    value: string | boolean,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setErrorMessage("");

    if (!form.consent) {
      setErrorMessage(
        "Please provide consent before submitting your enquiry.",
      );
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setErrorMessage(
        "Contact service is not configured. Please try again later.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/contact-enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            organization: form.organization.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            enquiryType: form.enquiryType,
            sector: form.sector.trim(),
            message: form.message.trim(),
            consent: form.consent,
          }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const apiMessage = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message;

        throw new Error(
          apiMessage ||
            "Unable to submit your enquiry. Please try again.",
        );
      }

      setForm({ ...initialForm });
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="contact-hero relative isolate overflow-hidden bg-[#102844] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,24,43,0.92) 0%, rgba(7,24,43,0.84) 55%, rgba(7,24,43,0.76) 100%), url('/images/nleta-contact-bg.png')",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-10"
        >
          <div className="contact-glow absolute -right-20 -top-32 h-96 w-96 rounded-full border-[50px] border-white" />
          <div className="contact-glow contact-glow-delay absolute -bottom-48 right-1/4 h-96 w-96 rounded-full border-[50px] border-[#12a6a0]" />
        </div>

        <div className="container-shell contact-reveal relative py-25 md:py-32">
          <div className="mb-6 flex h-1 w-24 overflow-hidden rounded-full">
            <span className="w-1/3 bg-[#ff9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
          </div>

          <p className="contact-reveal contact-delay-1 mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Contact NLETA
          </p>

          <h1 className="contact-reveal contact-delay-1 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Let&apos;s discuss your technical requirements.
          </h1>

          <p className="contact-reveal contact-delay-2 mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Connect with NLETA for engineering-related enquiries,
            safety initiatives, technical training, employment
            opportunities and industry collaboration.
          </p>

          <div className="contact-reveal contact-delay-3 mt-8 flex flex-wrap gap-3 text-sm text-blue-100">
            {["Engineering", "Safety", "Training", "Industry Connect"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-4 py-2"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Contact details and enquiry form */}
      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <span className="eyebrow">Get in touch</span>

            <h2 className="section-title mt-4">How can we help?</h2>

            <p className="body-copy mt-5">
              Select the enquiry category that best matches your
              requirement. Include enough detail to help the team
              understand your request.
            </p>

            <div className="mt-8 space-y-4">
              {/* Email card */}
              <div className="contact-card rounded-xl border border-[#e1e8f0] bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2465a7]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#102844]">
                      Email
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      General enquiries
                    </p>
                    <a
                      href="mailto:info@nleta.org.in"
                      className="mt-2 inline-block break-all text-sm font-semibold text-[#2465a7] hover:underline"
                    >
                      info@nleta.org.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Existing portals */}
              <div className="contact-card rounded-xl border border-[#e1e8f0] bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#128b86]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16v16H4z" />
                      <path d="M8 8h8M8 12h8M8 16h5" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#102844]">
                      Existing portals
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Access your existing NLETA dashboard or CRM.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#2465a7]">
                      <a
                        href="https://nleta.site.je/login.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Dashboard Login ↗
                      </a>

                      <a
                        href="https://final-crm-three.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        CRM Login ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="font-semibold text-[#102844]">
                Before submitting
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Please avoid including passwords, payment details or
                other sensitive personal information in this form.
              </p>
            </div>
          </aside>

          {/* Enquiry form */}
          <div className="contact-card rounded-2xl border border-[#e1e8f0] bg-white p-6 shadow-sm md:p-9">
            <h2 className="text-2xl font-bold text-[#102844]">
              Send an enquiry
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fields marked with * are required.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6"
              >
                <h3 className="font-semibold text-emerald-950">
                  Enquiry submitted successfully!
                </h3>

                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  Thank you for contacting NLETA. Your enquiry has
                  been recorded successfully.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  className="mt-4 text-sm font-semibold text-[#2465a7] hover:underline"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                {errorMessage && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
                  >
                    {errorMessage}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Full name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={form.name}
                      onChange={(e) =>
                        updateField("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm outline-none transition focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Organization
                    </label>

                    <input
                      id="organization"
                      name="organization"
                      autoComplete="organization"
                      maxLength={150}
                      value={form.organization}
                      onChange={(e) =>
                        updateField("organization", e.target.value)
                      }
                      placeholder="Company or organization"
                      className="w-full rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm outline-none transition focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Email address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm outline-none transition focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={25}
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      placeholder="Enter phone number"
                      className="w-full rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm outline-none transition focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiryType"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Enquiry category *
                    </label>

                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={form.enquiryType}
                      onChange={(e) =>
                        updateField("enquiryType", e.target.value)
                      }
                      className="w-full rounded-lg border border-[#d8e1eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select a category</option>

                      {enquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sector"
                      className="mb-2 block text-sm font-semibold text-[#102844]"
                    >
                      Industry / sector
                    </label>

                    <input
                      id="sector"
                      name="sector"
                      maxLength={120}
                      value={form.sector}
                      onChange={(e) =>
                        updateField("sector", e.target.value)
                      }
                      placeholder="e.g. Residential, Metro, Industrial"
                      className="w-full rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm outline-none focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#102844]"
                  >
                    Your message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      updateField("message", e.target.value)
                    }
                    placeholder="Describe your requirements..."
                    className="w-full resize-y rounded-lg border border-[#d8e1eb] px-4 py-3 text-sm leading-6 outline-none focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) =>
                      updateField("consent", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-[#2465a7]"
                  />

                  <span>
                    I agree that NLETA may use the information
                    provided to respond to this enquiry, subject to
                    the applicable privacy policy. *
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                  {!loading && (
                    <span aria-hidden="true"> →</span>
                  )}
                </button>

                <p className="text-xs leading-5 text-slate-400">
                  Your enquiry will be sent to NLETA for processing.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <IssueReportForms />

      {/* Existing bottom CTA */}
      <section className="container-shell pb-20">
        <div className="contact-cta flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#102844] p-8 text-white md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Need portal access?
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Already using NLETA systems?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100">
              Use your existing dashboard or CRM login to access the
              relevant application.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-[#102844] hover:bg-green-600"
          >
            Back to homepage →
          </Link>
        </div>
      </section>
    </>
  );
}
