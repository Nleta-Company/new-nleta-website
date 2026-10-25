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
        {/* Dark cinematic overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,12,24,0.78)_0%,rgba(7,27,47,0.72)_45%,rgba(3,12,24,0.92)_100%)]"
        />

        {/* Subtle blue glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[110px]"
        />

        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:52px_52px]"
        />

        {/* Decorative borders */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f0e8] to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-28">
          {/* Eyebrow */}
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cyan-300/80 sm:w-12" />

            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300 sm:text-xs">
                NLETA Information Centre
              </p>
            </div>

            <span className="h-px w-8 bg-cyan-300/80 sm:w-12" />
          </div>

          {/* Main heading */}
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            News &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">
              Accidental Reports
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-200/90 sm:text-base sm:leading-8 lg:text-lg">
            Stay informed with the latest NLETA engineering developments,
            safety information, industry updates and verified accidental
            report records.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#accidental-report"
              className="group inline-flex items-center rounded-full bg-blue-900 px-6 py-3 text-sm font-bold text-[#171247] shadow-[0_10px_35px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-1000 hover:shadow-[0_14px_40px_rgba(34,211,238,0.18)]"
            >
              Explore Accidental Reports
              <span className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>

          {/* Small status indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-300/80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            Official information portal
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCIDENT & INCIDENT REPORTS
      ========================================================= */}
      <section
        id="accidental-report"
        className="relative scroll-mt-24 overflow-hidden bg-[#f4f0e8] py-14 sm:py-16 lg:py-20"
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#171247]/[0.035] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-orange-400/[0.05] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          {/* Section heading */}
          <div className="flex flex-col gap-4 border-b border-slate-300/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#171247]/60">
                  Safety &amp; Information
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#171247] sm:text-3xl lg:text-[34px]">
                Accident &amp; Incident Reports
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Verified accident and incident records published through the
                NLETA information system.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              Live Data
            </div>
          </div>

          {/* Reports */}
          <div className="mt-8">
            <AccidentReportsClient />
          </div>
        </div>
      </section>

      {/* =========================================================
          OFFICIAL NLETA INFORMATION
      ========================================================= */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#171247]/30 to-transparent"
        />

        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171247]/5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-[#171247]"
              aria-hidden="true"
            >
              <path
                d="M12 3L4 7.5V12C4 16.8 7.4 20.9 12 22C16.6 20.9 20 16.8 20 12V7.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
            Official NLETA Information
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Accident and incident report records published on this page are
            retrieved from the official NLETA information system.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              Verified Records
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              Official Data
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              NLETA
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}