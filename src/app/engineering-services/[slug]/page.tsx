
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

type Service = {
  number: string;
  title: string;
  expansion: string;
  tag: string;
  reference: string;
  intro: string;
  overview: string;
  prerequisite: string;
  areas: { title: string; body: string }[];
  information: string[];
  pathway: string;
  faqs: { q: string; a: string }[];
};

const services = {
  pat: {
    number: "01",
    title: "PAT",
    expansion: "Partial Acceptance Test",
    tag: "PARTIAL ACCEPTANCE INSPECTION",
    reference: "TCSP-01 Rev.1 • T-01",
    intro:
      "A structured inspection and verification process used to assess the conformity, operational readiness and applicable safety requirements of a Assets system or its specified components at a particular project stage.",
    overview:
      "PAT verifies completed work within the defined inspection scope, reviews applicable safety and technical requirements, documents deficiencies and records whether the inspected scope meets the prescribed criteria for partial acceptance. Findings are recorded with clear remarks and supporting evidence to maintain transparency, accountability and traceability.",
    prerequisite:
      "The PAT scope is determined by the project requirements, Assets specifications, approved checklist and stage of installation or testing. The outcome must reflect the actual findings and approved acceptance criteria. Partial acceptance applies only to the scope assessed and does not, by itself, authorise operation of the entire Assets unless applicable approval and regulatory requirements permit it.",
    areas: [
      {
        title: "Assets identification and installation",
        body: "Verify the Assets Information, location, asset details, available technical documents and the components included in the approved scope. Examine accessible equipment and installation elements for visible damage, incomplete work or discrepancies requiring clarification.",
      },
      {
        title: "Safety and operational checks",
        body: "Examine applicable safety components and protective arrangements. Where included in the approved PAT scope, perform prescribed operational checks and record results, abnormal responses or checks that could not be completed.",
      },
      {
        title: "Defects, evidence and corrective action",
        body: "Record each deficiency with its category, description, component or location, remarks, priority where defined, required corrective action and supporting photographs or documents. Track verification and reinspection status as applicable.",
      },
    ],
    information: [
      "Assets Information, site location and inspection reference",
      "Approved PAT checklist, Assets specifications and available technical records",
      "Inspection findings, failure category, detailed description and Inspector remarks",
      "Supporting photographs, attachments, inspection date/time and Inspector identification",
      "Corrective-action, review, approval and reinspection details where applicable",
    ],
    pathway:
      "PAT is Stage 1 in the defined sequential workflow: PAT → SAT → SCI. The Inspector completes the prescribed checklist, records findings and evidence, and submits the result for review. SAT remains locked until PAT has met its completion and required approval conditions. If deficiencies prevent acceptance, the workflow stays at PAT until corrective actions and verification are completed. The approved NLETA procedure determines the exact activation and acceptance rules.",
    faqs: [
      {
        q: "What does PAT assess?",
        a: "PAT assesses the completed work, applicable safety-related conditions, accessible equipment and installation elements, relevant operational checks where included, available documentation and deficiencies within the confirmed inspection scope.",
      },
      {
        q: "What information should be recorded when a failure is found?",
        a: "Record the Assets and inspection references, failure status and category, observed condition, component or location, Inspector remarks, supporting evidence, date/time and required corrective action. Add review and verification status as applicable.",
      },
      {
        q: "What PAT statuses may be recorded?",
        a: "Depending on the approved workflow, statuses may include In Progress, Pending Review, Passed, Failed or Correction Required. The recorded outcome must reflect the actual findings and approved acceptance criteria.",
      },
      {
        q: "Does passing PAT mean the entire Assets is approved for operation?",
        a: "No. PAT applies only to the scope inspected. It must not be treated as unconditional acceptance of the whole Assets system or authorisation to operate unless the applicable approvals and regulatory requirements permit it.",
      },
      {
        q: "What happens after PAT?",
        a: "The submitted PAT record is reviewed under the applicable procedure. If the required acceptance and approval conditions are met, the next stage may become available according to the defined PAT → SAT → SCI workflow. If a deficiency prevents acceptance, corrective action and verification are required before progression.",
      },
    ],
  },

  sat: {
    number: "02",
    title: "SAT",
    expansion: "Satisfactory Acceptance Test / Quality Inspection",
    tag: "QUALITY INSPECTION",
    reference: "TCSP-01 Rev.1 • T-02",
    intro:
      "A further independent quality and performance inspection when justified by the applicable assessment findings and requirements.",
    overview:
      "SAT may address functional and performance assessment, relevant load testing or measurements, verification of pending PAT observations, and applicable safety or operational tests. The actual activities depend on the agreed scope and available evidence.",
    prerequisite:
      "PAT is a prerequisite for SAT. SAT is not automatically required for every lift. Its applicability depends on the findings and the approved triggers in the relevant technical documents.",
    areas: [
      {
        title: "Functional and performance assessment",
        body: "Review applicable functional and performance aspects of the equipment within the agreed scope.",
      },
      {
        title: "Verification and testing",
        body: "Assess relevant pending PAT observations and applicable safety or operational tests, measurements or load testing where included in scope.",
      },
      {
        title: "Quality findings",
        body: "Document findings and follow-up requirements. SCI or DLA may be recommended where the applicable findings justify further review.",
      },
    ],
    information: [
      "PAT findings and relevant inspection records",
      "Equipment identification and site details",
      "Available test results and technical documentation",
      "Details of outstanding observations or rectification",
    ],
    pathway:
      "SAT follows PAT where justified. Standards deviations may lead to consideration of SCI; ageing or lifecycle concerns may lead to consideration of DLA, subject to the approved requirements.",
    faqs: [
      {
        q: "Is SAT required for every lift?",
        a: "No. SAT is not automatically required for every lift. Its applicability depends on PAT findings and the relevant approved triggers.",
      },
      {
        q: "Can SAT be requested directly?",
        a: "A customer may submit an enquiry, but the PAT prerequisite and applicable engineering review must be considered before SAT can be approved for activation.",
      },
      {
        q: "What if standards deviations are identified?",
        a: "SCI may be recommended where the applicable findings justify a standards compliance assessment under the relevant approved requirements.",
      },
    ],
  },

  sci: {
    number: "03",
    title: "SCI",
    expansion: "Standards Compliance Inspection",
    tag: "COMPLIANCE ASSESSMENT",
    reference: "TCSP-01 Rev.1 • T-03",
    intro:
      "An independent assessment of applicable standards and engineering compliance within the agreed scope and relevant jurisdiction.",
    overview:
      "SCI may consider applicable requirements, installation and engineering conditions, relevant safety or electrical protections, available documentation and identified deviations. The assessment depends on the equipment, jurisdiction, applicable requirements and agreed scope.",
    prerequisite:
      "PAT and SAT are prerequisites for SCI under the defined pathway. The assessment must not be presented as universal compliance beyond its confirmed scope or applicable requirements.",
    areas: [
      {
        title: "Applicable requirements",
        body: "Identify the relevant standards, codes, rules and technical requirements for the equipment and jurisdiction.",
      },
      {
        title: "Engineering conditions",
        body: "Review relevant installation conditions, engineering aspects, safety or electrical protections and available records within the agreed scope.",
      },
      {
        title: "Compliance findings",
        body: "Record identified deviations and findings. DLA may be recommended if the applicable evidence raises lifecycle concerns.",
      },
    ],
    information: [
      "PAT and SAT records",
      "Equipment and installation details",
      "Available drawings, technical records and prior reports",
      "Site jurisdiction and known compliance concerns",
    ],
    pathway:
      "SCI follows PAT and SAT under the defined pathway. Where lifecycle concerns are identified, DLA may be considered in accordance with the approved requirements.",
    faqs: [
      {
        q: "Can SCI confirm compliance with every standard?",
        a: "No. The assessment is limited to the applicable requirements, jurisdiction, agreed scope and available evidence. It must not be represented as universal compliance.",
      },
      {
        q: "Can I request SCI directly?",
        a: "An enquiry can be submitted, but the PAT and SAT prerequisites and applicable engineering review must be considered before approval for activation.",
      },
      {
        q: "What happens if lifecycle concerns are found?",
        a: "DLA may be recommended where the applicable findings justify a lifecycle engineering assessment.",
      },
    ],
  },

  dla: {
    number: "04",
    title: "DLA",
    expansion: "Design Life Assessment",
    tag: "LIFECYCLE ENGINEERING",
    reference: "TCSP-01 Rev.1 • T-04",
    intro:
      "A lifecycle engineering assessment to support decisions about ageing equipment, obsolescence, remaining useful life and modernization options.",
    overview:
      "DLA considers relevant equipment age and condition, available technical evidence, ageing or obsolete components, repeated failures, and possible modernization needs. The assessment and conclusions depend on the agreed scope and the quality of available information.",
    prerequisite:
      "PAT, SAT and SCI are prerequisites for DLA under the defined engineering pathway. Equipment age alone does not determine replacement; conclusions must be supported by the relevant assessment evidence.",
    areas: [
      {
        title: "Ageing and obsolescence",
        body: "Review relevant ageing concerns, critical components and available information about component support or obsolescence.",
      },
      {
        title: "Lifecycle evidence",
        body: "Consider available condition information, repeated failure history and relevant engineering records within the agreed scope.",
      },
      {
        title: "Planning and modernization",
        body: "Support consideration of remaining useful life and modernization options based on the assessment scope and evidence.",
      },
    ],
    information: [
      "PAT, SAT and SCI records",
      "Equipment age, type and technical details",
      "Relevant maintenance and failure history",
      "Available component and modernization information",
    ],
    pathway:
      "DLA is considered when applicable lifecycle concerns justify it. The findings can support planning, but replacement should not be decided solely on equipment age.",
    faqs: [
      {
        q: "Does equipment age alone mean it must be replaced?",
        a: "No. Replacement should not be decided solely by age. The assessment depends on relevant engineering evidence, equipment condition and the agreed scope.",
      },
      {
        q: "What does DLA evaluate?",
        a: "Depending on the scope and evidence, DLA may consider ageing, obsolescence, repeated failures, remaining useful life and modernization options.",
      },
      {
        q: "Can DLA be activated without the earlier assessments?",
        a: "Under the defined pathway, PAT, SAT and SCI are prerequisites. Any request is subject to the applicable engineering review and approved requirements.",
      },
    ],
  },
} satisfies Record<string, Service>;

