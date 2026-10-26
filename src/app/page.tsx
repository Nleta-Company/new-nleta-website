import Link from "next/link";

import ScrollReveal from "@/components/ScrollReveal";

import ScrollProgress from "@/components/ScrollProgress";
import StatsCounter from "@/components/StatsCounter";

const engineeringServices = [

  {

    code: "PAT",

    title: "Partial Acceptance Test / Safety Inspection",

    description:

      "Assessment of applicable safety-related conditions and operational aspects.",

    href: "/engineering-services#pat",

  },

  {

    code: "SAT",

    title: "Satisfactory Acceptance Test / Quality Inspection",

    description:

      "Assessment of applicable functional, quality and performance parameters, subject to service prerequisites.",

    href: "/engineering-services#sat",

  },

  {

    code: "SCI",

    title: "Standards Compliance Inspection",

    description:

      "Review of compliance with applicable standards within the agreed scope.",

    href: "/engineering-services#sci",

  },

  {

    code: "DLA",

    title: "Design Life Assessment",

    description:

      "Engineering assessment of lifecycle considerations, ageing, obsolescence and relevant risks.",

    href: "/engineering-services#dla",

  },

  {

    code: "DGS",

    title: "Digital Governance System",

    description:

      "Structured records, maintenance traceability, operational observations and trend monitoring.",

    href: "/engineering-services#dgs",

  },

];

const sectors = [

  {

    title: "Government & Public-Sector Organisations",

    description:

      "Relevant inspection, assessment, training and governance requirements, subject to applicable eligibility and authorisation.",

  },

  {

    title: "MRTS, Metro & Railway Infrastructure",

    description:

      "Applicable lift and escalator engineering, operational safety awareness and technical training requirements.",

  },

  {

    title: "RWA, AOA & Residential Societies",

    description:

      "User awareness, QRT readiness, AMC accountability, maintenance governance and Digital Governance System (DGS).",

  },

  {

    title: "Manufacturing & Industrial Organisations",

    description:

      "Relevant industrial lifting equipment programmes, technical training and competency development within the approved scope.",

  },

  {

    title: "Corporate & Facility Management",

    description:

      "Workplace safety awareness, technical and professional training, and applicable engineering advisory services.",

  },

  {

    title: "Educational & Institutional Organisations",

    description:

      "Technical learning, skill development and corporate or institutional training programmes.",

  },

];

const industryServices = [

  "Third-party inspection and testing",

  "Technical auditing and risk analysis",

  "Standards compliance assessment within the applicable scope",

  "Design life and lifecycle assessment",

  "Digital Governance System (DGS)",

  "Technical workforce training and competency development",

  "Safety awareness and professional development",

  "Corporate and customised technical training",

];

const trainingAreas = [

  {

    title: "Technical & Vocational Training",

    description:

      "Lift and escalator-related technical programmes and other approved equipment-specific courses.",

  },

  {

    title: "Skill India Programmes",

    description:

      "Courses delivered under the applicable Skill India authorisation and programme requirements.",

  },

  {

    title: "Safety & QRT Training",

    description:

      "Operational observation, safety awareness, reporting and emergency-readiness programmes, as applicable.",

  },

  {

    title: "Soft Skills & Professional Development",

    description:

      "Professional communication, workplace behaviour, personality development and workplace discipline.",

  },

  {

    title: "Corporate Training",

    description:

      "Customised technical, safety, supervisory and professional training for organisations.",

  },

  {

    title: "Practical Training & OJT",

    description:

      "Practical exposure and on-the-job training where included in the relevant programme.",

  },

];

const resources = [

  {

    title: "Lift & Escalator Safety",

    description: "Safety-awareness resources and public guidance.",

    href: "/knowledge-centre",

  },

  {

    title: "Guides & FAQs",

    description: "Public guides and frequently asked questions.",

    href: "/knowledge-centre",

  },

  {

    title: "Acts, Standards & Codes",

    description: "Applicable references published after appropriate review.",

    href: "/knowledge-centre",

  },

  {

    title: "Training Resources",

    description: "Technical learning and competency-development resources.",

    href: "/training",

  },

  {

    title: "Maintenance Governance",

    description: "Maintenance governance and DGS information.",

    href: "/engineering-services#dgs",

  },

  {

    title: "Case Studies & Publications",

    description: "Approved technical articles, publications and industry learning.",

    href: "/case-studies",

  },

];

