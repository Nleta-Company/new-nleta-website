"use client";

import { useState } from "react";
import Link from "next/link";
import EmployerConnectForm from "@/components/EmployerConnectForm";
const employerGroups = [
  {
    number: "01",
    eyebrow: "Domestic recruitment",
    title: "For Employers in India",
    description:
      "Share your technical workforce requirements for recruitment within India. Employer and vacancy details remain subject to review before any candidate referral.",
    items: [
      "Lift and escalator companies",
      "Vertical transportation service providers",
      "OEMs and authorised service organisations",
      "Facility management companies",
      "MEP contractors and infrastructure projects",
      "Industrial and technical service employers",
    ],
    accent: "blue",
  },
  {
    number: "02",
    eyebrow: "Overseas opportunities",
    title: "For International Employers",
    description:
      "Discuss eligible Indian technical talent for overseas roles. Every assignment depends on destination-country requirements and a lawful recruitment arrangement.",
    items: [
      "International lift and escalator companies",
      "Global vertical transportation service providers",
      "Overseas technical maintenance organisations",
      "International facility management companies",
      "Employers recruiting eligible Indian professionals",
      "Employers with documented sponsorship arrangements, where applicable",
    ],
    accent: "teal",
  },
  {
    number: "03",
    eyebrow: "Other eligible sectors",
    title: "For Other Technical Employers",
    description:
      "Organisations outside the core vertical-transportation sector may submit an enquiry where their roles match relevant technical skills and candidate eligibility.",
    items: [
      "Engineering and technical support companies",
      "Building services and maintenance teams",
      "Infrastructure and project service providers",
      "Industrial operations and technical facilities",
      "Other employers with genuine, clearly defined vacancies",
    ],
    accent: "slate",
  },
];

const verificationChecks = [
  {
    number: "01",
    title: "Identity & documents",
    description:
      "Identity-document consistency and passport validity checks, where applicable, subject to consent, lawful access and the agreed verification scope.",
  },
  {
    number: "02",
    title: "Education & technical credentials",
    description:
      "Review of available ITI, diploma, degree, technical certificate, training and competency records with the issuing body or appropriate source where possible.",
  },
  {
    number: "03",
    title: "Employment & experience",
    description:
      "Previous employment, role-related experience and references may be checked where verifiable and permitted by law.",
  },
  {
    number: "04",
    title: "Background checks",
    description:
      "Only legally permissible checks through appropriate sources may be coordinated. Results describe the checks actually completed; they do not guarantee a person has no record anywhere.",
  },
  {
    number: "05",
    title: "Medical fitness coordination",
    description:
      "Where required, job-specific assessments may be coordinated through a qualified medical professional or authorised occupational-health provider. NLETA does not independently certify medical fitness unless specifically authorised and qualified.",
  },
  {
    number: "06",
    title: "Destination-country requirements",
    description:
      "For overseas roles, the required local technical licence, registration, language, work-permit or other eligibility conditions must be identified for the specific role and destination.",
  },
];

const internationalSupport = [
  "Candidate sourcing from relevant training batches and available candidate pools",
  "Initial eligibility and document screening",
  "Qualification and experience verification coordination",
  "Matching candidate skills to the documented job description",
  "Interview scheduling and communication",
  "Offer and employment-document coordination",
  "Passport and visa-document process guidance, where within the agreed scope",
  "Coordination with authorised recruitment or immigration professionals, where required",
  "Pre-departure orientation on workplace expectations, safety and destination-specific requirements",
  "Joining confirmation and agreed post-joining follow-up",
];

const internationalTerms = [
  "Employer identity, job title, job location and reporting structure",
  "Written job description, required skills, qualifications and licences",
  "Salary, currency, payment frequency and permitted deductions",
  "Working hours, overtime, weekly rest, leave and probation conditions",
  "Accommodation, transport, meals, insurance and other benefits, where offered or required",
  "Workplace safety, induction and personal protective equipment",
  "Passport, visa, work-permit, sponsorship and travel responsibilities",
  "Contract duration, termination, notice and repatriation terms where applicable",
  "Grievance channel, emergency contacts and candidate document handling",
];

