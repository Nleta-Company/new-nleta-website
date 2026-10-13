
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how NLETA handles personal information submitted through its website and enquiry forms.",
};

const sections = [
  {
    id: "information",
    title: "1. Information We May Collect",
    content:
      "Depending on the feature you use, the website may request your name, email address, phone number, organization, industry, enquiry details, employment-related information, or certificate reference number. Only information necessary for the relevant purpose should be collected.",
  },
  {
    id: "purpose",
    title: "2. How Information May Be Used",
    content:
      "Information may be used to respond to enquiries, coordinate engineering or training requests, communicate about employment opportunities, support certificate verification, and maintain website security. Any additional use should be disclosed where required.",
  },
  {
    id: "sharing",
    title: "3. Sharing of Information",
    content:
      "Personal information should only be shared with authorized personnel or service providers when necessary for a legitimate operational purpose or where required by applicable law. Candidate information should not be shared with employers without appropriate notice and consent.",
  },
  {
    id: "security",
    title: "4. Data Security",
    content:
      "Appropriate technical and organizational safeguards should be used to protect information against unauthorized access, disclosure, alteration, or loss. No website or electronic transmission can be guaranteed to be completely secure.",
  },
  {
    id: "retention",
    title: "5. Data Retention",
    content:
      "Information should be retained only for as long as necessary for the stated purpose, applicable legal obligations, recordkeeping requirements, or resolution of disputes. Actual retention periods should be defined by NLETA's approved policies.",
  },
  {
    id: "employment",
    title: "6. Employment & Candidate Information",
    content:
      "Candidates should provide accurate information and review the details they share. Candidate profiles, resumes, and contact details should be accessible only to authorized users and shared with prospective employers according to the applicable consent and access rules.",
  },
  {
    id: "cookies",
    title: "7. Cookies & Website Analytics",
    content:
      "The website may use essential technical storage, cookies, or analytics tools if these are implemented. The final policy should identify the tools actually used, their purposes, and the choices available to visitors.",
  },
  {
    id: "external",
    title: "8. External Websites & Portals",
    content:
      "The NLETA website may link to separate dashboard or CRM applications. Those applications may operate under separate privacy notices, security arrangements, and account policies. Review the applicable notice before submitting information through an external service.",
  },
  {
    id: "rights",
    title: "9. Your Choices & Requests",
    content:
      "You may contact NLETA to ask about personal information associated with your enquiry or to request correction or deletion where applicable. Requests will be handled subject to identity verification, applicable law, and legitimate recordkeeping obligations.",
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content:
      "This policy may be updated when website features, data practices, or legal requirements change. The published version should show its effective date and be reviewed periodically.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#102844] text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />

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
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            Information about the personal data that may be
            collected when you interact with NLETA online.
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

            <nav aria-label="Privacy policy sections" className="mt-4 space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-md px-3 py-2 text-sm leading-5 text-slate-600 transition hover:bg-blue-50 hover:text-[#2465a7]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="rounded-2xl border border-[#e1e8f0] bg-white p-6 md:p-10">
            <div className="mb-8 rounded-lg border-l-4 border-[#2465a7] bg-blue-50 p-5">
              <p className="text-sm leading-7 text-slate-700">
                <strong>Important:</strong> This is a draft template,
                not a confirmation of NLETA&apos;s current data
                practices. Before publication, confirm the actual
                data collected, responsible organization, contact
                details, retention periods, third-party services,
                and applicable legal requirements.
              </p>
            </div>

            <p className="body-copy mb-8">
              This draft describes proposed privacy principles for
              the NLETA website. It should be finalized and approved
              by the organization before it is treated as the
              official policy.
            </p>

            <div className="divide-y divide-[#e8edf3]">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 py-7 first:pt-0 last:pb-0"
                >
                  <h2 className="text-xl font-bold text-[#102844]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 md:text-base">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-xl bg-[#f3f6fa] p-5">
              <h2 className="font-bold text-[#102844]">
                Privacy enquiries
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                For privacy-related questions, use the contact
                details officially confirmed by NLETA.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2465a7] hover:underline"
              >
                Contact NLETA
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
