
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using the NLETA website and its online services.",
};

const terms = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using this website, you agree to comply with these terms and any applicable laws. If you do not agree, please discontinue use of the website. Additional terms may apply to specific services or applications.",
  },
  {
    id: "website",
    title: "2. Website Information",
    content:
      "Website content is provided for general informational purposes. Service descriptions, technical resources, standards references, and other materials should be reviewed in their relevant context. Contact NLETA to confirm the availability, applicability, and scope of a specific service.",
  },
  {
    id: "services",
    title: "3. Engineering Services and Scope",
    content:
      "Information published on this website does not, by itself, establish that NLETA is authorized or accredited to perform every inspection, test, certification, or engineering activity. Applicable authorization, competence, contractual scope, and legal requirements must be confirmed before relying on any service.",
  },
  {
    id: "enquiries",
    title: "4. Enquiries and Communications",
    content:
      "Submitting an enquiry does not automatically create a contract, service engagement, or obligation to provide a service. Enquiries are subject to review, availability, and any required formal agreement. Users should provide accurate information and avoid submitting passwords, payment credentials, or unnecessary sensitive information.",
  },
  {
    id: "employment",
    title: "5. Employment and Employer Connect",
    content:
      "Employment-related features may support employer registration, vacancy submissions, candidate profiles, eligibility review, and interview coordination. Users must provide accurate information and have the right to submit any information they provide. Listing a vacancy or participating in the platform does not guarantee an interview, selection, hiring, or placement.",
  },
  {
    id: "verification",
    title: "6. Certificates and Verification",
    content:
      "Certificate verification features must be used only for legitimate purposes. A result is subject to the records and verification process actually available through the relevant system. Do not alter, misuse, or misrepresent a certificate or verification result. If a result cannot be verified online, contact the responsible organization for clarification.",
  },
  {
    id: "accounts",
    title: "7. Accounts and External Portals",
    content:
      "Some links may lead to separate dashboard, CRM, or third-party applications. Access to those systems may require separate credentials and additional terms. Users are responsible for protecting their credentials and notifying the relevant administrator of suspected unauthorized access. These website terms do not replace the terms governing a separate application.",
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    content:
      "Unless otherwise stated, website text, visual designs, logos, and other materials may be protected by intellectual property laws. You may not reproduce, distribute, modify, or commercially use protected material without appropriate permission, except where permitted by law. Third-party marks and materials remain subject to their respective rights.",
  },
  {
    id: "conduct",
    title: "9. Acceptable Use",
    content:
      "You must not use this website to violate the law, submit knowingly false information, attempt unauthorized access, interfere with website operations, distribute malicious code, or misuse another person's information. Access may be restricted where reasonably necessary to protect the website, its users, and its systems.",
  },
  {
    id: "accuracy",
    title: "10. Accuracy and Availability",
    content:
      "Reasonable efforts may be made to maintain accurate and current information, but errors, omissions, service interruptions, or outdated material may occur. Technical information should not be treated as a substitute for a required professional assessment, applicable standard, or formal approval.",
  },
  {
    id: "liability",
    title: "11. Limitations",
    content:
      "To the extent permitted by applicable law, the website is provided subject to its availability and without a guarantee that every feature will be uninterrupted or error-free. Nothing in these terms excludes or limits a liability that cannot lawfully be excluded or limited.",
  },
  {
    id: "privacy",
    title: "12. Privacy",
    content:
      "Personal information submitted through the website should be handled according to the applicable privacy notice and legal requirements. Please review the Privacy Policy to understand the relevant data practices. Separate systems may have their own privacy notices.",
  },
  {
    id: "changes",
    title: "13. Changes to These Terms",
    content:
      "These terms may be revised when website features, operational practices, or legal requirements change. The published version should include a confirmed effective date. Continued use after a revision takes effect may be subject to the updated terms, as permitted by law.",
  },
  {
    id: "law",
    title: "14. Governing Law and Contact",
    content:
      "The governing law, jurisdiction, and dispute-resolution arrangements must be confirmed by NLETA and reviewed for the organization's circumstances before publication. For questions about these terms, contact NLETA through its official contact channels.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#102844] text-white">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />

        <div className="container-shell relative py-20 md:py-24">
          <div className="mb-6 flex h-1 w-24 overflow-hidden rounded-full">
            <span className="w-1/3 bg-[#ff9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Website Policies
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Guidelines for accessing and using the NLETA website,
            online information, and related digital services.
          </p>

          <p className="mt-5 text-sm text-blue-200">
            Draft for review · Effective date to be confirmed
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-xl border border-[#e1e8f0] bg-white p-5 lg:sticky lg:top-28">
            <h2 className="font-bold text-[#102844]">
              On this page
            </h2>

            <nav aria-label="Terms sections" className="mt-4 space-y-1">
              {terms.map((term) => (
                <a
                  key={term.id}
                  href={`#${term.id}`}
                  className="block rounded-md px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-blue-50 hover:text-[#2465a7]"
                >
                  {term.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="rounded-2xl border border-[#e1e8f0] bg-white p-6 md:p-10">
            <div className="mb-8 rounded-lg border-l-4 border-[#2465a7] bg-blue-50 p-5">
              <p className="text-sm leading-7 text-slate-700">
                <strong>Important:</strong> This is a draft
                template. NLETA should review and approve the
                content, confirm its legal entity details, and
                obtain appropriate legal review before publication.
              </p>
            </div>

            <p className="body-copy mb-8">
              These draft terms describe proposed conditions for
              using the NLETA website. Any signed contract, service
              agreement, or separate platform terms may contain
              additional provisions.
            </p>

            <div className="divide-y divide-[#e8edf3]">
              {terms.map((term) => (
                <section
                  key={term.id}
                  id={term.id}
                  className="scroll-mt-28 py-7 first:pt-0 last:pb-0"
                >
                  <h2 className="text-xl font-bold text-[#102844]">
                    {term.title}
                  </h2>

                  <p className="mt-3 text-sm leading-8 text-slate-600 md:text-base">
                    {term.content}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-xl bg-[#f3f6fa] p-5">
              <h2 className="font-bold text-[#102844]">
                Questions about these terms?
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                Contact NLETA for clarification about website
                access or its published services.
              </p>

              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2465a7] hover:underline"
              >
                Contact NLETA
                <span aria-hidden="true">→</span>
              </a>

              <p className="mt-5 text-xs text-slate-400">
                Also read our{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-[#2465a7] hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