const domesticTerms = [
  "Job title, number of openings, work location and reporting structure",
  "Required qualifications, experience, skills and licences, where applicable",
  "Salary, payment cycle, working hours, shifts, weekly rest and leave",
  "Probation, notice period, employment type and joining timeline",
  "Safety requirements, job-specific risks and required PPE",
  "Accommodation, transport, meals, insurance or other facilities, where offered",
  "Employer contact, interview stages and selection process",
  "A written offer and employment terms before candidate acceptance",
];

const workflow = [
  {
    number: "01",
    title: "Employer registration",
    description:
      "The organisation shares its legal identity, registration details and authorised contact information for review.",
  },
  {
    number: "02",
    title: "Separate vacancy submission",
    description:
      "Each job opening is recorded separately, including role, location, qualifications, employment terms and hiring timeline.",
  },
  {
    number: "03",
    title: "Employer & vacancy review",
    description:
      "Evidence is reviewed and unresolved items are identified. Submitting a form alone does not make an employer or vacancy verified.",
  },
  {
    number: "04",
    title: "Candidate consent & checks",
    description:
      "Candidate information and verification are handled through a separate consent-led process, with checks marked by their actual status.",
  },
  {
    number: "05",
    title: "Matching & interview",
    description:
      "Potentially suitable candidates may be referred. The employer remains responsible for interviews and the final hiring decision.",
  },
  {
    number: "06",
    title: "Offer, joining & follow-up",
    description:
      "Written employment terms, applicable travel or immigration coordination and any agreed follow-up are handled within the confirmed scope.",
  },
];

const candidateBenefits = [
  {
    title: "Share your professional profile",
    description:
      "Provide relevant qualifications, skills, experience, preferred location and career interests through the appropriate candidate process.",
  },
  {
    title: "Explore relevant opportunities",
    description:
      "Consider potential vacancies based on the published role requirements, your eligibility and the information available.",
  },
  {
    title: "Understand checks & preparation",
    description:
      "Receive clarity on applicable document checks, interview preparation and, where relevant, destination-specific readiness.",
  },
];

const safeguards = [
  {
    icon: "✓",
    title: "Evidence-based employer review",
    description:
      "Registration received, verification pending and verified are different states. Verified status should be used only after the applicable evidence has been reviewed and approved.",
  },
  {
    icon: "◎",
    title: "Candidate consent & privacy",
    description:
      "Candidate identity, medical and other sensitive records are not part of the general employer-registration form. Access and sharing must follow consent, applicable law and defined purpose.",
  },
  {
    icon: "↗",
    title: "Clear verification status",
    description:
      "A check should be recorded as verified, pending, not verifiable or not applicable. A candidate must not be called fully verified while required checks remain incomplete.",
  },
];

