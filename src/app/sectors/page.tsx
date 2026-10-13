
"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

const enquiryTypes = [
  "Engineering Assessment",
  "Safety Training",
  "Corporate Training",
  "QRT & DGS",
  "Employer Connect",
  "Other",
];

type Sector = {
  number: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  services: string[];
  note: string;
  enquiryType: string;
};

const sectors: Sector[] = [
  {
    number: "01",
    title: "Residential Welfare Associations (RWAs) & Housing Societies",
    category: "RESIDENTIAL COMMUNITIES",
    icon: "🏢",
    description:
      "We support apartment associations, facility management teams and resident welfare bodies in strengthening lift-safety awareness and governance.",
    services: [
      "Independent lift-safety inspection and engineering assessment within the agreed scope",
      "Technical review of available inspection and maintenance records",
      "QRT awareness, role definition and training, where applicable",
      "Resident awareness programmes and local-language safety signage",
      "AMC accountability support through documented observations and follow-up tracking",
      "Safety reporting, escalation procedures and emergency-readiness awareness",
    ],
    note:
      "QRT and DGS services require confirmation of project-level operational control, reporting channels and governance responsibilities.",
    enquiryType: "Engineering Assessment",
  },
  {
    number: "02",
    title: "Government Departments & Public-Sector Organisations",
    category: "PUBLIC INFRASTRUCTURE",
    icon: "🏛️",
    description:
      "NLETA can support eligible government departments and public-sector organisations with structured engineering assessment, safety awareness and documentation systems.",
    services: [
      "Lift and escalator engineering inspection and assessment, where authorised and within scope",
      "Technical audit and risk-assessment support",
      "Safety and operational awareness programmes",
      "Documentation and record-management frameworks",
      "QRT readiness and escalation-process training, where applicable",
      "Digital governance and compliance-status tracking, where applicable",
      "Workforce competency and refresher training",
    ],
    note:
      "All engagements remain subject to applicable procurement, statutory, technical and departmental requirements.",
    enquiryType: "Engineering Assessment",
  },
  {
    number: "03",
    title: "MRTS, Railway Stations & Public Transport Infrastructure",
    category: "TRANSPORTATION",
    icon: "🚇",
    description:
      "Public transport environments require coordinated safety awareness, operational discipline and planned maintenance access.",
    services: [
      "Lift and escalator engineering assessment, subject to applicable authority and scope",
      "User-behaviour and public-safety awareness",
      "QRT role and emergency-response coordination training",
      "Operational observation and escalation-record systems",
      "Digital asset history and governance tracking, where approved",
      "Frontline staff and supervisor training",
      "Maintenance-window coordination without compromising safety procedures",
    ],
    note:
      "NLETA supports safety governance and competency; it does not replace the operator, OEM, authorised maintenance agency or statutory authority.",
    enquiryType: "Engineering Assessment",
  },
  {
    number: "04",
    title: "Commercial Buildings, Malls, Hotels & Institutional Facilities",
    category: "COMMERCIAL & INSTITUTIONAL",
    icon: "🏙️",
    description:
      "We support facility owners and management teams in improving safety awareness, documentation, operational readiness and contractor coordination.",
    services: [
      "Lift and escalator safety assessment within the agreed scope",
      "Technical risk review and engineering consultancy",
      "QRT and facility-team training, where applicable",
      "User-awareness campaigns and safety signage",
      "Complaint and callback tracking through suitable governance arrangements",
      "Fire-safety awareness and emergency-response training through qualified arrangements",
      "First-aid awareness and training through appropriately qualified arrangements",
      "Frontline manager and facility-supervisor development",
    ],
    note:
      "Training delivery and any certification depend on course-specific eligibility, trainer qualifications and applicable authorisation.",
    enquiryType: "Engineering Assessment",
  },
  {
    number: "05",
    title: "Industrial Plants, Factories & Warehouses",
    category: "INDUSTRIAL OPERATIONS",
    icon: "🏭",
    description:
      "NLETA can support industrial organisations with relevant vertical-transportation assessments, safety training and workforce development.",
    services: [
      "Assessment of applicable lifts, escalators and covered lifting equipment within verified competence and agreed scope",
      "Working-at-height safety training",
      "Workplace safety and hazard-awareness programmes",
      "Fire-safety and first-aid training through suitable qualified providers",
      "Safe-driving and two-wheeler safety awareness",
      "Supervisor, frontline manager and contractor-safety training",
      "Digital records and governance support for applicable equipment and processes",
    ],
    note:
      "Equipment-specific work will be undertaken only where it falls within NLETA's verified technical competence and service scope.",
    enquiryType: "Engineering Assessment",
  },
  {
    number: "06",
    title: "Corporate Organisations & Multi-Site Enterprises",
    category: "CORPORATE",
    icon: "🏢",
    description:
      "For organisations operating across multiple buildings, branches or facilities, NLETA can support standardised safety governance and competency development.",
    services: [
      "Corporate safety-awareness programmes",
      "Frontline manager and supervisor training",
      "Refresher training and safety-culture development",
      "User behaviour and emergency-readiness awareness",
      "QRT framework development and training, where relevant",
      "Digital governance and record-management support",
      "Training coordination across multiple sites",
      "Competency-development plans aligned with workforce needs",
    ],
    note:
      "Programme scope depends on identified workforce needs, site conditions, applicable requirements and agreed responsibilities.",
    enquiryType: "Corporate Training",
  },
  {
    number: "07",
    title: "Training & Workforce Competency Development",
    category: "TRAINING",
    icon: "🎓",
    description:
      "NLETA offers or coordinates relevant training programmes according to course scope, trainer competence and applicable authorisation.",
    services: [
      "Lift and escalator user-safety awareness",
      "Workplace and occupational safety awareness",
      "Fire-safety awareness",
      "First-aid training",
      "Safe driving and two-wheeler safety",
      "Working-at-height safety",
      "QRT and facility-team training",
      "Frontline manager and supervisor development",
      "Soft skills, communication and professional discipline",
      "Eligible technical training and Skill India pathways, subject to programme requirements",
    ],
    note:
      "Certification is not guaranteed. Course eligibility, trainer qualifications and applicable authorisation must be verified before making certification claims.",
    enquiryType: "Safety Training",
  },
  {
    number: "08",
    title: "Employer Connect & Local Workforce Development",
    category: "EMPLOYER CONNECT",
    icon: "🤝",
    description:
      "NLETA's Employer Connect initiative can help employers communicate workforce requirements and identify potentially suitable candidates from relevant training batches.",
    services: [
      "Local-area hiring requirements",
      "Required technical skills and experience",
      "Job roles and competency expectations",
      "Shift, site and operational requirements",
      "Coordination around relevant workforce and training needs",
    ],
    note:
      "Candidate selection remains subject to eligibility, availability, employer assessment and applicable programme requirements. Employment is not guaranteed.",
    enquiryType: "Employer Connect",
  },
  {
    number: "09",
    title: "Digital Safety Governance System (DGS)",
    category: "DIGITAL GOVERNANCE",
    icon: "🗂️",
    description:
      "Where an organisation has the necessary authority, reporting arrangements and operational controls, DGS can support structured governance.",
    services: [
      "Asset records and equipment history",
      "Complaint and callback traceability",
      "Maintenance-status and follow-up records",
      "Operational observations and escalation history",
      "Compliance and review-date tracking",
      "Governance dashboards and lifecycle information",
    ],
    note:
      "DGS complements—not replaces—technical inspection, statutory requirements, OEM/AMC responsibilities or competent engineering judgement. Project-level authority must be confirmed.",
    enquiryType: "QRT & DGS",
  },
];

