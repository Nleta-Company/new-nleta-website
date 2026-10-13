
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const resources = [
  {
    id: "RES-001",
    title: "Lift Safety Awareness Guide",
    category: "Safety Guides",
    description:
      "A planned resource covering general lift safety awareness, safe usage and responsibilities of building stakeholders.",
    format: "PDF",
    audience: "Building owners & residents",
    status: "Planned",
  },
  {
    id: "RES-002",
    title: "Technical Inspection Preparation",
    category: "Technical Guidance",
    description:
      "A proposed guide to organizing equipment information, relevant records and access before a technical inspection.",
    format: "PDF",
    audience: "Facility & technical teams",
    status: "Planned",
  },
  {
    id: "RES-003",
    title: "Maintenance Record Checklist",
    category: "Checklists",
    description:
      "A proposed checklist structure for organizing maintenance records and documenting relevant observations.",
    format: "PDF",
    audience: "Facility managers",
    status: "Planned",
  },
  {
    id: "RES-004",
    title: "Incident Reporting Essentials",
    category: "Safety Guides",
    description:
      "General guidance on recording observations, reporting incidents and communicating safety concerns.",
    format: "PDF",
    audience: "Building & operations teams",
    status: "Planned",
  },
  {
    id: "RES-005",
    title: "Industry Standards Reference",
    category: "Standards References",
    description:
      "A planned index of relevant standards and official sources, with applicability and edition details verified before publication.",
    format: "Web reference",
    audience: "Technical professionals",
    status: "Planned",
  },
  {
    id: "RES-006",
    title: "Technical Training Information",
    category: "Training Materials",
    description:
      "Information about proposed learning areas, program requirements and training-related resources.",
    format: "PDF",
    audience: "Candidates & organizations",
    status: "Planned",
  },
];

const categories = [
  "All Resources",
  "Safety Guides",
  "Technical Guidance",
  "Checklists",
  "Standards References",
  "Training Materials",
];

export default function KnowledgeCentrePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Resources");

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory =
        category === "All Resources" || resource.category === category;

      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.audience.toLowerCase().includes(query) ||
        resource.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

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
            Knowledge & Document Library
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Technical knowledge, organized in one place.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            A central resource area for approved guidance, safety awareness
            material, checklists, standards references and training documents.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="#library" className="button-primary">
              Explore Resources <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read Case Studies
            </Link>
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-6 text-slate-400">
            The entries currently shown are illustrative placeholders, not
            published NLETA documents. Verified files and approved references
            must be added before the library is released publicly.
          </p>
        </div>
      </section>

      <section id="library" className="section-padding scroll-mt-20 bg-white">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Resource library</p>
            <h2 className="section-title mt-4">
              Find the information you need.
            </h2>
            <p className="body-copy mt-5">
              Search by topic, audience or resource category. The search and
              category filters work with the sample entries on this page.
            </p>
          </div>

          <div className="mt-9 rounded-2xl border border-[#e1e8f0] bg-[#f8fafc] p-4 md:p-6">
            <label
              htmlFor="resource-search"
              className="mb-2 block text-sm font-semibold text-[#102844]"
            >
              Search the library
            </label>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  ⌕
                </span>
                <input
                  id="resource-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search safety, technical guidance, checklists..."
                  className="min-h-12 w-full rounded-lg border border-[#d8e1eb] bg-white py-3 pl-11 pr-4 text-sm text-[#102844] outline-none transition placeholder:text-slate-400 focus:border-[#2465a7] focus:ring-2 focus:ring-[#2465a7]/10"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Resources");
                }}
                className="min-h-12 rounded-lg border border-[#d8e1eb] bg-white px-5 py-3 text-sm font-semibold text-[#102844] transition hover:border-[#2465a7]"
              >
                Clear filters
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => {
                const isActive = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={isActive}
                    className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition ${
                      isActive
                        ? "border-[#2465a7] bg-[#2465a7] text-white"
                        : "border-[#d8e1eb] bg-white text-slate-600 hover:border-[#2465a7] hover:text-[#2465a7]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <p
              className="mt-5 text-sm text-slate-500"
              aria-live="polite"
            >
              Showing {filteredResources.length} of {resources.length} sample
              resources
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => (
              <article
                key={resource.id}
                className="flex h-full flex-col rounded-2xl border border-[#e1e8f0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b7d0e8] hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf5fc] text-sm font-bold text-[#2465a7]">
                    {resource.format === "PDF" ? "PDF" : "WEB"}
                  </span>

                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                    {resource.status}
                  </span>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#2465a7]">
                  {resource.category}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-snug text-[#102844]">
                  {resource.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {resource.description}
                </p>

                <div className="mt-5 border-t border-[#e1e8f0] pt-4">
                  <p className="text-xs text-slate-500">Intended audience</p>
                  <p className="mt-1 text-sm font-medium text-[#102844]">
                    {resource.audience}
                  </p>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  This placeholder resource is not available for download.
                </p>
              </article>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-[#d8e1eb] px-6 py-14 text-center">
              <h3 className="text-lg font-bold text-[#102844]">
                No matching resources
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try another search term or select a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Resources");
                }}
                className="button-primary mt-5"
              >
                Show all resources
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-[#f3f6fa]">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow">Document governance</p>
              <h2 className="section-title mt-4">
                Reliable resources need clear ownership.
              </h2>
              <p className="body-copy mt-5">
                Before a resource becomes public, its source, review status,
                publication permissions and revision information should be
                checked. Restricted documents should be available only to
                authorized users.
              </p>
              <Link
                href="/certifications"
                className="button-primary mt-8"
              >
                View Certifications & Standards{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e1e8f0] bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#102844]">
                Recommended document metadata
              </h3>

              <ul className="mt-6 space-y-4">
                {[
                  "Document title and unique reference",
                  "Resource category and intended audience",
                  "Source, owner and publication permissions",
                  "Version, revision date and review status",
                  "Public or restricted access classification",
                  "Approved file and accessible download link",
                ].map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8f8f5] text-xs font-bold text-[#07877f]">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
                  Knowledge sharing
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Looking for a specific technical resource?
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  Contact NLETA to discuss a document, technical topic or
                  knowledge-sharing requirement.
                </p>
              </div>

              <Link
                href="/contact?interest=knowledge-resource"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#102844] transition hover:bg-slate-100"
              >
                Make an Enquiry <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
