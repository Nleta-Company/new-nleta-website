
import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "RWA & Residential Societies",
    description:
      "Explore topics relevant to residential buildings, resident welfare associations, facility managers and lift safety awareness.",
    topics: [
      "Lift safety awareness",
      "Callback and complaint management",
      "Maintenance coordination",
      "Resident communication",
    ],
  },
  {
    number: "02",
    title: "Government, Semi-Government & MRTS",
    description:
      "A category for reviewed technical inputs concerning public facilities, transit environments and institutional operations.",
    topics: [
      "Public safety considerations",
      "Operational coordination",
      "Technical documentation",
      "Risk and incident learning",
    ],
  },
  {
    number: "03",
    title: "Other Industries & Technical Inputs",
    description:
      "Technical learning material for industrial facilities, commercial buildings and other relevant operating environments.",
    topics: [
      "Equipment risk awareness",
      "Engineering observations",
      "Facility management practices",
      "Industry-specific lessons",
    ],
  },
];

const reviewPrinciples = [
  {
    number: "01",
    title: "Source reviewed",
    description:
      "Supporting references and available evidence should be checked before a case study is published.",
  },
  {
    number: "02",
    title: "Technical review",
    description:
      "Technical statements and safety lessons should be reviewed by an appropriately designated reviewer.",
  },
  {
    number: "03",
    title: "Version controlled",
    description:
      "Published material should identify its review status, revision date and approval information where applicable.",
  },
];

const publicationFields = [
  "Case study title and category",
  "Summary and operating context",
  "Observed issue or technical challenge",
  "Evidence and source references",
  "Safety lessons and recommendations",
  "Reviewer, revision and publication date",
];

export default function CaseStudiesPage() {
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
            Case Studies & Industry Inputs
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Turning technical observations into practical learning.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            A structured knowledge area for reviewed case studies, industry
            observations, safety lessons and technical inputs across relevant
            sectors.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="#categories" className="button-primary">
              Explore Categories <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact?interest=technical-input"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Submit an Enquiry
            </Link>
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-400">
            Case studies and technical inputs should be published only after
            the relevant evidence, permissions, technical review and approval
            requirements have been addressed.
          </p>
        </div>
      </section>

      <section id="categories" className="section-padding bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Explore by category</p>
            <h2 className="section-title mt-4">
              Industry knowledge, organized by context.
            </h2>
            <p className="body-copy mt-5">
              Browse the planned categories to identify material relevant to
              your building, organization or technical environment. Individual
              publications can be added as they are reviewed and approved.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.number}
                className="flex h-full flex-col rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50 md:p-7"
              >
                <span className="text-sm font-bold tracking-widest text-[#2465a7]">
                  CATEGORY {category.number}
                </span>

                <h3 className="mt-6 text-xl font-bold leading-snug text-[#102844]">
                  {category.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-6 border-t border-[#e1e8f0] pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Potential subject areas
                  </p>
                  <ul className="mt-4 space-y-3">
                    {category.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 font-bold text-[#12a6a0]"
                        >
                          ✓
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?category=${encodeURIComponent(category.title)}`}
                  className="mt-7 inline-flex items-center gap-2 border-t border-[#e1e8f0] pt-5 text-sm font-bold text-[#2465a7] transition hover:text-[#102844]"
                >
                  Ask about this category <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Publication framework</p>
              <h2 className="section-title mt-4">
                Evidence first. Clear lessons. Traceable revisions.
              </h2>
              <p className="body-copy mt-5">
                A consistent publication format helps readers understand the
                context of a technical observation and distinguish verified
                information from recommendations or general awareness content.
              </p>
              <Link
                href="/knowledge-centre"
                className="button-primary mt-8"
              >
                Visit Knowledge Centre <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e1e8f0] bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#102844]">
                Suggested case study structure
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fields to consider when preparing a publication.
              </p>

              <ul className="mt-6 space-y-4">
                {publicationFields.map((field, index) => (
                  <li key={field} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf5fc] text-xs font-bold text-[#2465a7]">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-700">
                      {field}
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
            <p className="eyebrow">Quality & governance</p>
            <h2 className="section-title mt-4">
              Responsible technical publishing.
            </h2>
            <p className="body-copy mt-5">
              Each publication should have an appropriate review trail so
              readers can understand its status and the basis of its
              recommendations.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviewPrinciples.map((principle) => (
              <article
                key={principle.number}
                className="rounded-2xl border border-[#e1e8f0] p-6 md:p-7"
              >
                <span className="text-sm font-bold tracking-widest text-[#12a6a0]">
                  {principle.number}
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#102844]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {principle.description}
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
                  Share an industry requirement
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Have a technical question or industry input?
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  Contact NLETA to discuss a potential case study, technical
                  topic or knowledge-sharing requirement.
                </p>
              </div>

              <Link
                href="/contact?interest=technical-input"
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
