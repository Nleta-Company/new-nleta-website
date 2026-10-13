
"use client";

import { useState } from "react";
import Link from "next/link";

type VerificationStatus = "idle" | "invalid" | "unavailable";

export default function CertificateVerificationPage() {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [status, setStatus] = useState<VerificationStatus>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!certificateNumber.trim()) {
      setStatus("invalid");
      return;
    }

    // Demo only: no certificate database is connected yet.
    setStatus("unavailable");
  }

  function handleChange(value: string) {
    setCertificateNumber(value);
    setStatus("idle");
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#102844] text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#12a6a0]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#2465a7]/30 blur-3xl" />

        <div className="container-shell relative py-20 md:py-28">
          <div className="mb-6 flex h-1 w-24 overflow-hidden rounded-full">
            <span className="w-1/3 bg-[#ff9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Certificate Verification
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Verify certificate information with confidence.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Use the official certificate reference to check its recorded
            details through NLETA&apos;s verification service, once connected.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[#e1e8f0] bg-white p-6 shadow-xl shadow-slate-200/40 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf5fc] text-xl text-[#2465a7]">
                  <span aria-hidden="true">⌕</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#102844]">
                    Search a certificate
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Enter the certificate reference exactly as printed on the
                    document.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                <label
                  htmlFor="certificate-number"
                  className="mb-2 block text-sm font-semibold text-[#102844]"
                >
                  Certificate number
                </label>

                <input
                  id="certificate-number"
                  type="text"
                  value={certificateNumber}
                  onChange={(event) => handleChange(event.target.value)}
                  placeholder="e.g. Enter certificate reference"
                  autoComplete="off"
                  maxLength={100}
                  aria-describedby="certificate-help"
                  className="min-h-14 w-full rounded-lg border border-[#d8e1eb] bg-white px-4 py-3 text-sm text-[#102844] outline-none transition placeholder:text-slate-400 focus:border-[#2465a7] focus:ring-2 focus:ring-[#2465a7]/10"
                />

                <p id="certificate-help" className="mt-2 text-xs leading-5 text-slate-500">
                  Avoid entering personal or confidential information that is
                  not requested.
                </p>

                <button
                  type="submit"
                  className="button-primary mt-6 w-full sm:w-auto"
                >
                  Check Certificate <span aria-hidden="true">→</span>
                </button>
              </form>

              {status === "invalid" && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"
                >
                  <h3 className="font-bold text-amber-900">
                    Certificate number required
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Enter a certificate reference before submitting.
                  </p>
                </div>
              )}

              {status === "unavailable" && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4"
                >
                  <h3 className="font-bold text-[#102844]">
                    Live verification is not connected yet
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Your reference has not been checked against an official
                    certificate database. No conclusion about its validity
                    can be made on this demo page.
                  </p>
                  <p className="mt-3 break-all text-sm text-slate-600">
                    Entered reference: {certificateNumber.trim()}
                  </p>
                  <Link
                    href="/contact?interest=certificate-verification"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2465a7] hover:text-[#102844]"
                  >
                    Contact NLETA for assistance{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}

              <div className="mt-8 border-t border-[#e1e8f0] pt-6">
                <p className="text-xs leading-6 text-slate-500">
                  Important: This page is a user-interface prototype.
                  Verification results require a trusted certificate record,
                  server-side validation and an approved verification policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Verification process</p>
            <h2 className="section-title mt-4">
              How the live service should work.
            </h2>
            <p className="body-copy mt-5">
              Once the official records are available, the verification
              workflow can provide consistent results without exposing
              confidential records.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Enter the reference",
                description:
                  "The user enters the certificate number shown on the document.",
              },
              {
                number: "02",
                title: "Check the official record",
                description:
                  "The backend looks up the record and validates its status against the authorized data source.",
              },
              {
                number: "03",
                title: "Display the result",
                description:
                  "The page displays only approved details and a clear status, including when a record cannot be verified.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-[#e1e8f0] p-6 md:p-7"
              >
                <span className="text-sm font-bold tracking-widest text-[#12a6a0]">
                  STEP {step.number}
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#102844]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-2xl bg-[#102844] px-6 py-10 text-white md:px-12 md:py-14">
            <div className="absolute right-0 top-0 h-1 w-36 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Need assistance?
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Have a question about a certificate?
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  Contact NLETA to ask about certificate records and the
                  appropriate verification process.
                </p>
              </div>

              <Link
                href="/contact?interest=certificate-verification"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#102844] transition hover:bg-slate-100"
              >
                Contact NLETA <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
