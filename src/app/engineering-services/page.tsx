import Link from "next/link";
import EngineeringScrollEffects from "./EngineeringScrollEffects";
const services = [
  {
    number: "01",
    slug: "pat",
    code: "PAT",
    title: "Partial Acceptance Test / Safety Inspection",
    description:
      "The initial independent safety inspection in the NLETA engineering decision pathway.",
    reference: "TCSP-01 Rev.1 • T-01",
    tag: "SAFETY INSPECTION",
  },
  {
    number: "02",
    slug: "sat",
    code: "SAT",
    title: "Satisfactory Acceptance Test / Quality Inspection",
    description:
      "Independent quality and performance inspection when further engineering evaluation is justified.",
    reference: "TCSP-01 Rev.1 • T-02",
    tag: "QUALITY & PERFORMANCE",
  },
  {
    number: "03",
    slug: "sci",
    code: "SCI",
    title: "Standards Compliance Inspection",
    description:
      "Assessment of applicable standards and engineering compliance within the agreed scope.",
    reference: "TCSP-01 Rev.1 • T-03",
    tag: "STANDARDS COMPLIANCE",
  },
  {
    number: "04",
    slug: "dla",
    code: "DLA",
    title: "Design Life Assessment",
    description:
      "Lifecycle engineering assessment covering ageing, obsolescence, remaining useful life and modernisation considerations.",
    reference: "TCSP-01 Rev.1 • T-04",
    tag: "LIFECYCLE ENGINEERING",
  },
];

const engagementSteps = [
  {
    number: "01",
    title: "Service Selection Proposal",
    description:
      "The customer reviews available services and submits the relevant requirement.",
  },
  {
    number: "02",
    title: "Final Service Offer (FSO)",
    description:
      "Scope and commercial terms are reviewed through the approved process.",
  },
  {
    number: "03",
    title: "PSGA and Service Activation Form (SAF)",
    description:
      "The applicable agreement, onboarding and service activation requirements are completed.",
  },
  {
    number: "04",
    title: "Work Programme and Site Coordination",
    description:
      "The customer and relevant parties coordinate the agreed inspection or testing schedule.",
  },
  {
    number: "05",
    title: "Engineering Assessment and Findings",
    description:
      "The authorised engineering team performs the applicable work and records its findings.",
  },
  {
    number: "06",
    title: "Rectification, Verification and Reporting",
    description:
      "Where required, findings are addressed by the responsible agency and closure is verified under the applicable procedure.",
  },
  {
    number: "07",
    title: "Technical Review and Certificate Process",
    description:
      "Reports and certificates proceed through the applicable technical review, approval and document-control process.",
  },
];

const faqs = [
  {
    question: "Is SAT required for every lift?",
    answer:
      "No. SAT is considered according to the applicable PAT findings and engineering trigger criteria. The final decision follows the approved technical process.",
  },
  {
    question: "Can I request SCI or DLA directly?",
    answer:
      "You may submit your requirement, but the NLETA framework specifies prerequisites for these services. The engineering team must review the applicable records and confirm the permitted next step.",
  },
  {
    question: "Does DGS replace maintenance or inspection?",
    answer:
      "No. DGS supports continuing digital governance. It does not replace maintenance, statutory inspections or the required engineering assessment.",
  },
  {
    question: "Who performs rectification?",
    answer:
      "Rectification remains the responsibility of the appointed OEM/AMC or other responsible maintenance agency. NLETA's role remains within its independent assessment and agreed service scope.",
  },
  {
    question: "Does a report automatically mean a certificate will be issued?",
    answer:
      "No. Certificate issuance is subject to the applicable service outcome, technical review, approval and document-control requirements.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="reveal-on-scroll mb-8 max-w-3xl sm:mb-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#102844] sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      )}

      <span
        aria-hidden="true"
        className="mt-4 inline-flex h-1 w-16 overflow-hidden rounded-full"
      >
        <span className="w-1/3 bg-[#ff9933]" />
        <span className="w-1/3 bg-white" />
        <span className="w-1/3 bg-[#138808]" />
      </span>
    </div>
  );
}

