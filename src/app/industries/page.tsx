import Link from "next/link";

const industries = [
  {
    number: "01",
    title: "Lifts & Escalators",
    description:
      "Safety awareness, technical assessment, inspection-related support and lifecycle improvement for vertical transportation systems, subject to applicable scope and authorization.",
    tags: ["Passenger lifts", "Goods lifts", "Escalators"],
  },
  {
    number: "02",
    title: "Industrial Lifting Equipment",
    description:
      "Technical safety awareness and assessment support for industrial lifting environments, with equipment-specific work undertaken only where applicable authorization permits.",
    tags: ["Lifting operations", "Equipment safety", "Risk awareness"],
  },
  {
    number: "03",
    title: "Metro, Railway & MRTS",
    description:
      "Technical safety, operational awareness and suitable engineering support for transit infrastructure and associated vertical transportation systems.",
    tags: ["Metro infrastructure", "Railway facilities", "Public transit"],
  },
  {
    number: "04",
    title: "Manufacturing & Industrial Facilities",
    description:
      "Support for organizations seeking better equipment-safety practices, technical documentation, risk awareness and structured compliance processes.",
    tags: ["Manufacturing", "Plant facilities", "Workplace safety"],
  },
  {
    number: "05",
    title: "Infrastructure & Facility Management",
    description:
      "Structured support for facility teams, property operators and infrastructure managers responsible for safe, reliable building services.",
    tags: ["Facility teams", "Building operations", "Asset records"],
  },
  {
    number: "06",
    title: "Corporate & Institutional Training",
    description:
      "Technical awareness and skill-development programs designed around the needs of eligible organizations, personnel and applicable training requirements.",
    tags: ["Corporate programs", "Technical awareness", "Skill development"],
  },
];

const principles = [
  {
    title: "Scope before service",
    description:
      "The applicable equipment category, service scope and authorization are reviewed before work is confirmed.",
  },
  {
    title: "Safety-led approach",
    description:
      "Safety awareness, documented observations and clear communication are central to responsible engineering support.",
  },
  {
    title: "Industry-specific needs",
    description:
      "Engagements are planned around the facility, operating environment and requirements of the organization.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="industries-hero relative isolate overflow-hidden bg-[#102844] bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(7,24,43,0.92) 0%, rgba(7,24,43,0.82) 52%, rgba(7,24,43,0.76) 100%), url('/images/nleta-industries-bg.png')",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="hero-glow absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#12a6a0] blur-3xl" />
          <div className="hero-glow hero-glow-delay absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#2465a7] blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07182b]/30" />
        </div>

        <div className="container-shell relative py-20 text-center md:py-28">
          <div className="industries-reveal mx-auto mb-6 flex h-1 w-24 overflow-hidden rounded-full">
            <span className="w-1/3 bg-[#ff9933]" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-[#138808]" />
          </div>

          <p className="industries-reveal industries-delay-1 mb-4 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
            Industries & Applications
          </p>

          <h1 className="industries-reveal industries-delay-1 mx-auto max-w-5xl text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] md:text-6xl lg:text-7xl">
            Engineering support for a{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-white to-teal-200 bg-clip-text text-transparent">
              wider range
            </span>{" "}
            of industries.
          </h1>

          <p className="industries-reveal industries-delay-2 mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
            From lifts and escalators to transit infrastructure, industrial
            facilities and institutional training, explore NLETA&apos;s
            industry-focused service areas.
          </p>

          <div className="industries-reveal industries-delay-3 mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-950/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/30"
            >
              Discuss Your Requirements
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/engineering-services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10"
            >
              Explore Engineering Services
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <p className="industries-reveal industries-delay-3 mx-auto mt-6 max-w-3xl text-xs leading-6 text-slate-300">
            Services depend on the specific equipment, applicable requirements
            and NLETA&apos;s confirmed scope and authorization. Listing an
            industry does not itself establish authorization to inspect or
            certify every equipment type.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="section-padding overflow-hidden bg-white">
        <div className="container-shell">
          <div className="industries-section-heading max-w-3xl">
            <p className="eyebrow">Industry coverage</p>

            <h2 className="section-title mt-4">
              Different environments. Clearer safety priorities.
            </h2>

            <p className="body-copy mt-5">
              Every operating environment has its own technical requirements.
              Explore these industry categories to identify the type of support
              relevant to your organization.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry, index) => (
              <article
                key={industry.number}
                style={{ animationDelay: `${index * 100}ms` }}
                className="industry-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-[#b7d0e8] hover:shadow-2xl hover:shadow-slate-200/70 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="industry-card-accent absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#2465a7] via-[#12a6a0] to-[#2465a7] transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-[#2465a7]">
                    {industry.number}
                  </span>

                  <span
                    aria-hidden="true"
                    className="industry-card-icon flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf5fc] text-lg text-[#2465a7] transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#2465a7] group-hover:text-white"
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-[#102844] transition-colors duration-300 group-hover:text-[#2465a7]">
                  {industry.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {industry.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {industry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f3f6fa] px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-300 group-hover:bg-[#edf5fc]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/contact?industry=${encodeURIComponent(industry.title)}`}
                  className="mt-7 inline-flex items-center gap-2 border-t border-[#e1e8f0] pt-5 text-sm font-bold text-[#2465a7] transition-colors duration-300 hover:text-[#102844]"
                >
                  Discuss this industry
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="section-padding overflow-hidden bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="approach-intro">
              <p className="eyebrow">Our approach</p>

              <h2 className="section-title mt-4">
                The right scope. The right process.
              </h2>

              <p className="body-copy mt-5">
                Industry-specific support should begin with understanding the
                requirement—not assuming that one service applies to every
                facility or equipment category.
              </p>

              <Link
                href="/contact"
                className="button-primary mt-8 inline-flex"
              >
                Start an Enquiry
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="principle-card flex gap-5 rounded-xl border border-[#e1e8f0] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-lg hover:shadow-slate-200/60 md:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#102844] text-sm font-bold text-white transition duration-300 hover:bg-[#2465a7]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-bold text-[#102844]">
                      {principle.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-16">
        <div className="container-shell">
          <div className="industries-cta relative overflow-hidden rounded-2xl bg-[#102844] px-6 py-10 text-white md:px-12 md:py-14">
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-1 w-36 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12a6a0]/15 blur-3xl"
            />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Let&apos;s work together
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Looking for industry-specific support?
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  Share your equipment category, location and requirements so
                  the appropriate next steps can be discussed.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-[#102844] transition duration-300 hover:-translate-y-1 hover:bg-green-400"
              >
                Contact NLETA
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}