export default function EmploymentPage() {
  const [showEmployerForm, setShowEmployerForm] = useState(false);

  const openEmployerForm = () => {
    setShowEmployerForm(true);
    window.setTimeout(() => {
      document.getElementById("employer-connect-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="employment-hero relative isolate flex min-h-[460px] items-center overflow-hidden bg-[#102844] bg-cover bg-center bg-no-repeat text-white lg:min-h-[calc(100svh-170px)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,24,43,0.94) 0%, rgba(7,24,43,0.85) 55%, rgba(7,24,43,0.76) 100%), url('/images/nleta-employment-bg.png')",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="employment-glow absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#12a6a0]/25 blur-3xl" />
          <div className="employment-glow employment-glow-delay absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#2465a7]/30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07182b]/30" />
          <div
            className="employment-grid absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
        </div>

        <div className="container-shell relative w-full py-28 text-center sm:py-24 lg:py-22">
          <div className="-translate-y-3">
            <div className="employment-reveal mx-auto mb-5 flex h-1 w-24 overflow-hidden rounded-full">
              <span className="w-1/3 bg-[#ff9933]" />
              <span className="w-1/3 bg-white" />
              <span className="w-1/3 bg-[#138808]" />
            </div>
            <p className="employment-reveal employment-delay-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
              Employment & Employer Connect
            </p>
            <h1 className="employment-reveal employment-delay-1 mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Connecting verified skills with the right opportunities.
            </h1>
            <p className="employment-reveal employment-delay-2 mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
              From Indian industry to international opportunities — NLETA aims to support responsible technical recruitment through documented checks, clear job requirements and structured coordination.
            </p>
            <p className="employment-reveal employment-delay-2 mx-auto mt-3 max-w-2xl text-sm font-semibold text-cyan-100 sm:text-base">
              Find Talent. Verify Credentials. Build Workforce Confidence.
            </p>
            <div className="employment-reveal employment-delay-3 mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={openEmployerForm}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                I&apos;m an Employer <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <Link href="#candidates" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10">
                I&apos;m a Candidate
              </Link>
            </div>
            <p className="employment-reveal employment-delay-3 mx-auto mt-4 max-w-3xl text-xs leading-5 text-slate-300">
              Employer and vacancy verification, candidate checks and recruitment support are subject to evidence, consent, applicable law and the agreed scope. Registration does not guarantee an interview, job, visa or placement.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-shell">
          <div className="employment-section-heading max-w-3xl">
            <p className="eyebrow">Employer Connect</p>
            <h2 className="section-title mt-4">One connection point for domestic and international technical hiring.</h2>
            <p className="body-copy mt-5">
              Employer Connect is intended to support structured recruitment coordination. Employer registration and each vacancy are separate records; a submitted form is an enquiry, not a confirmation of verification or approval.
            </p>
          </div>
          <div id="employers" className="mt-12 grid scroll-mt-28 gap-6 lg:grid-cols-3">
            {employerGroups.map((group, index) => (
              <article
                key={group.number}
                style={{ animationDelay: `${index * 100}ms` }}
                className="employment-pathway-card group rounded-2xl border border-[#e1e8f0] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50 md:p-8"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${group.accent === "teal" ? "bg-[#e8f8f5] text-[#07877f]" : group.accent === "blue" ? "bg-[#edf5fc] text-[#2465a7]" : "bg-slate-100 text-slate-700"}`}>
                  {group.number}
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#07877f]">{group.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold text-[#102844]">{group.title}</h3>
                <p className="body-copy mt-4">{group.description}</p>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f8f5] text-xs font-bold text-[#07877f]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={openEmployerForm}
                  className="group/cta mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Discuss Employer Requirements <span aria-hidden="true" className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                </button>
              </article>
            ))}
          </div>

          {showEmployerForm && (
            <div id="employer-connect-form" className="mt-10 scroll-mt-24">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#07877f]">Employer Registration</p>
                  <h3 className="mt-2 text-2xl font-bold text-[#102844]">Share your hiring requirements</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmployerForm(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Close Form ×
                </button>
              </div>
              <EmployerConnectForm />
            </div>
          )}

          <p className="mt-6 text-xs leading-6 text-slate-500">
            International enquiries are reviewed against destination-country immigration, employment, technical licensing and recruitment requirements. NLETA is not a government authority, visa authority or statutory adjudicator.
          </p>
        </div>
      </section>

      {/* Domestic requirements */}
      <section className="section-padding overflow-hidden bg-[#f3f6fa]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="employment-section-heading max-w-xl">
            <p className="eyebrow">National / India recruitment</p>
            <h2 className="section-title mt-4">Clear job terms for recruitment within India.</h2>
            <p className="body-copy mt-5">
              Domestic employer enquiries should identify the actual vacancy and the employment conditions before candidates are considered. Details may vary by role and employer.
            </p>
            <Link href="/contact?audience=employer&interest=employment&market=national" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#74a7e1] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3e8ddc]">
              Submit a Domestic Enquiry <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {domesticTerms.map((term, index) => (
              <div key={term} className="flex gap-3 rounded-xl border border-[#e1e8f0] bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf5fc] text-xs font-bold text-[#2465a7]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-6 text-slate-700">{term}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International requirements */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-shell">
          <div className="employment-section-heading max-w-3xl">
            <p className="eyebrow">International recruitment support</p>
            <h2 className="section-title mt-4">Indian technical talent for global opportunities.</h2>
            <p className="body-copy mt-5">
              Depending on the agreed service scope and applicable law, NLETA may coordinate candidate sourcing, matching, documentation and recruitment communication for eligible overseas opportunities.
            </p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#d9e8f4] bg-[#f8fbff] p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#102844]">Support may include</h3>
              <ul className="mt-5 space-y-3">
                {internationalSupport.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f8f5] text-xs font-bold text-[#07877f]">✓</span>{item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#cce9e5] bg-[#f6fcfb] p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#102844]">Before selection or deployment</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">The specific offer should clearly confirm, where applicable:</p>
              <ul className="mt-5 space-y-3">
                {internationalTerms.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#07877f] ring-1 ring-[#cce9e5]">✓</span>{item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
            <h3 className="font-bold text-[#78350f]">Important: visa, work permit & legal requirements</h3>
            <p className="mt-2 text-sm leading-7 text-amber-950">
              Passport issuance, visa decisions, work permits and entry into another country are determined by the relevant government authorities. NLETA cannot guarantee approval or processing time. International assignments may proceed only through lawful recruitment arrangements and, where required, appropriately authorised recruitment or immigration partners. Employer identity, genuine vacancy, written terms, sponsorship responsibilities and applicable permissions must be reviewed before proceeding.
            </p>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="section-padding overflow-hidden bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="employment-section-heading max-w-3xl">
            <p className="eyebrow">Candidate verification & documentation</p>
            <h2 className="section-title mt-4">Documented checks. Clear status. Responsible handling.</h2>
            <p className="body-copy mt-5">
              Subject to candidate consent, document availability, applicable law and the agreed scope, verification coordination may cover the following areas. Not every check applies to every role.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {verificationChecks.map((check, index) => (
              <article key={check.number} style={{ animationDelay: `${index * 80}ms` }} className="employment-safeguard-card group rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50">
                <span className="text-sm font-bold tracking-widest text-[#12a6a0]">CHECK {check.number}</span>
                <h3 className="mt-4 text-lg font-bold text-[#102844] transition-colors group-hover:text-[#2465a7]">{check.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{check.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-[#cce9e5] bg-white p-5 md:p-6">
            <h3 className="font-bold text-[#102844]">Verification status is not an all-clear guarantee</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Each required check should be identified as <strong>Verified</strong>, <strong>Pending</strong>, <strong>Not verifiable</strong> or <strong>Not applicable</strong>. A candidate must not be described as fully verified while required checks remain incomplete. Background checks cannot prove that no record exists anywhere. Sensitive medical information must be handled confidentially and shared only where lawful, necessary and appropriately authorised.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-shell">
          <div className="employment-section-heading max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-4">A structured employer-connect workflow.</h2>
            <p className="body-copy mt-5">Employer registration and vacancy registration are separate steps. One organisation may submit more than one vacancy, and every vacancy requires its own job details and review.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {workflow.map((step, index) => (
              <article key={step.number} style={{ animationDelay: `${index * 100}ms` }} className="employment-process-card group relative overflow-hidden rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/60">
                <span aria-hidden="true" className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#edf5fc] transition-colors duration-300 group-hover:bg-[#dcecf9]" />
                <span className="relative text-sm font-bold tracking-widest text-[#12a6a0]">STEP {step.number}</span>
                <h3 className="relative mt-5 text-lg font-bold text-[#102844] transition-colors group-hover:text-[#2465a7]">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                <div className="relative mt-6 h-1 w-10 rounded-full bg-[#12a6a0] transition-all duration-300 group-hover:w-16" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Replacement policy */}
      <section className="section-padding overflow-hidden bg-[#f3f6fa]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="employment-section-heading max-w-xl">
            <p className="eyebrow">Replacement & workforce continuity</p>
            <h2 className="section-title mt-4">Clear terms before recruitment begins.</h2>
            <p className="body-copy mt-5">
              If a candidate does not join, withdraws or a documented role mismatch arises, the matter may be reviewed under the signed recruitment agreement and applicable commercial terms.
            </p>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#102844]">A replacement is not automatic and is not an unconditional employment-continuity guarantee.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Eligibility period", description: "Any applicable period, such as 30, 60 or 90 days, must be confirmed in the signed quotation or agreement. A preference on an enquiry form is not a contractual commitment." },
              { title: "Review of circumstances", description: "Non-joining, candidate withdrawal, documented role mismatch and employer-side changes should be assessed separately using relevant records." },
              { title: "Fees & replacement attempts", description: "Any replacement attempt, additional fee, refund, credit or expense responsibility must be stated in the signed commercial terms." },
              { title: "Candidate welfare", description: "A replacement policy does not override employment law or candidate rights. Safety, unlawful treatment or welfare concerns should be handled separately." },
            ].map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-[#e1e8f0] bg-white p-5">
                <span className="text-xs font-bold tracking-widest text-[#07877f]">POLICY {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-bold text-[#102844]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate pathway */}
      <section id="candidates" className="section-padding scroll-mt-24 overflow-hidden bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="employment-section-heading max-w-xl">
            <p className="eyebrow">For candidates</p>
            <h2 className="section-title mt-4">Prepare for relevant technical opportunities.</h2>
            <p className="body-copy mt-5">Candidates may express interest in eligible roles and share relevant professional information through the appropriate process. Candidate registration does not guarantee an interview, job offer, visa or employment.</p>
            <Link href="/contact?audience=candidate&interest=employment" className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#cbd9e8] bg-white px-5 py-3 text-sm font-bold text-[#2465a7] transition duration-300 hover:-translate-y-0.5 hover:border-[#2465a7] hover:shadow-md">
              Express Candidate Interest <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-4">
            {candidateBenefits.map((benefit, index) => (
              <article key={benefit.title} className="flex gap-4 rounded-2xl border border-[#e1e8f0] bg-[#f8fafc] p-5 md:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f5] text-sm font-bold text-[#07877f]">0{index + 1}</span>
                <div>
                  <h3 className="font-bold text-[#102844]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Governance and privacy */}
      <section className="section-padding overflow-hidden bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="employment-section-heading mb-10 max-w-3xl">
            <p className="eyebrow">Responsible engagement</p>
            <h2 className="section-title mt-4">Trust through transparency and defined responsibilities.</h2>
            <p className="body-copy mt-5">NLETA aims to support informed recruitment decisions while respecting the separate responsibilities of employers, candidates, authorised professionals, recruitment partners and government authorities.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {safeguards.map((item, index) => (
              <article key={item.title} style={{ animationDelay: `${index * 120}ms` }} className="employment-safeguard-card group rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f8f5] text-xl text-[#07877f] transition duration-300 group-hover:scale-110 group-hover:bg-[#07877f] group-hover:text-white">{item.icon}</span>
                  <span className="text-sm font-bold tracking-widest text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-bold text-[#102844] transition-colors duration-300 group-hover:text-[#2465a7]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-[#d9e8f4] bg-white p-5 md:p-6">
            <h3 className="font-bold text-[#102844]">Document and process boundaries</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Employer registration should collect organisation and vacancy information only. Candidate consent and verification belong in a separate candidate process. Do not submit candidate passport copies, medical records or other sensitive candidate documents through a general employer enquiry. Verification sources, access permissions, record retention, commercial fees and partner authorisations must be confirmed before operational services are activated.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white pb-16">
        <div className="container-shell">
          <div className="employment-cta relative isolate overflow-hidden rounded-2xl bg-[#102844] px-6 py-10 text-white md:px-12 md:py-14">
            <div aria-hidden="true" className="absolute right-0 top-0 h-1 w-36 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-[#12a6a0]/20 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Employment Connect</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Let&apos;s build meaningful professional connections.</h2>
                <p className="mt-4 leading-7 text-slate-300">Contact NLETA to discuss domestic hiring, international workforce requirements or candidate opportunities.</p>
              </div>
              <Link href="/contact?interest=employment" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                Contact NLETA <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-6 text-slate-500">
            All services are subject to applicable law, documented scope, candidate consent and written terms. NLETA does not guarantee recruitment outcomes, visa approval, unrestricted background clearance or automatic replacement. Commercial terms and replacement conditions apply only where confirmed in the signed agreement.
          </p>
        </div>
      </section>
    </>
  );
}