const caseStudyGroups = [

  {

    title: "RWA & Residential Societies",

    description:

      "Building-level safety awareness, maintenance governance, operational observations and DGS.",

  },

  {

    title: "Government, Public Sector & MRTS",

    description:

      "Relevant public-infrastructure engineering, safety and operational learning.",

  },

  {

    title: "Other Industries & Technical Inputs",

    description:

      "Industrial lifting equipment, technical competency, corporate training and applicable industry learning.",

  },

];

const regions = [

  "Uttar Pradesh",

  "Haryana",

  "Delhi NCR",

  "Punjab",

  "Himachal Pradesh",

  "Maharashtra",

  "Telangana",

];

const cardClass =

  "h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50";

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

    <ScrollReveal>

      <span className="eyebrow">{eyebrow}</span>

      <h2 className="section-title mt-4 max-w-3xl">{title}</h2>

      {description && (

        <p className="body-copy mt-4 max-w-3xl">{description}</p>

      )}

    </ScrollReveal>

  );

}

function Arrow() {

  return <span aria-hidden="true">↗</span>;

}

const clpOnline = 279;
const clpOffline = 80;
const clpHybrid = 45;

const inspectionClients = 495;
const clpClients = 318;
const employersWithPortal = 456;

const vacanciesLiftIndustry = 1260;
const vacanciesOtherIndustry = 315;
const totalVacancies = vacanciesLiftIndustry + vacanciesOtherIndustry;

const totalSatisfiedClients =
  employersWithPortal + clpClients + inspectionClients;