export default function EngineeringServicesPage() {
  return (
    <main className="overflow-hidden">
      <EngineeringScrollEffects />
      {/* HERO SECTION */}
      <section
        className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-[#0b1e34] bg-cover bg-center text-white sm:min-h-[500px] lg:min-h-[calc(100svh-162px)]"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(7,20,38,0.91), rgba(7,20,38,0.79)), url('/images/nleta-engineering-bg.png')",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <div className="container-shell w-full py-22 sm:py-22 lg:py-27">


          <div className="mx-auto max-w-5xl text-center">
            <p className="hero-reveal hero-reveal-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 sm:text-sm">
              Engineering · Safety · Governance
            </p>

            <h1 className="hero-reveal hero-reveal-2 mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Engineering Services.
              <span className="mt-3 block text-2xl leading-tight text-[#8ec5ff] sm:text-3xl lg:text-4xl">
                Independent Assessment.
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline">
                  Responsible Engineering.
                </span>
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-3 mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:text-lg">
              NLETA provides third-party inspection, testing, technical
              auditing, standards compliance assessment, risk analysis and
              lifecycle engineering services for lifts and escalators within
              the applicable technical and regulatory scope.
            </p>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Our structured process supports documented findings, appropriate
              follow-up and informed engineering decisions.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#service-portfolio"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#12a6a0] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0d9488] sm:px-6"
              >
                Explore Our Services <ArrowIcon />
              </a>

              <a
                href="#decision-pathway"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6"
              >
                Engineering Decision Pathway
              </a>

              <Link
                href="/contact?service=Engineering%20Services"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6"
              >
                Submit a Service Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PORTFOLIO */}
      <section
        id="service-portfolio"
        className="scroll-mt-24 bg-[#f3f6fa] py-12 sm:py-16 lg:py-20"
      >
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our engineering service portfolio"
            title="Four Services. One Controlled Engineering Framework."
            description="Explore each service to understand its purpose, applicable prerequisites and potential engineering decision pathway."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.slug}
                style={{ animationDelay: `${index * 100}ms` }}
                className="reveal-on-scroll group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#102844] text-sm font-extrabold text-teal-200">
                    {service.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {service.number}
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-bold tracking-[0.15em] text-[#2465a7]">
                  {service.tag}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7 text-[#102844]">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                  Reference: {service.reference}
                </p>

                <Link
                  href={`/engineering-services/${service.slug}`}
                  className="group/link mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2465a7] hover:text-[#0d9488]"
                >
                  Explore {service.code} <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING DECISION PATHWAY */}
      <section
        id="decision-pathway"
        className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="container-shell">
          <SectionHeading
            eyebrow="Engineering decision pathway"
            title="The Next Step Depends on Engineering Findings."
            description="PAT is the initial service. Further assessment is considered when the approved engineering decision framework supports it. The pathway does not make every subsequent service automatically mandatory."
          />

          <div className="grid gap-5 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="reveal-on-scroll relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="text-xs font-bold tracking-[0.15em] text-[#0d9488]">
                  STEP 0{index + 1} · {service.code}
                </span>

                <h3 className="mt-3 text-lg font-bold text-[#102844]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {index === 0 &&
                    "Initial safety inspection. Findings are reviewed under the approved PAT trigger matrix."}
                  {index === 1 &&
                    "SAT may be recommended where a defined engineering trigger supports further quality or performance assessment."}
                  {index === 2 &&
                    "SCI may be recommended where standards-related findings justify compliance verification."}
                  {index === 3 &&
                    "DLA may be recommended where ageing, obsolescence or lifecycle concerns justify further assessment."}
                </p>

                <Link
                  href={`/engineering-services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2465a7] hover:text-[#0d9488]"
                >
                  View service <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>

          <div className="reveal-on-scroll mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-bold text-[#102844]">
              Important engineering control
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              PAT, SAT, SCI and DLA decisions must follow the approved TCSP-01
              Rev.1 and T-01 through T-04 documents. This visual is an
              introductory explanation; it does not replace the approved
              technical trigger matrix or authorise a service or certificate.
            </p>
          </div>
        </div>
      </section>

      {/* DIGITAL GOVERNANCE SYSTEM */}
      <section className="bg-[#0b1e34] py-12 text-white sm:py-16 lg:py-20">
        <div className="container-shell grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="reveal-on-scroll">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              Continuing digital governance
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              DGS — Digital Governance System
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              DGS supports the recording and review of asset history,
              maintenance information, callback reports, operational
              observations, compliance dates and relevant trends.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              It operates separately from the PAT → SAT → SCI → DLA engineering
              decision chain.
            </p>

            <Link
              href="/contact?service=Digital%20Governance%20System"
              className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#12a6a0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d9488]"
            >
              Discover DGS <ArrowIcon />
            </Link>
          </div>

          <div className="reveal-on-scroll rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-8">
            <h3 className="text-lg font-bold">
              How DGS supports governance
            </h3>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              {[
                "Records relevant asset and engineering history.",
                "Maintains maintenance and callback traceability.",
                "Links related operational observations.",
                "Supports governance reporting and trend visibility.",
                "Helps identify when further engineering review may be appropriate.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-teal-200">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-slate-400">
              DGS does not replace maintenance, statutory inspections or
              engineering judgement. OEM/AMC retains its independent
              responsibility for maintenance diagnosis, priority and
              corrective action.
            </p>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Additional engineering services"
            title="Engineering and Advisory Support"
            description="Subject to the applicable technical scope and engagement requirements, NLETA may provide additional services."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Technical Auditing",
                description:
                  "Structured review of relevant engineering processes, records and practices within the agreed scope.",
              },
              {
                title: "Risk Analysis",
                description:
                  "Assessment and documentation of relevant risks using the applicable technical framework.",
              },
              {
                title: "Engineering Consultancy",
                description:
                  "Engineering observations and advisory inputs within the defined scope of engagement.",
              },
              {
                title: "Lifecycle and Modernization Guidance",
                description:
                  "Engineering inputs relating to ageing, obsolescence, remaining useful life and modernization considerations, where applicable.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="reveal-on-scroll rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <h3 className="text-lg font-bold text-[#102844]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <Link
            href="/contact?service=Engineering%20Services"
            className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#102844] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2465a7]"
          >
            Submit an Engineering Service Enquiry <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* ENGAGEMENT WORKFLOW */}
      <section className="bg-[#f3f6fa] py-12 sm:py-16 lg:py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How to begin a service engagement"
            title="From Service Selection to Technical Review"
            description="This process must connect to the existing CRM and Customer Service Dashboard rather than creating a separate workflow."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engagementSteps.map((step) => (
              <article
                key={step.number}
                className="reveal-on-scroll rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102844] text-sm font-bold text-teal-200">
                  {step.number}
                </span>

                <h3 className="mt-4 text-lg font-bold text-[#102844]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-500">
            Commercial activity and engineering authority remain separate.
            Commercial teams must not control technical findings, trigger
            decisions, engineering reports or certificate approvals.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Customer FAQs"
            title="Common Questions About Engineering Services"
          />

          <div className="max-w-4xl divide-y divide-slate-200">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="reveal-on-scroll py-5"
              >
                <h3 className="text-lg font-bold text-[#102844]">
                  {faq.question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white pb-12 sm:pb-16 lg:pb-20">
        <div className="container-shell">
          <div className="reveal-on-scroll relative overflow-hidden rounded-[28px] bg-[#0b1e34] px-6 py-8 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_15%,rgba(18,166,160,0.22),transparent_35%),radial-gradient(ellipse_at_5%_100%,rgba(36,101,167,0.3),transparent_42%)]"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                Connect with NLETA
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Need Guidance on the Appropriate Engineering Service?
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Every asset has its own operating history, technical condition
                and assessment requirements. Submit your requirement through
                NLETA&apos;s designated service-selection process.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact?service=Engineering%20Services"
                  className="inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#12a6a0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d9488]"
                >
                  Submit a Service Enquiry <ArrowIcon />
                </Link>

                <a
                  href="#decision-pathway"
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Understand PAT, SAT, SCI &amp; DLA
                </a>

                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Customer Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}