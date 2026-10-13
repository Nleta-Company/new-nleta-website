

"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

const programs = [

  {

    number: "01",

    title: "Technical & Vocational Training",

    category: "TECHNICAL SKILLS",

    icon: "⚙️",

    description:

      "Develop foundational technical knowledge and industry-oriented skills for the lift and escalator sector.",

    audience: "ITI students, diploma holders and technical graduates",

    topics: [

      "Lift and escalator fundamentals",

      "Equipment components and technical terminology",

      "Safety principles and safe working practices",

      "Technical documentation and workplace discipline",

      "Practical exposure where applicable",

    ],

    enquiry: "Student Enquiry",

    interest: "technical-training",

  },

  {

    number: "02",

    title: "Skill India Training Pathways",

    category: "SKILL DEVELOPMENT",

    icon: "🎓",

    description:

      "Discuss eligibility for applicable Skill India training and certification pathways, subject to NLETA’s verified authorisation and the relevant programme rules.",

    audience: "Eligible candidates seeking recognised skill development",

    topics: [

      "Programme and course information",

      "Candidate eligibility guidance",

      "Registration guidance",

      "Learning and assessment requirements",

      "Certification under the applicable programme",

    ],

    enquiry: "Explore Certification",

    interest: "skill-india-training",

  },

  {

    number: "03",

    title: "Existing Technician Development",

    category: "TECHNICIAN TRAINING",

    icon: "🛠️",

    description:

      "Support working technicians seeking refresher learning, competency development and guidance on eligible certification pathways.",

    audience: "Technicians and existing service personnel",

    topics: [

      "Review of existing qualifications and experience",

      "Technical refresher learning",

      "Safety awareness and work practices",

      "Documentation and communication skills",

      "Applicable assessment pathways",

    ],

    enquiry: "Existing Technician Training",

    interest: "technician-training",

  },

  {

    number: "04",

    title: "QRT & Lift Safety Governance",

    category: "QRT TRAINING",

    icon: "🛡️",

    description:

      "Prepare designated building and facility personnel for first-level safety reporting, escalation and coordination.",

    audience: "Facility managers, building teams and designated QRT personnel",

    topics: [

      "Understanding QRT roles and limitations",

      "Recognising and reporting abnormal lift behaviour",

      "Complaint and callback reporting",

      "Safety escalation and user communication",

      "Emergency-readiness awareness",

      "Coordination with authorised service personnel",

      "Digital Governance System (DGS) workflows",

    ],

    enquiry: "QRT Training Enquiry",

    interest: "qrt-training",

  },

  {

    number: "05",

    title: "Corporate Safety & Awareness",

    category: "CORPORATE TRAINING",

    icon: "🏢",

    description:

      "Strengthen safety awareness and emergency preparedness among employees, institutions and facility teams.",

    audience: "Companies, institutions and organisational teams",

    topics: [

      "Lift and escalator user safety",

      "Workplace safety and hazard awareness",

      "Fire safety and evacuation awareness",

      "First-aid training through qualified providers",

      "Safe driving and two-wheeler safety",

      "Working-at-height safety awareness",

      "Emergency preparedness and coordination",

    ],

    enquiry: "Corporate Training Enquiry",

    interest: "corporate-training",

  },

  {

    number: "06",

    title: "Manager & Supervisor Development",

    category: "LEADERSHIP",

    icon: "👥",

    description:

      "Build professional responsibility, communication and effective safety coordination in daily operations.",

    audience: "Frontline managers, supervisors and team leaders",

    topics: [

      "Safety leadership and accountability",

      "Team and contractor coordination",

      "Complaint escalation and follow-up",

      "Incident reporting and documentation",

      "Toolbox talks and safety briefings",

      "Customer and public communication",

    ],

    enquiry: "Corporate Training Enquiry",

    interest: "supervisor-development",

  },

  {

    number: "07",

    title: "Soft Skills & Professional Development",

    category: "PROFESSIONAL SKILLS",

    icon: "💬",

    description:

      "Combine technical knowledge with professional conduct, workplace communication and job readiness.",

    audience: "Students, technicians and working professionals",

    topics: [

      "Professional communication",

      "Email and WhatsApp etiquette",

      "Technical report-writing fundamentals",

      "Customer interaction and teamwork",

      "Time management and accountability",

      "Interview and job-readiness preparation",

    ],

    enquiry: "Student Enquiry",

    interest: "professional-development",

  },

  {

    number: "08",

    title: "Practical Training & Industry Exposure",

    category: "PRACTICAL LEARNING",

    icon: "🔧",

    description:

      "Connect classroom learning with workplace expectations through suitable practical activities and supervised exposure.",

    audience: "Eligible candidates and technical learners",

    topics: [

      "Practical demonstrations where available",

      "Supervised field exposure where arranged",

      "Workplace safety orientation",

      "On-the-job training where applicable",

      "Feedback and competency development",

    ],

    enquiry: "Student Enquiry",

    interest: "practical-training",

  },

  {

    number: "09",

    title: "Employer Connect",

    category: "CAREER & WORKFORCE",

    icon: "🤝",

    description:

      "Give employers a structured way to share workforce requirements and explore potentially suitable candidates from relevant training batches.",

    audience: "Employers, companies and eligible candidates",

    topics: [

      "Job roles and location requirements",

      "Required qualifications and competencies",

      "Experience and shift expectations",

      "Workplace and operational requirements",

      "Candidate referral coordination where applicable",

    ],

    enquiry: "Employer Connect",

    interest: "employer-connect",

  },

  {

    number: "10",

    title: "Training Management & Quality",

    category: "LEARNING GOVERNANCE",

    icon: "📋",

    description:

      "Support structured learning through defined objectives, appropriate trainers and documented assessment processes.",

    audience: "Training teams and organisational clients",

    topics: [

      "Course outlines and learning objectives",

      "Attendance and participation records",

      "Learning and practical assessments",

      "Training completion records",

      "Feedback and improvement processes",

      "Certification details where applicable",

    ],

    enquiry: "Corporate Training Enquiry",

    interest: "training-management",

  },

];