type ServiceSlug = keyof typeof services;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];

  if (!service) {
    return { title: "Service Not Found | NLETA" };
  }

  return {
    title: `${service.title} — ${service.expansion} | NLETA`,
    description: service.intro,
  };
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#0d9488]"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];

  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-[#0b1e34] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,24,43,0.96) 0%, rgba(7,24,43,0.89) 55%, rgba(7,24,43,0.76) 100%), url('/images/nleta-engineering-bg.png')",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl"
        />

        <div className="container-shell relative py-14 sm:py-20 lg:py-25">
        

          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-[3px] w-16 overflow-hidden rounded-full"
              >
                <span className="w-1/3 bg-[#ff9933]" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-[#138808]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-200 sm:text-xs">
                {service.tag} · NLETA ENGINEERING
              </span>
            </div>

            <p className="text-sm font-semibold tracking-[0.18em] text-slate-300">
              SERVICE {service.number} · {service.reference}
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              {service.title}
              <span className="mt-3 block text-2xl font-semibold leading-tight tracking-tight text-[#8ec5ff] sm:text-3xl lg:text-4xl">
                {service.expansion}
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {service.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-950/30 transition hover:-translate-y-0.5 hover:from-[#0f766e] hover:to-[#0d9488]"
              >
                Enquire about this service <ArrowIcon />
              </Link>

              <Link
                href="/engineering-services"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                All engineering services
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"
        />
      </section>

      {/* Overview */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
              Service overview
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#102844] sm:text-4xl">
              Independent assessment. Evidence-based decisions.
            </h2>
          </div>

          <div className="text-sm leading-8 text-slate-600 sm:text-base">
            <p>{service.overview}</p>
            <p className="mt-5 rounded-xl border border-teal-100 bg-[#f0fbf9] p-4 text-sm leading-7 text-slate-700">
              {service.reference}. The applicable scope, requirements,
              engineering authority and deliverables must be confirmed before
              engagement. Approved technical documents remain authoritative.
            </p>
          </div>
        </div>
      </section>

      {/* Scope areas */}
      <section className="bg-[#f3f6fa] py-14 sm:py-20 lg:py-24">
        <div className="container-shell">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
              Potential scope areas
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#102844] sm:text-4xl">
              What the assessment may cover
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              The exact activities depend on the applicable requirements,
              available evidence and confirmed engagement scope.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {service.areas.map((area, index) => (
              <article
                key={area.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-[#0d9488]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#102844]">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {area.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisite and pathway */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="container-shell grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
              Prerequisites and scope
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#102844] sm:text-3xl">
              Before this service proceeds
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600">
              {service.prerequisite}
            </p>
          </div>

          <div className="rounded-2xl bg-[#0b1e34] p-6 text-white sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              Engineering pathway
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              The next step depends on findings
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-300">
              {service.pathway}
            </p>
            <Link
              href="/engineering-services"
              className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-teal-200 transition hover:text-white"
            >
              View all engineering services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Information checklist and FAQs */}
      <section className="bg-[#f3f6fa] py-14 sm:py-20 lg:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
              Prepare for an enquiry
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#102844] sm:text-4xl">
              Information that can help
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Sharing relevant details can help the team understand your
              request and discuss suitable next steps.
            </p>

            <ul className="mt-6 space-y-4">
              {service.information.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                >
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-semibold text-white transition hover:from-[#0f766e] hover:to-[#0d9488]"
            >
              Start an enquiry <ArrowIcon />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2465a7]">
              Frequently asked questions
            </span>
            <div className="mt-5 divide-y divide-slate-200">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="font-semibold leading-6 text-[#102844]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DGS separation note */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="container-shell">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">
              Separate continuing service
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#102844] sm:text-3xl">
              DGS — Digital Governance System
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-600 sm:text-base">
              DGS supports asset and engineering history, maintenance and
              callback traceability, operational observations, governance
              reporting and trends. It is a separate continuing service—not
              the next stage after DLA—and does not replace maintenance,
              statutory inspections or professional engineering judgement.
              The OEM, AMC or responsible maintenance agency retains
              responsibility for maintenance diagnosis, prioritisation and
              corrective action.
            </p>
            <Link
              href="/contact?service=DGS"
              className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#0d9488] transition hover:text-[#0b1e34]"
            >
              Enquire about digital governance <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0b1e34] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_15%,rgba(18,166,160,0.22),transparent_35%),radial-gradient(ellipse_at_5%_100%,rgba(36,101,167,0.30),transparent_42%)]"
            />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                  Discuss your requirements
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Let&apos;s discuss {service.title} requirements.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Share your requirements so the applicable scope, prerequisites
                  and next steps can be reviewed before engagement.
                </p>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-semibold text-white transition hover:from-[#0f766e] hover:to-[#0d9488]"
              >
                Contact NLETA <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
