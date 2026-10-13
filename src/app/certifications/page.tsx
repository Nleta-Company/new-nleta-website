
import Link from "next/link";

const credentialSections = [
  {
    number: "01",
    title: "Organizational Credentials",
    description:
      "A dedicated area for verified organizational registrations, credentials and supporting documents approved for publication.",
    details: [
      "Credential or registration name",
      "Issuing organization",
      "Reference number, where appropriate",
      "Validity or review date, where applicable",
    ],
  },
  {
    number: "02",
    title: "Authorizations & Scope",
    description:
      "Information about applicable approvals and the specific activities, equipment categories or locations covered by them.",
    details: [
      "Authorized activity and scope",
      "Applicable equipment category",
      "Geographical or operational limitations",
      "Conditions and validity, where applicable",
    ],
  },
  {
    number: "03",
    title: "Standards & Technical References",
    description:
      "A structured index of relevant standards, regulations and official technical references, with source and edition details.",
    details: [
      "Official title and reference number",
      "Issuing body or official source",
      "Edition or publication date",
      "Applicability notes and source link",
    ],
  },
];

const governanceItems = [
  {
    title: "Verified before publication",
    description:
      "Credential details should be checked against the issuing authority or an appropriate official source.",
  },
  {
    title: "Clear validity information",
    description:
      "Where applicable, display the validity period, scope limitations and current verification status.",
  },
  {
    title: "Controlled document access",
    description:
      "Sensitive supporting documents should be restricted to authorized users rather than exposed through public URLs.",
  },
];

export default function CertificationsPage() {
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
            Certifications & Standards
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Credentials, standards and scope—clearly documented.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            A central place for verified organizational credentials,
            applicable authorizations and trusted technical references.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="#credentials" className="button-primary">
              Explore Credentials <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/certificate-verification"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Verify a Certificate
            </Link>
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-400">
            This page is a framework for verified information. No particular
            certification, accreditation, government approval or inspection
            authorization is claimed by this template.
          </p>
        </div>
      </section>

      <section id="credentials" className="section-padding bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Credential directory</p>
            <h2 className="section-title mt-4">
              The information stakeholders need to verify.
            </h2>
            <p className="body-copy mt-5">
              Organize supporting information so customers and partners can
              understand what a credential covers, who issued it and whether
              it applies to the service being discussed.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {credentialSections.map((section) => (
              <article
                key={section.number}
                className="flex h-full flex-col rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50 md:p-7"
              >
                <span className="text-sm font-bold tracking-widest text-[#2465a7]">
                  SECTION {section.number}
                </span>

                <h3 className="mt-6 text-xl font-bold text-[#102844]">
                  {section.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {section.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-[#e1e8f0] pt-5">
                  {section.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 font-bold text-[#12a6a0]"
                      >
                        ✓
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Standards reference library</p>
              <h2 className="section-title mt-4">
                Make technical references easier to understand.
              </h2>
              <p className="body-copy mt-5">
                Standards and regulations should be presented with their
                official sources, applicable editions and appropriate context.
                A reference listing alone does not establish certification
                or authorization.
              </p>

              <Link
                href="/knowledge-centre"
                className="button-primary mt-8"
              >
                Open Knowledge Centre <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e1e8f0] bg-white p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5fc] text-xl text-[#2465a7]">
                  <span aria-hidden="true">§</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#102844]">
                    Recommended reference fields
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    For each standards entry
                  </p>
                </div>
              </div>

              <ul className="mt-7 space-y-4">
                {[
                  "Official standard or regulation title",
                  "Reference number and edition",
                  "Issuing body and official source",
                  "Relevant equipment or activity",
                  "Applicability and limitations",
                  "Last review date",
                ].map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8f8f5] text-xs font-bold text-[#07877f]">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Trust & governance</p>
            <h2 className="section-title mt-4">
              A responsible approach to published credentials.
            </h2>
            <p className="body-copy mt-5">
              Clear ownership and verification processes help prevent outdated
              documents, misleading claims and inappropriate disclosure of
              restricted information.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {governanceItems.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e1e8f0] p-6 md:p-7"
              >
                <span className="text-sm font-bold tracking-widest text-[#12a6a0]">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#102844]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
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
                  Need clarification?
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Ask us about a credential or technical reference.
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  Contact NLETA to discuss the relevant documentation,
                  applicability or verification process.
                </p>
              </div>

              <Link
                href="/contact?interest=credentials"
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