const steps = [

  {

    number: "01",

    title: "Share your requirements",

    description:

      "Tell us about your background, organisation, participants and learning objectives.",

  },

  {

    number: "02",

    title: "Review the programme",

    description:

      "Discuss course scope, eligibility, syllabus, delivery format and applicable fees.",

  },

  {

    number: "03",

    title: "Confirm arrangements",

    description:

      "Confirm trainer availability, schedule, practical exposure and assessment arrangements where applicable.",

  },

  {

    number: "04",

    title: "Begin learning",

    description:

      "Participate in the agreed programme and receive only the completion records or certification applicable to it.",

  },

];

const audiences = [

  "ITI students and graduates",

  "Diploma holders and technical graduates",

  "Existing technicians and service personnel",

  "Lift and escalator companies",

  "Facility management teams",

  "Corporate and industrial employers",

  "Frontline managers and supervisors",

  "Eligible public-sector and institutional organisations",

];

type GalleryMedia = {
  id: string;
  title: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl: string | null;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function TrainingGallery() {
  const [filter, setFilter] = useState<"All" | "Photos" | "Videos">("All");
  const [media, setMedia] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadGallery() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/gallery/media`, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Gallery request failed (${response.status}).`);
        }

        const result: unknown = await response.json();
        let records: unknown[] = [];

        if (Array.isArray(result)) {
          records = result;
        } else if (result && typeof result === "object") {
          const payload = result as {
            data?: unknown;
            items?: unknown;
          };

          if (Array.isArray(payload.data)) {
            records = payload.data;
          } else if (Array.isArray(payload.items)) {
            records = payload.items;
          } else if (
            payload.data &&
            typeof payload.data === "object" &&
            "items" in payload.data
          ) {
            const nested = (payload.data as { items?: unknown }).items;
            if (Array.isArray(nested)) records = nested;
          }
        }

        const validMedia = records.filter(
          (item): item is GalleryMedia => {
            if (!item || typeof item !== "object") return false;

            const record = item as Partial<GalleryMedia>;

            return (
              typeof record.id === "string" &&
              typeof record.title === "string" &&
              (record.type === "PHOTO" || record.type === "VIDEO") &&
              typeof record.url === "string" &&
              record.url.length > 0
            );
          },
        );

        setMedia(validMedia);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        console.error("Could not load training gallery:", err);
        setError(
          "Training gallery is temporarily unavailable. Please try again later.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadGallery();
    return () => controller.abort();
  }, []);

  const visibleMedia = media.filter((item) => {
    if (filter === "Photos") return item.type === "PHOTO";
    if (filter === "Videos") return item.type === "VIDEO";
    return true;
  });

  return (
    <section
      id="training-gallery"
      aria-label="NLETA training gallery"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#07182b] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0d9488]/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#2465a7]/20 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
            Learning in action
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            NLETA Training Gallery
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Explore training sessions, practical learning and safety awareness
            activities.
          </p>
        </div>

        <div className="mb-6 flex justify-center sm:mb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.06] p-1 shadow-lg backdrop-blur-xl">
            {(["All", "Photos", "Videos"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`min-w-[76px] rounded-lg px-4 py-2 text-sm font-semibold transition sm:min-w-[100px] ${filter === item
                    ? "bg-gradient-to-r from-[#0d9488] to-[#12a6a0] text-white shadow-md"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div
            role="status"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-10 text-center text-sm text-slate-300"
          >
            Loading training gallery…
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-8 text-center text-sm text-red-200"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 rounded-lg border border-red-300/40 px-4 py-2 font-semibold hover:bg-red-500/10"
            >
              Reload page
            </button>
          </div>
        )}

        {!loading && !error && visibleMedia.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {visibleMedia.map((item, index) => (
              <article
                key={item.id}
                className="group relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#102844] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:shadow-xl"
              >
                {item.type === "PHOTO" ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open photo in a new tab"
                    className="relative block aspect-[4/3] overflow-hidden bg-[#0b1b2e] outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  >
                    <img
                      src={item.url}
                      alt="NLETA training activity"
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={item.thumbnailUrl || undefined}
                      aria-label="NLETA training video"
                      className="absolute inset-0 block h-full w-full object-contain"
                    >
                      <source src={item.url} type={item.mimeType} />
                      Your browser does not support this video.
                    </video>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {!loading && !error && visibleMedia.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/[0.04] px-5 py-10 text-center">
            <p className="text-base font-semibold text-white">
              No training media available yet
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Published photos and videos will appear here.
            </p>
          </div>
        )}

        {!loading && !error && media.length > 0 && (
          <p className="mt-4 text-center text-xs text-slate-400">
            Showing {visibleMedia.length} of {media.length} published items
          </p>
        )}
      </div>
    </section>
  );
}

export default function TrainingPage() {

  return (

    <main className="overflow-hidden bg-white">

      {/* HERO */}

      <section

        className="training-hero relative isolate overflow-hidden bg-[#102844] bg-cover bg-center bg-no-repeat text-white"

        style={{

          backgroundImage:

            "linear-gradient(100deg, rgba(7,24,43,0.96) 0%, rgba(7,24,43,0.89) 55%, rgba(7,24,43,0.78) 100%), url('/images/nleta-training-bg.png')",

        }}

      >

        <div

          aria-hidden="true"

          className="training-glow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#12a6a0]/25 blur-3xl"

        />

        <div

          aria-hidden="true"

          className="training-glow training-glow-delay pointer-events-none absolute -bottom-36 left-1/3 h-80 w-80 rounded-full bg-[#2465a7]/30 blur-3xl"

        />

        <div className="container-shell relative py-16 text-center sm:py-20 lg:py-24">

          <div className="mx-auto mb-6 flex h-1 w-24 overflow-hidden rounded-full">

            <span className="w-1/3 bg-[#ff9933]" />

            <span className="w-1/3 bg-white" />

            <span className="w-1/3 bg-[#138808]" />

          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">

            NLETA Learning & Development

          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">

            Training & Certifications

            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-white to-teal-200 bg-clip-text text-transparent">

              Building Skills. Strengthening Safety.

            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">

            NLETA supports technical skill development, workplace safety,

            professional competency and continuous learning for individuals,

            technicians, organisations and industry teams.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link

              href="#programs"

              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"

            >

              Explore Training <span className="ml-2">↓</span>

            </Link>

            <Link

              href="/contact?interest=training"

              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"

            >

              Enquire About Training

            </Link>

          </div>

          <p className="mx-auto mt-6 max-w-3xl text-xs leading-6 text-slate-300">

            Learn → Practise → Demonstrate Competency → Improve → Apply Safely

          </p>

        </div>

      </section>

      {/* INTRODUCTION */}

      <section className="section-padding bg-white">

        <div className="container-shell grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">

          <div className="max-w-2xl">

            <p className="eyebrow">Learning pathways</p>

            <h2 className="section-title mt-4">

              Skills for people. Safety for workplaces.

            </h2>

          </div>

          <p className="body-copy">

            Explore technical training, workplace safety, professional

            development and employer engagement. Programme availability,

            eligibility and certification depend on the applicable course

            requirements and authorisations.

          </p>

        </div>

      </section>

      {/* TRAINING PROGRAMS */}

      <section

        id="programs"

        className="section-padding scroll-mt-24 overflow-hidden bg-[#f3f6fa]"

      >

        <div className="container-shell">

          <div className="max-w-3xl">

            <p className="eyebrow">Our training categories</p>

            <h2 className="section-title mt-4">

              Find the right learning pathway.

            </h2>

            <p className="body-copy mt-5">

              Select a learning area to discuss your requirements with NLETA.

              The listed topics indicate potential coverage, not a guarantee

              that every course is currently available.

            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {programs.map((program, index) => (

              <article

                key={program.number}

                style={{ animationDelay: `${index * 70}ms` }}

                className="training-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/60 md:p-7"

              >

                <span

                  aria-hidden="true"

                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#2465a7] via-[#12a6a0] to-[#2465a7] transition-transform duration-500 group-hover:scale-x-100"

                />

                <div className="flex items-start justify-between gap-4">

                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5fc] text-xl transition duration-300 group-hover:scale-105 group-hover:bg-[#2465a7] group-hover:text-white">

                    {program.icon}

                  </span>

                  <span className="text-sm font-bold tracking-widest text-slate-300">

                    {program.number}

                  </span>

                </div>

                <p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-[#2465a7]">

                  {program.category}

                </p>

                <h3 className="mt-2 text-xl font-bold leading-snug text-[#102844] transition-colors group-hover:text-[#2465a7]">

                  {program.title}

                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">

                  {program.description}

                </p>

                <div className="mt-5 rounded-xl bg-[#f3f6fa] p-4 transition-colors group-hover:bg-[#edf5fc]">

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">

                    Intended audience

                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#102844]">

                    {program.audience}

                  </p>

                </div>

                <div className="mt-5 border-t border-[#e1e8f0] pt-5">

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">

                    Potential learning areas

                  </h4>

                  <ul className="mt-3 space-y-2.5">

                    {program.topics.map((topic) => (

                      <li

                        key={topic}

                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"

                      >

                        <span

                          aria-hidden="true"

                          className="mt-0.5 font-bold text-[#0d9488]"

                        >

                          ✓

                        </span>

                        <span>{topic}</span>

                      </li>

                    ))}

                  </ul>

                </div>

                <Link

                  href={`/contact?interest=${encodeURIComponent(program.interest)}`}

                  className="mt-6 inline-flex items-center justify-between gap-3 border-t border-[#e1e8f0] pt-5 text-sm font-bold text-[#2465a7] transition-colors hover:text-[#102844]"

                >

                  {program.enquiry}

                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">

                    →

                  </span>

                </Link>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* TRAINING GALLERY */}

      <TrainingGallery />

      {/* TRAINING PROCESS */}

      <section className="section-padding overflow-hidden bg-white">

        <div className="container-shell">

          <div className="max-w-3xl">

            <p className="eyebrow">How it works</p>

            <h2 className="section-title mt-4">

              From training enquiry to programme completion.

            </h2>

            <p className="body-copy mt-5">

              A structured process helps clarify learning objectives,

              programme scope and arrangements before participants begin.

            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {steps.map((step) => (

              <article

                key={step.number}

                className="group relative overflow-hidden rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-lg"

              >

                <span

                  aria-hidden="true"

                  className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#edf5fc] transition-colors group-hover:bg-[#dcecf9]"

                />

                <span className="relative text-sm font-bold tracking-widest text-[#12a6a0]">

                  STEP {step.number}

                </span>

                <h3 className="relative mt-5 text-lg font-bold text-[#102844]">

                  {step.title}

                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">

                  {step.description}

                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-[#12a6a0] transition-all group-hover:w-16" />

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* WHO CAN APPLY */}

      <section className="section-padding bg-[#f3f6fa]">

        <div className="container-shell">

          <div className="max-w-3xl">

            <p className="eyebrow">Who can enquire?</p>

            <h2 className="section-title mt-4">

              Learning pathways for candidates and organisations.

            </h2>

            <p className="body-copy mt-5">

              Enquiries are welcome from individuals and organisations

              interested in relevant training and workforce development.

              Participation remains subject to programme requirements.

            </p>

          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {audiences.map((audience) => (

              <div

                key={audience}

                className="flex items-start gap-3 rounded-xl border border-[#e1e8f0] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"

              >

                <span aria-hidden="true" className="font-bold text-[#0d9488]">

                  ✓

                </span>

                <span className="text-sm font-medium leading-6 text-slate-700">

                  {audience}

                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CERTIFICATION & SAFETY CLARITY */}

      <section className="section-padding bg-white">

        <div className="container-shell">

          <div className="grid gap-5 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8 md:grid-cols-[auto_1fr]">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">

              <span aria-hidden="true">ⓘ</span>

            </div>

            <div>

              <h2 className="text-xl font-bold text-[#102844]">

                Training, certification and safety responsibilities

              </h2>

              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">

                <p>

                  Certification depends on the applicable programme,

                  candidate eligibility, required assessment and authorisation.

                  Do not assume that every NLETA training course results in a

                  Skill India or Government of India certificate. The relevant

                  awarding or certifying body must be identified for each

                  eligible programme.

                </p>

                <p>

                  QRT personnel support first-level reporting, communication

                  and escalation. They do not replace authorised technicians,

                  rescue specialists, maintenance providers or competent

                  engineering inspectors. Technical diagnosis, repairs and

                  authorised rescue activities must remain with appropriately

                  qualified and authorised personnel.

                </p>

                <p>

                  Practical training, on-the-job exposure, formal assessments

                  and completion records are provided only where included in

                  the agreed programme. Placement and employment are not

                  guaranteed.

                </p>

                <p>

                  Any reference to ISO 9001, ISO 14001, ISO 21001, Skill India

                  affiliation or course-specific certification must be published

                  only after the relevant certificate, scope, validity and

                  authorisation have been verified. Management-system

                  certifications do not automatically accredit every course or

                  guarantee an individual certificate.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* EMPLOYER CONNECT */}

      <section className="section-padding bg-[#f3f6fa]">

        <div className="container-shell">

          <div className="grid gap-8 rounded-2xl border border-[#e1e8f0] bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div className="max-w-3xl">

              <p className="eyebrow">Employer Connect</p>

              <h2 className="section-title mt-4">

                Connect workforce needs with relevant skills.

              </h2>

              <p className="body-copy mt-4">

                Employers can share job roles, location requirements,

                qualifications, experience and shift expectations. Candidate

                referrals depend on eligibility, availability, candidate

                consent and the employer&apos;s own assessment.

              </p>

            </div>

            <Link

              href="/contact?interest=employer-connect"

              className="button-primary inline-flex w-fit items-center gap-2"

            >

              Employer Enquiry <span aria-hidden="true">→</span>

            </Link>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="bg-white pb-16 sm:pb-20">

        <div className="container-shell">

          <div className="training-cta relative overflow-hidden rounded-2xl bg-[#102844] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12">

            <div

              aria-hidden="true"

              className="absolute right-0 top-0 h-1 w-36 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]"

            />

            <div

              aria-hidden="true"

              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12a6a0]/15 blur-3xl"

            />

            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">

              <div className="max-w-2xl">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">

                  Take the next step

                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">

                  Let&apos;s discuss your training requirements.

                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">

                  Contact NLETA to discuss programme availability, eligibility,

                  learning objectives and suitable next steps.

                </p>

              </div>

              <Link

                href="/contact?interest=training"

                className="inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-[#102844] transition hover:-translate-y-1 hover:bg-green-700"

              >

                Contact NLETA <span aria-hidden="true">→</span>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