export default function HomePage() {

  return (

    <div className="w-full min-w-0 overflow-x-clip">

      <ScrollProgress />

      {/* Hero */}

      <section

        className="home-hero relative isolate flex min-h-[calc(100svh-8rem)] items-center justify-center overflow-hidden bg-nleta-navy bg-cover bg-center bg-no-repeat text-center text-white"

        style={{ backgroundImage: "url('/images/nleta-hero.png')" }}

      >

        <div

          aria-hidden="true"

          className="home-hero-glow pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-800/30 blur-7xl"

        />

        <div

          aria-hidden="true"

          className="home-hero-glow home-hero-glow-delay pointer-events-none absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"

        />

        <div

          aria-hidden="true"

          className="pointer-events-none absolute inset-0 z-[1]"

          style={{

            background:

              "linear-gradient(180deg, rgba(7, 20, 38, 0.48) 0%, rgba(7, 20, 38, 0.64) 55%, rgba(7, 20, 38, 0.76) 100%)",

          }}

        />

        <div className="container-shell home-hero-content relative z-[2] flex w-full flex-col items-center py-12 sm:py-12 lg:py-16">

          <div className="hero-reveal hero-reveal-1 mb-4 flex h-1 w-20 overflow-hidden rounded-full">

            <span className="w-1/3 bg-[#ff9933]" />

            <span className="w-1/3 bg-white" />

            <span className="w-1/3 bg-[#138808]" />

          </div>

          <span className="hero-reveal hero-reveal-2 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-teal-200 backdrop-blur-sm sm:px-4 sm:text-xs md:text-sm">

            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />

            Independent Engineering · Safety · Skill Development

          </span>

          <h1 className="hero-reveal hero-reveal-3 mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)] sm:text-4xl md:text-5xl lg:text-6xl">
            National Lift Escalator Testing Agency
            <span className="mt-1 block text-blue-300">(NLETA)</span>
          </h1>

          <p className="hero-reveal hero-reveal-5 mt-4 max-w-3xl text-sm leading-6 text-white drop-shadow-sm sm:text-base sm:leading-7">

            NLETA enhances lift and escalator safety through independent inspection, testing, technical auditing, risk assessment, engineering consultancy, digital governance, and professional training.

          </p>

          <p className="hero-reveal hero-reveal-5 mt-3 max-w-3xl text-xs leading-6 text-white drop-shadow-sm sm:text-sm sm:leading-6">

            We promote safety awareness, technical competence, and structured documentation to support safer and more reliable operations.

          </p>

          <div className="hero-reveal hero-reveal-6 mt-5 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row sm:flex-wrap">

            <Link href="/engineering-services" className="button-primary justify-center">

              Explore Engineering Services <Arrow />

            </Link>

            <Link

              href="/training"

              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15"

            >

              Explore Training & Certifications <Arrow />

            </Link>

            <Link

              href="/contact"

              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15"

            >

              Customer Service <Arrow />

            </Link>

          </div>

          <Link

            href="/certificate-verification"

            className="hero-reveal hero-reveal-6 mt-3 inline-flex items-center justify-center gap-2 text-xs font-semibold text-teal-200 transition hover:text-white hover:underline sm:text-sm"

          >

            Certificate Download & Verification <Arrow />

          </Link>

        </div>

      </section>

      {/* NLETA Performance Statistics — Frontend Only */}
      <section className="relative z-10 -mt-6 pb-8 sm:-mt-8 sm:pb-10">
        <div className="container-shell">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-6">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">NLETA at a Glance</span>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-nleta-navy sm:text-2xl">
                  Performance Overview
                </h2>
              </div>
              <p className="max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Our inspection progress, training activities, employment connectivity and client satisfaction.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* ===================================================
    INSPECTION
==================================================== */}
              <div className="stats-card-enter overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
                    Inspection
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-nleta-navy">
                    Inspection Performance Customer Services
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">

                  {/* No. of Clients */}
                  <div className="relative overflow-hidden rounded-lg border border-purple-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-purple-500" />

                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Number of Clients
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-purple-700 sm:text-3xl">
                      <StatsCounter value={inspectionClients} showPlus={false} />
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Total inspection clients
                    </p>
                  </div>

                  {/* Inspections Completed */}
                  <div className="relative overflow-hidden rounded-lg border border-emerald-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />

                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Inspections Completed
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-700 sm:text-3xl">
                      <StatsCounter value={733} />
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Inspections successfully completed
                    </p>
                  </div>

                  {/* Inspections In Process */}
                  <div className="relative overflow-hidden rounded-lg border border-blue-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-blue-500" />

                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Inspections In Process
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
                      <StatsCounter value={81} />
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Inspections currently in progress
                    </p>
                  </div>

                  

                  {/* Units in DGS */}
                  <div className="relative overflow-hidden rounded-lg border border-cyan-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-cyan-500" />

                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Units in Digital Governance System (DGS)
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-cyan-700 sm:text-3xl">
                      <StatsCounter value={609} showPlus={false} />
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Units registered in the DGS
                    </p>
                  </div>

                </div>
              </div>

              {/* Skill India / Skill Development Training */}
              <div className="stats-card-enter overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
                    Skill India / Skill Development Training
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-nleta-navy">
                    Training &amp; Placement
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="relative overflow-hidden rounded-lg border border-teal-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Batches Completed
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-teal-700 sm:text-3xl">
                      <StatsCounter value={5} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Training batches completed
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-indigo-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-indigo-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Placed in Elevator Companies
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-indigo-700 sm:text-3xl">
                      <StatsCounter value={240} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Students placed in elevator companies
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-cyan-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-cyan-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Placed in Other Companies
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-cyan-700 sm:text-3xl">
                      <StatsCounter value={150} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Students placed in other industries
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate Learning Program */}
              <div className="stats-card-enter overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
                    Corporate Learning Program (CLP)
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-nleta-navy">
                    Training Delivered
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Number of Clients */}
                  <div className="relative overflow-hidden rounded-lg border border-orange-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-orange-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Number of Clients
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-orange-600 sm:text-3xl">
                      <StatsCounter value={clpClients} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Total CLP clients
                    </p>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-lg border border-blue-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-blue-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Online
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
                      <StatsCounter value={clpOnline} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Online CLP programs
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-purple-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-purple-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Offline
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-purple-700 sm:text-3xl">
                      <StatsCounter value={clpOffline} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Offline CLP programs
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-teal-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Hybrid
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-teal-700 sm:text-3xl">
                      <StatsCounter value={clpHybrid} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Hybrid CLP programs
                    </p>
                  </div>

                  
                </div>
              </div>

              {/* Employer Connect */}
              <div className="stats-card-enter overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
                    Employer Connect
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-nleta-navy">
                    Employment Opportunities
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="relative overflow-hidden rounded-lg border border-amber-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Total Vacancies
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-amber-700 sm:text-3xl">
                      <StatsCounter value={totalVacancies} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Total vacancies available
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-indigo-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-indigo-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Number of Employers with Portal
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-indigo-700 sm:text-3xl">
                      <StatsCounter value={employersWithPortal} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Vacancies listed through the portal
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-indigo-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-indigo-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Vacancies with Portal — Lift Industry
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-indigo-700 sm:text-3xl">
                      <StatsCounter value={vacanciesLiftIndustry} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Vacancies listed through the portal
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-lg border border-cyan-100 bg-white p-4">
                    <span className="absolute inset-x-0 top-0 h-1 bg-cyan-500" />
                    <p className="text-xs font-semibold leading-5 text-slate-600">
                      Vacancies with Portal — Other Industry
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-cyan-700 sm:text-3xl">
                      <StatsCounter value={vacanciesOtherIndustry} showPlus={false} />
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Vacancies listed across other industries
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Satisfaction */}
              <div className="stats-card-enter overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-5 lg:col-span-2">
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
                    Client Satisfaction
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-nleta-navy">
                    NLETA Satisfied Clients
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-lg border border-emerald-100 bg-white p-4 sm:p-5">
                  <div>
                    <p className="text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
                      Total No. of Satisfied Clients
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                      Clients satisfied with NLETA&apos;s services
                    </p>
                  </div>

                  <p className="shrink-0 text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl">
                    <StatsCounter value={totalSatisfiedClients} showPlus={false} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About NLETA */}

      <section className="bg-white pt-8 pb-16 sm:pt-10 sm:pb-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          <ScrollReveal direction="left">

            <span className="eyebrow">About NLETA</span>

            <h2 className="section-title mt-4">About NLETA at a Glance</h2>

            <p className="body-copy mt-5">

              NLETA — National Lift Escalator Testing Agency — works to

              strengthen lift and escalator safety through independent

              engineering assessment, safety awareness, technical competency

              development and structured digital governance.

            </p>

            <Link href="/about" className="button-primary mt-7">

              Know More About NLETA <Arrow />

            </Link>

          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">

            {[

              "Independent and objective engineering assessment",

              "User awareness and safety education",

              "Structured documentation and record management",

              "Technical and professional competency development",

              "Digital governance to support ongoing oversight",

            ].map((item, index) => (

              <ScrollReveal

                key={item}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <div className={`${cardClass} flex items-start gap-3`}>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-nleta-blue">

                    {String(index + 1).padStart(2, "0")}

                  </span>

                  <p className="text-sm font-medium leading-6 text-slate-700">

                    {item}

                  </p>

                </div>

              </ScrollReveal>

            ))}

          </div>

        </div>

      </section>

      {/* Engineering services */}

      <section className="section-padding bg-nleta-surface" id="engineering-services">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Engineering Services"

            title="Independent Assessment. Structured Engineering Records. Informed Decisions."

            description="Explore NLETA's engineering services for the assessment, testing, compliance review and governance of lift and escalator assets, subject to applicable requirements and the agreed service scope."

          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {engineeringServices.map((service, index) => (

              <ScrollReveal

                key={service.code}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <Link href={service.href} className={`${cardClass} group flex flex-col`}>

                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-nleta-blue">

                    {service.code}

                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-nleta-navy">

                    {service.title}

                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">

                    {service.description}

                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nleta-blue group-hover:underline">

                    Learn more <Arrow />

                  </span>

                </Link>

              </ScrollReveal>

            ))}


          </div>

          <p className="mt-7 text-sm leading-6 text-slate-500">

            Service applicability, prerequisites and technical scope remain

            subject to the applicable requirements and NLETA&apos;s approved

            engineering review.

          </p>

        </div>

      </section>

      {/* Other sectors */}

      <section className="section-padding bg-white" id="other-sectors">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Services for Other Sectors"

            title="Safety, Engineering Governance and Competency for Diverse Organisations"

            description="NLETA supports organisations seeking relevant engineering services, safety awareness, technical competency development and structured governance within the applicable service scope."

          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {sectors.map((sector, index) => (

              <ScrollReveal

                key={sector.title}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <article className={cardClass}>

                  <span className="text-xs font-bold tracking-[0.16em] text-nleta-blue">

                    SECTOR {String(index + 1).padStart(2, "0")}

                  </span>

                  <h3 className="mt-4 text-lg font-semibold text-nleta-navy">

                    {sector.title}

                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">

                    {sector.description}

                  </p>

                </article>

              </ScrollReveal>

            ))}

          </div>

          <Link href="/sectors" className="button-primary mt-8">

            Explore Services for Other Sectors <Arrow />

          </Link>

        </div>

      </section>

      {/* Vertical transportation companies */}

      <section className="section-padding bg-nleta-surface" id="vertical-transportation">

        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          <ScrollReveal direction="left">

            <span className="eyebrow">Industry Services</span>

            <h2 className="section-title mt-4">

              An Independent Technical Layer for the Vertical Transportation Industry

            </h2>

            <p className="body-copy mt-5">

              NLETA supports the lift and escalator ecosystem through

              independent assessment, technical documentation, safety

              awareness, competency development and digital engineering

              governance.

            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">

              NLETA&apos;s role is to provide the agreed independent assessment,

              governance or training service. Maintenance, repair and

              restoration remain the responsibility of the appointed OEM/AMC or

              relevant service provider.

            </p>

            <Link href="/industries" className="button-primary mt-7">

              Explore Industry Services <Arrow />

            </Link>

          </ScrollReveal>

          <div className="grid gap-3 sm:grid-cols-2">

            {industryServices.map((item, index) => (

              <ScrollReveal

                key={item}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <div className="flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">

                  <span className="mt-0.5 text-teal-600">✓</span>

                  <p className="text-sm leading-6 text-slate-700">{item}</p>

                </div>

              </ScrollReveal>

            ))}

          </div>

        </div>

      </section>

      {/* Training */}

      <section className="section-padding bg-white" id="training">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Training & Certifications"

            title="Developing Technical Competence and Professional Readiness"

            description="NLETA's training vertical brings together technical learning, safety awareness, practical exposure, professional development and industry-oriented competency development."

          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {trainingAreas.map((area, index) => (

              <ScrollReveal

                key={area.title}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <article className={cardClass}>

                  <span className="text-2xl text-nleta-blue">◎</span>

                  <h3 className="mt-4 text-lg font-semibold text-nleta-navy">

                    {area.title}

                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">

                    {area.description}

                  </p>

                </article>

              </ScrollReveal>

            ))}

          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">

            <h3 className="text-lg font-semibold text-nleta-navy">

              Management System Certifications

            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">

              {[

                ["ISO 9001", "Quality Management System"],

                ["ISO 14001", "Environmental Management System"],

                ["ISO 21001", "Educational Organization Management System"],

              ].map(([code, name]) => (

                <div key={code} className="rounded-xl bg-white p-4">

                  <p className="font-bold text-nleta-blue">{code}</p>

                  <p className="mt-1 text-sm text-slate-600">{name}</p>

                </div>

              ))}

            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">

              ISO certification information describes certified management

              systems within the scope stated on the actual certificates. It is

              not presented as individual technical-course certification or as

              proof of statutory approval for every service.

            </p>

          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <Link href="/training" className="button-primary">

              Explore Training Programmes <Arrow />

            </Link>

            <Link

              href="/contact"

              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-nleta-navy transition hover:border-nleta-blue hover:bg-blue-50"

            >

              Enquire About Corporate Training <Arrow />

            </Link>

            <Link

              href="/certifications"

              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-nleta-navy transition hover:border-nleta-blue hover:bg-blue-50"

            >

              View ISO Certifications <Arrow />

            </Link>

          </div>

        </div>

      </section>

      {/* Employer connect */}

      <section className="section-padding bg-nleta-surface" id="employer-connect">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Employer Connect"

            title="Connecting Industry Requirements with Relevant Skills"

            description="NLETA aims to support the connection between technical training and employment opportunities by bringing eligible candidates and employer requirements into a structured process."

          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {[

              {

                title: "For Employers",

                description:

                  "Register your organisation, share workforce requirements and specify job roles, skills, qualifications and preferred locations.",

                href: "/employment",

                label: "Register as an Employer",

              },

              {

                title: "For Candidates",

                description:

                  "Create an employment profile, record relevant training and competencies, and submit your job preferences.",

                href: "/employment",

                label: "Candidate Employment Profile",

              },

              {

                title: "For Industry Partners",

                description:

                  "Collaborate on workforce planning, technical competency requirements and industry-oriented training.",

                href: "/contact",

                label: "Partner with NLETA",

              },

            ].map((item, index) => (

              <ScrollReveal

                key={item.title}

                delay={(index + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <article className={`${cardClass} flex flex-col`}>

                  <h3 className="text-xl font-semibold text-nleta-navy">

                    {item.title}

                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">

                    {item.description}

                  </p>

                  <Link

                    href={item.href}

                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-nleta-blue hover:underline"

                  >

                    {item.label} <Arrow />

                  </Link>

                </article>

              </ScrollReveal>

            ))}

          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">

            Candidate matching is subject to eligibility, profile verification,

            candidate consent and employer requirements. Registration or

            training does not guarantee employment or selection.

          </p>

        </div>

      </section>

      {/* Knowledge Centre */}

      <section className="section-padding bg-white" id="knowledge-centre">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Knowledge Centre"

            title="Understand Safety. Learn the Requirements. Make Informed Decisions."

            description="Explore public information designed to improve understanding of lift and escalator safety, applicable requirements, technical learning and responsible asset governance."

          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {resources.map((resource, index) => (

              <ScrollReveal

                key={resource.title}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <Link href={resource.href} className={`${cardClass} group flex flex-col`}>

                  <h3 className="text-lg font-semibold text-nleta-navy">

                    {resource.title}

                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">

                    {resource.description}

                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-nleta-blue group-hover:underline">

                    Explore resource <Arrow />

                  </span>

                </Link>

              </ScrollReveal>

            ))}

          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">

            Technical references and requirements will be published only after

            appropriate review. Public guidance supports awareness and does not

            replace required inspection, professional assessment or applicable

            statutory obligations.

          </p>

          <Link href="/knowledge-centre" className="button-primary mt-7">

            Visit Knowledge Centre <Arrow />

          </Link>

        </div>

      </section>

      {/* Case studies */}

      <section className="section-padding bg-nleta-surface" id="case-studies">

        <div className="container-shell">

          <SectionHeading

            eyebrow="Case Studies"

            title="Practical Insights. Verified Facts. Safety-Focused Learning."

            description="Explore case studies and industry inputs that support safety awareness, engineering understanding and better governance."

          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">

            {caseStudyGroups.map((group, index) => (

              <ScrollReveal

                key={group.title}

                delay={(index + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <article className={cardClass}>

                  <span className="text-xs font-bold tracking-[0.16em] text-nleta-blue">

                    CASE STUDY CATEGORY {index + 1}

                  </span>

                  <h3 className="mt-4 text-xl font-semibold text-nleta-navy">

                    {group.title}

                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">

                    {group.description}

                  </p>

                </article>

              </ScrollReveal>

            ))}

          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">

            Each published case study will use verified facts, relevant

            technical references where confirmed, and approved commentary.

          </p>

          <Link href="/case-studies" className="button-primary mt-7">

            Explore Case Studies <Arrow />

          </Link>

        </div>

      </section>

      {/* Customer service */}

      <section className="section-padding bg-white" id="customer-service">

        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">

          <ScrollReveal direction="left">

            <span className="eyebrow">Customer Service</span>

            <h2 className="section-title mt-4">

              Structured Service Coordination and Customer Support

            </h2>

            <p className="body-copy mt-5">

              NLETA&apos;s customer service process is designed to help customers

              navigate service enquiries, onboarding, approved documentation and

              relevant service updates through the designated digital channels.

            </p>

            <ul className="mt-6 space-y-3">

              {[

                "Submit a service enquiry",

                "Access the applicable service information",

                "Follow the authorised customer-service process",

                "Access available customer documents",

                "Contact the relevant team for assistance",

              ].map((item) => (

                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">

                  <span className="text-teal-600">✓</span>

                  {item}

                </li>

              ))}

            </ul>

          </ScrollReveal>

          <ScrollReveal direction="right">

            <div className="rounded-2xl bg-nleta-navy p-7 text-white sm:p-9">

              <h3 className="text-2xl font-bold">How can we help?</h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">

                Choose a support route or send your requirement to the NLETA

                team.

              </p>

              <div className="mt-7 flex flex-col gap-3">

                <Link href="/contact" className="button-primary">

                  Submit a Service Enquiry <Arrow />

                </Link>

                <Link

                  href="/contact"

                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"

                >

                  Contact NLETA <Arrow />

                </Link>

                <Link

                  href="/contact"

                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"

                >

                  Customer Login <Arrow />

                </Link>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>

      {/* Certificate verification */}

      <section className="section-padding bg-blue-50/70" id="certificate-verification">

        <div className="container-shell">

          <ScrollReveal>

            <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">

              <div className="max-w-3xl">

                <span className="eyebrow">Certificate Download & Verification</span>

                <h2 className="section-title mt-4">

                  Verify Certificate Details Through the Designated Digital Process

                </h2>

                <p className="body-copy mt-4">

                  Use the certificate verification facility to search for an

                  eligible NLETA-issued certificate or reference record.

                </p>

                <p className="mt-4 text-sm leading-6 text-slate-500">

                  Where the record is verified and applicable permissions allow

                  it, the system may display certificate details and provide an

                  authorised download. Certificate release remains subject to

                  NLETA&apos;s technical review, approval and document-control

                  procedures.

                </p>

              </div>

              <div className="mt-7 shrink-0 lg:mt-0">

                <Link href="/certificate-verification" className="button-primary">

                  Verify Certificate <Arrow />

                </Link>

                <Link

                  href="/contact"

                  className="mt-4 block text-sm font-semibold text-nleta-blue hover:underline"

                >

                  Need assistance with certificate verification?

                </Link>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>

      {/* Regional service presence */}

      <section className="section-padding bg-white" id="regional-presence">

        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <ScrollReveal direction="left">

            <span className="eyebrow">Regional Service Presence</span>

            <h2 className="section-title mt-4">

              Service Presence Across Multiple Regions

            </h2>

            <p className="body-copy mt-4">

              NLETA&apos;s service presence includes the following regions,

              subject to service availability and the applicable scope of

              engagement.

            </p>

            <Link href="/contact" className="button-primary mt-7">

              Enquire About Service Availability <Arrow />

            </Link>

          </ScrollReveal>

          <div className="grid gap-3 sm:grid-cols-2">

            {regions.map((region, index) => (

              <ScrollReveal

                key={region}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <div className="flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-nleta-blue">

                    <Arrow />

                  </span>

                  <span className="text-sm font-semibold text-nleta-navy">

                    {region}

                  </span>

                </div>

              </ScrollReveal>

            ))}

          </div>

        </div>

      </section>

      {/* Final CTA */}

      <section className="home-contact-cta relative isolate overflow-hidden bg-nleta-navy py-16 text-white sm:py-20">

        <div

          aria-hidden="true"

          className="home-hero-glow pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl"

        />

        <div className="container-shell relative">

          <ScrollReveal>

            <div className="mb-5 flex h-1 w-20 overflow-hidden rounded-full">

              <span className="w-1/3 bg-[#ff9933]" />

              <span className="w-1/3 bg-white" />

              <span className="w-1/3 bg-[#138808]" />

            </div>

            <span className="eyebrow !text-teal-300">Let&apos;s work together</span>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">

              How Can NLETA Support Your Requirement?

            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">

              Whether you represent a residential society, public-sector

              organisation, lift company, corporate facility, training

              institution or employer, start by selecting the requirement

              relevant to you.

            </p>

          </ScrollReveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {[

              ["Engineering Services", "/engineering-services"],

              ["Services for Other Sectors", "/sectors"],

              ["Services for Lift / Vertical Transportation Companies", "/industries"],

              ["Training & Certifications", "/training"],

              ["Employer Connect", "/employment"],

              ["Customer Service", "/contact"],

            ].map(([label, href], index) => (

              <ScrollReveal

                key={label}

                delay={((index % 3) + 1) as 1 | 2 | 3}

                className="h-full"

              >

                <Link

                  href={href}

                  className="flex h-full min-h-14 items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm font-semibold text-white transition hover:border-teal-300/60 hover:bg-white/10"

                >

                  {label}

                  <Arrow />

                </Link>

              </ScrollReveal>

            ))}

          </div>

          <Link href="/contact" className="button-primary mt-8">

            Submit an Enquiry <Arrow />

          </Link>

        </div>

      </section>

    </div>

  );

}