const engagementSteps = [
  {
    number: "01",
    title: "Share your requirement",
    description:
      "Choose your sector and describe the facility, workforce or governance requirement.",
  },
  {
    number: "02",
    title: "Scope review",
    description:
      "NLETA reviews the request against applicable requirements, verified competence and the proposed service scope.",
  },
  {
    number: "03",
    title: "Agree next steps",
    description:
      "Where suitable, the enquiry proceeds through the existing NLETA CRM and applicable engagement workflow.",
  },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2465a7] focus:ring-4 focus:ring-blue-100";

type EnquiryForm = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  enquiryType: string;
  sector: string;
  message: string;
  consent: boolean;
};

const initialForm: EnquiryForm = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  enquiryType: "",
  sector: "",
  message: "",
  consent: false,
};

export default function SectorsPage() {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof EnquiryForm,
    value: string | boolean,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setErrorMessage("");
  }

  function selectSector(sector: Sector) {
    setForm((current) => ({
      ...current,
      sector: sector.title,
      enquiryType: sector.enquiryType,
    }));

    setErrorMessage("");

    document
      .getElementById("sector-enquiry")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        "The enquiry service is not configured. Please try again later or contact NLETA.",
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

      setForm(initialForm);
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
    <main className="overflow-hidden">
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden bg-[#0b1e34] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(7,24,43,0.97) 0%, rgba(7,24,43,0.91) 56%, rgba(7,24,43,0.78) 100%), url('/images/nleta-sectors-bg.png')",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"
        />

        <div className="container-shell relative py-16 sm:py-14 lg:py-15">
         

          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="h-1 w-8 rounded-full bg-[#ff9933]" />
              <span className="h-1 w-8 rounded-full bg-white" />
              <span className="h-1 w-8 rounded-full bg-[#138808]" />
              <span className="ml-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Engineering · Safety · Governance
              </span>
              <span className="h-1 w-8 rounded-full bg-[#ff9933]" />
              <span className="h-1 w-8 rounded-full bg-white" />
              <span className="h-1 w-8 rounded-full bg-[#138808]" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
              Services for Other Sectors
            </p>


            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Building Safer Operations Through
              <span className="mt-2 block bg-gradient-to-r from-sky-200 via-blue-300 to-teal-200 bg-clip-text text-transparent">
                Engineering, Safety Training &amp; Digital Governance
              </span>
            </h1>


            <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-slate-200 sm:text-lg">
              NLETA delivers independent engineering, safety training, workforce development and digital governance across residential, commercial, industrial and public-sector environments.
            </p>


            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-blue-100/80">
              Our services promote safety, accountability and operational excellence within applicable standards and requirements.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#sector-list" className="button-primary">
                Explore Sectors ↓
              </a>

              <a href="#sector-enquiry" className="button-secondary">
                Discuss Your Requirement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-shell grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <span className="eyebrow">Explore by sector</span>

            <h2 className="section-title mt-4">
              One safety-focused approach. Different operational needs.
            </h2>
          </div>

          <p className="body-copy max-w-2xl">
            Explore the service areas relevant to your organisation.
            Detailed PAT, SAT, SCI and DLA technical information remains
            on the Engineering Services page. This page provides a
            sector-level introduction and enquiry pathway.
          </p>
        </div>
      </section>

      {/* SECTOR CARDS */}
      <section
        id="sector-list"
        className="scroll-mt-24 bg-[#f3f6fa] py-14 sm:py-20"
      >
        <div className="container-shell">
          <div className="mb-9 max-w-3xl">
            <span className="eyebrow">Sector service coverage</span>

            <h2 className="section-title mt-4">
              Support tailored to the environment and agreed scope.
            </h2>

            <p className="body-copy mt-4">
              Each card outlines potential service areas, not an automatic
              service commitment. Scope, competence, authority and
              availability must be reviewed for every engagement.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sectors.map((sector) => (
              <article
                key={sector.number}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition duration-300 group-hover:scale-105 group-hover:bg-[#102844]">
                    {sector.icon}
                  </span>

                  <span className="text-sm font-bold tracking-[0.16em] text-slate-300">
                    {sector.number}
                  </span>
                </div>

                <span className="mt-6 text-[10px] font-bold tracking-[0.16em] text-[#2465a7]">
                  {sector.category}
                </span>

                <h3 className="mt-2 text-xl font-bold leading-snug text-[#102844]">
                  {sector.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {sector.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Service coverage
                  </h4>

                  <ul className="mt-3 space-y-2.5">
                    {sector.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 font-bold text-[#0d9488]"
                        >
                          ✓
                        </span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs leading-6 text-amber-950">
                  <strong>Important:</strong> {sector.note}
                </p>

                <button
                  type="button"
                  onClick={() => selectSector(sector)}
                  className="mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-left text-sm font-bold text-[#2465a7] transition hover:gap-3 hover:text-teal-700"
                >
                  Enquire for this sector
                  <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING SERVICES LINK */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-shell">
          <div className="flex flex-col gap-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Engineering Services</span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#102844] sm:text-3xl">
                Need technical details about PAT, SAT, SCI or DLA?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Visit the dedicated Engineering Services page for the
                technical service descriptions and applicable engineering
                decision pathway. Service selection remains subject to
                engineering review and the applicable process.
              </p>
            </div>

            <Link
              href="/engineering-services"
              className="button-primary w-fit shrink-0"
            >
              Explore Engineering Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT PRINCIPLE */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="container-shell">
          <div className="max-w-3xl">
            <span className="eyebrow">Our engagement principle</span>

            <h2 className="section-title mt-4">
              Clear scope, clear responsibilities, appropriate next steps.
            </h2>

            <p className="body-copy mt-4">
              NLETA defines each engagement according to organisational
              needs, applicable requirements, verified competence and
              agreed scope. Project-level QRT or DGS services require
              confirmation of operational authority, reporting channels
              and responsibility for governance records.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {engagementSteps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-7"
              >
                <span className="text-sm font-bold tracking-[0.16em] text-[#0d9488]">
                  STEP {step.number}
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#102844]">
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


      {/* FINAL CTA */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b1e34] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
            />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                  Discuss your requirements
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Let&apos;s define the right scope for your organisation.
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Contact NLETA to discuss an appropriate engineering,
                  safety-training, workforce-development or digital-governance
                  programme for your sector.
                </p>
              </div>

              <a
                href="#sector-enquiry"
                className="button-primary w-fit shrink-0"
              >
                Discuss Your Requirements ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
