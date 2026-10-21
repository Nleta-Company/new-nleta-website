import Link from "next/link";
import {
  accidentMetrics,
  accidentReports,
  accidentStates,
  accidentYearSummaries,
  latestNews,
} from "./newsData";
import AccidentReportsClient from "./AccidentReportsClient";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* =========================================================
          NEWS HERO
      ========================================================= */}
      <section
        className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden bg-[#071b2f] bg-cover bg-center text-white sm:min-h-[600px]"
        style={{
          backgroundImage: "url('/images/nleta-news-bg.png')",
          backgroundPosition: "center center",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cyan-300 sm:w-12" />

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              NLETA Information Centre
            </p>

            <span className="h-px w-10 bg-cyan-300 sm:w-12" />
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            News &amp; Accidental Reports
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
            Stay informed with the latest NLETA news, engineering developments,
            safety information, industry updates and accidental report records.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#news"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Latest News
              <span className="ml-2">↓</span>
            </Link>

            <Link
              href="#accidental-report"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Accidental Reports
              <span className="ml-2">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          NEWS SECTION
      ========================================================= */}
      <section id="news" className="scroll-mt-24 bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                NLETA News Centre
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Latest News
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Latest NLETA updates, monthly activities, safety information,
                engineering developments and industry or regulatory news.
              </p>
            </div>

            <div className="shrink-0 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold text-sky-700 shadow-sm">
              {latestNews.length} Demo Articles
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <article
                key={item.slug}
                className={`group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  item.important
                    ? "border-sky-300 ring-1 ring-sky-100"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    {item.category}
                  </span>

                  {item.important && (
                    <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      Important
                    </span>
                  )}
                </div>

                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {item.date}
                </p>

                <h3 className="mt-2 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-sky-800">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {item.summary}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">
                    Source:{" "}
                    <span className="font-medium text-slate-600">
                      {item.source}
                    </span>
                  </p>

                  <Link
                    href={`/news/${item.slug}`}
                    className="mt-3 inline-flex items-center text-sm font-semibold text-sky-700 transition group-hover:text-sky-900"
                  >
                    Read full article
                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCIDENT & INCIDENT REPORTS
      ========================================================= */}
      <section
        id="accidental-report"
        className="scroll-mt-24 bg-[#f4f0e8] py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#171247] sm:text-3xl">
              Accident &amp; Incident Reports
            </h2>

            <span className="rounded-md bg-[#171247] px-4 py-2 text-xs font-bold text-white">
              Demo Data
            </span>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {accidentMetrics.map((metric) => {
              const toneClasses = {
                navy: "bg-[#171247] border-[#171247]",
                red: "bg-[#e52f43] border-[#e52f43]",
                orange: "bg-[#ff8a00] border-[#ff8a00]",
                blue: "bg-[#176cf0] border-[#176cf0]",
                gray: "bg-[#69727b] border-[#69727b]",
              };

              return (
                <div
                  key={metric.label}
                  className={`rounded-md border px-5 py-4 text-center text-white shadow-sm ${toneClasses[metric.tone]}`}
                >
                  <p className="text-3xl font-bold tracking-tight">
                    {metric.value}
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-md bg-[#171247] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#241b65]"
            >
              ▣ Old News (Before 2023)
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <label htmlFor="accident-state" className="whitespace-nowrap">
                Select State:
              </label>

              <select
                id="accident-state"
                defaultValue="All States"
                className="min-w-[175px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {accidentStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {accidentYearSummaries.map((year) => (
              <div
                key={year.year}
                className="rounded-md bg-[#171247] p-4 text-white shadow-sm"
              >
                <div className="border-b border-white/25 pb-2">
                  <p className="text-sm font-bold text-orange-400">
                    {year.year}
                  </p>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px]">
                  <div className="flex justify-between gap-4">
                    <span>Total Cases</span>
                    <strong>{year.totalCases}</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Fatal</span>
                    <strong>{year.fatal}</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Injured</span>
                    <strong>{year.injured}</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Trapped</span>
                    <strong>{year.trapped}</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Other</span>
                    <strong>{year.other}</strong>
                  </div>
                </div>

                <div className="mt-3 border-t border-white/25 pt-2 text-[10px] font-bold uppercase text-orange-400">
                  All States
                  <span className="float-right">▼</span>
                </div>
              </div>
            ))}
          </div>

          <AccidentReportsClient reports={accidentReports} />
        </div>
      </section>

      {/* =========================================================
          DEMO DATA NOTICE
      ========================================================= */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Official NLETA Information
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            The news and accidental report records currently shown on this
            page are temporary demonstration data for frontend testing. They
            must be replaced with verified NLETA information before public
            publication.
          </p>
        </div>
      </section>
    </div>
  );
}
