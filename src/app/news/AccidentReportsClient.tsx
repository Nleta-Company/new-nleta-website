"use client";

import { useEffect, useMemo, useState } from "react";

type AccidentReportType =
  | "TRAPPED"
  | "FATAL"
  | "INJURED"
  | "OTHER";

type AccidentReport = {
  id: string;
  date: string;
  state: string;
  location: string;
  equipment: string;
  title: string;
  details: string;

  type: AccidentReportType;

  fatalities: number;
  injuries: number;
  trapped: number;
  other: number;

  sourceLink?: string | null;

  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  createdAt?: string;
  updatedAt?: string;
};

type SortOption = "latest" | "oldest";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getDateInputValue(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTypeLabel(type: AccidentReportType) {
  switch (type) {
    case "FATAL":
      return "Fatal";

    case "INJURED":
      return "Injured";

    case "TRAPPED":
      return "Trapped";

    case "OTHER":
      return "Other";

    default:
      return type;
  }
}

function getTypeBadgeClass(type: AccidentReportType) {
  switch (type) {
    case "FATAL":
      return "bg-[#e52f43] text-white";

    case "INJURED":
      return "bg-[#ff8a00] text-white";

    case "TRAPPED":
      return "bg-[#176cf0] text-white";

    case "OTHER":
      return "bg-[#69727b] text-white";

    default:
      return "bg-slate-600 text-white";
  }
}

function getImpactCount(report: AccidentReport) {
  switch (report.type) {
    case "FATAL":
      return report.fatalities;

    case "INJURED":
      return report.injuries;

    case "TRAPPED":
      return report.trapped;

    case "OTHER":
      return report.other;

    default:
      return 0;
  }
}

export default function AccidentReportsClient() {
  const [reports, setReports] = useState<AccidentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedType, setSelectedType] = useState("All Types");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [sortOrder, setSortOrder] =
    useState<SortOption>("latest");

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/accidental-reports?status=PUBLISHED`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load accident reports (${response.status})`,
          );
        }

        const data = await response.json();

        if (cancelled) {
          return;
        }

        const normalizedReports: AccidentReport[] = Array.isArray(data)
          ? data.map((report) => ({
              ...report,
              fatalities: Number(report.fatalities ?? 0),
              injuries: Number(report.injuries ?? 0),
              trapped: Number(report.trapped ?? 0),
              other: Number(report.other ?? 0),
            }))
          : [];

        setReports(normalizedReports);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load accident reports:",
          requestError,
        );

        setError(
          "Unable to load accident reports right now. Please try again.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(
        reports
          .map((report) => new Date(report.date).getFullYear())
          .filter((year) => !Number.isNaN(year)),
      ),
    );

    return [
      "All Years",
      ...uniqueYears.sort((a, b) => b - a).map(String),
    ];
  }, [reports]);

  const states = useMemo(() => {
    const uniqueStates = Array.from(
      new Set(
        reports
          .map((report) => report.state?.trim())
          .filter(Boolean),
      ),
    );

    return [
      "All States",
      ...uniqueStates.sort((a, b) =>
        a.localeCompare(b),
      ),
    ];
  }, [reports]);

  const filteredReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const reportDate = new Date(report.date);

      if (Number.isNaN(reportDate.getTime())) {
        return false;
      }

      if (
        selectedYear !== "All Years" &&
        reportDate.getFullYear() !== Number(selectedYear)
      ) {
        return false;
      }

      if (
        selectedState !== "All States" &&
        report.state !== selectedState
      ) {
        return false;
      }

      if (
        selectedType !== "All Types" &&
        report.type !== selectedType
      ) {
        return false;
      }

      if (dateFrom) {
        const fromDate = new Date(`${dateFrom}T00:00:00`);

        if (reportDate < fromDate) {
          return false;
        }
      }

      if (dateTo) {
        const toDate = new Date(`${dateTo}T23:59:59.999`);

        if (reportDate > toDate) {
          return false;
        }
      }

      return true;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "latest"
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [
    reports,
    selectedYear,
    selectedState,
    selectedType,
    dateFrom,
    dateTo,
    sortOrder,
  ]);

  const metrics = useMemo(() => {
    return {
      total: filteredReports.length,

      fatalities: filteredReports.reduce(
        (total, report) =>
          total + Number(report.fatalities || 0),
        0,
      ),

      injuries: filteredReports.reduce(
        (total, report) =>
          total + Number(report.injuries || 0),
        0,
      ),

      trapped: filteredReports.reduce(
        (total, report) =>
          total + Number(report.trapped || 0),
        0,
      ),

      other: filteredReports.reduce(
        (total, report) =>
          total + Number(report.other || 0),
        0,
      ),
    };
  }, [filteredReports]);

  const yearSummaries = useMemo(() => {
    const grouped = new Map<
      number,
      {
        totalCases: number;
        fatal: number;
        injured: number;
        trapped: number;
        other: number;
      }
    >();

    filteredReports.forEach((report) => {
      const year = new Date(report.date).getFullYear();

      if (Number.isNaN(year)) {
        return;
      }

      const existing = grouped.get(year) || {
        totalCases: 0,
        fatal: 0,
        injured: 0,
        trapped: 0,
        other: 0,
      };

      existing.totalCases += 1;
      existing.fatal += Number(report.fatalities || 0);
      existing.injured += Number(report.injuries || 0);
      existing.trapped += Number(report.trapped || 0);
      existing.other += Number(report.other || 0);

      grouped.set(year, existing);
    });

    return Array.from(grouped.entries())
      .sort(([yearA], [yearB]) => yearB - yearA)
      .map(([year, summary]) => ({
        year,
        ...summary,
      }));
  }, [filteredReports]);

  function resetFilters() {
    setSelectedYear("All Years");
    setSelectedState("All States");
    setSelectedType("All Types");
    setDateFrom("");
    setDateTo("");
    setSortOrder("latest");
  }

  return (
    <div className="mt-7">
      {/* =========================================================
          FILTER BAR
      ========================================================= */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-5">
        <div className="grid gap-3 lg:grid-cols-6">
          {/* YEAR */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Year
            </span>

            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          {/* STATE */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              State
            </span>

            <select
              value={selectedState}
              onChange={(event) =>
                setSelectedState(event.target.value)
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          {/* TYPE */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Type
            </span>

            <select
              value={selectedType}
              onChange={(event) =>
                setSelectedType(event.target.value)
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            >
              <option value="All Types">All Types</option>
              <option value="TRAPPED">Trapped</option>
              <option value="FATAL">Fatal</option>
              <option value="INJURED">Injured</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

          {/* DATE FROM */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Date From
            </span>

            <input
              type="date"
              value={dateFrom}
              onChange={(event) =>
                setDateFrom(event.target.value)
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {/* DATE TO */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Date To
            </span>

            <input
              type="date"
              value={dateTo}
              onChange={(event) =>
                setDateTo(event.target.value)
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            />
          </label>

          {/* SORT */}
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Sort
            </span>

            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  event.target.value as SortOption,
                )
              }
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#176cf0] focus:ring-2 focus:ring-blue-100"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md bg-[#171247] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#241b65]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* =========================================================
          METRICS
      ========================================================= */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          value={metrics.total}
          label="Total Cases"
          className="bg-[#171247]"
        />

        <MetricCard
          value={metrics.fatalities}
          label="Fatalities"
          className="bg-[#e52f43]"
        />

        <MetricCard
          value={metrics.injuries}
          label="Injuries"
          className="bg-[#ff8a00]"
        />

        <MetricCard
          value={metrics.trapped}
          label="Trapped"
          className="bg-[#176cf0]"
        />

        <MetricCard
          value={metrics.other}
          label="Other"
          className="bg-[#69727b]"
        />
      </div>

      {/* =========================================================
          YEAR SUMMARIES
      ========================================================= */}
      {yearSummaries.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {yearSummaries.map((summary) => (
            <div
              key={summary.year}
              className="rounded-lg border border-[#171247]/10 bg-[#171247] p-4 text-white shadow-sm"
            >
              <div className="border-b border-white/20 pb-2">
                <p className="text-sm font-bold text-orange-400">
                  {summary.year}
                </p>
              </div>

              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">
                    Total Cases
                  </span>

                  <strong>{summary.totalCases}</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">
                    Fatal
                  </span>

                  <strong>{summary.fatal}</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">
                    Injured
                  </span>

                  <strong>{summary.injured}</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">
                    Trapped
                  </span>

                  <strong>{summary.trapped}</strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/80">
                    Other
                  </span>

                  <strong>{summary.other}</strong>
                </div>
              </div>

              <div className="mt-3 border-t border-white/20 pt-2 text-[10px] font-bold uppercase tracking-wide text-orange-400">
                Filtered Results
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================
          REPORT HEADING
      ========================================================= */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#171247] sm:text-2xl">
            Accident Reports
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {loading
              ? "Loading published reports..."
              : `Showing ${filteredReports.length} published report${
                  filteredReports.length === 1 ? "" : "s"
                }`}
          </p>
        </div>
      </div>

      {/* =========================================================
          LOADING
      ========================================================= */}
      {loading && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-lg bg-[#171247] p-5"
            >
              <div className="h-3 w-20 rounded bg-white/20" />
              <div className="mt-5 h-3 w-28 rounded bg-white/20" />
              <div className="mt-2 h-6 w-3/4 rounded bg-white/20" />
              <div className="mt-3 h-3 w-full rounded bg-white/10" />
              <div className="mt-2 h-3 w-4/5 rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {/* =========================================================
          ERROR
      ========================================================= */}
      {!loading && error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-5 py-6 text-center">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* =========================================================
          REPORT CARDS
      ========================================================= */}
      {!loading && !error && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredReports.map((report) => (
            <article
              key={report.id}
              className="group flex min-h-[260px] flex-col rounded-lg border border-[#171247]/20 bg-[#171247] p-4 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(23,18,71,0.18)]"
            >
              {/* DATE */}
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-bold text-orange-400">
                  {formatDate(report.date)}
                </p>

                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold text-white/60">
                  {new Date(report.date).getFullYear()}
                </span>
              </div>

              {/* LOCATION */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/90">
                  <span className="text-pink-400">📍</span>
                  <span>{report.state}</span>
                </div>

                <p className="mt-1 text-[9px] text-white/55">
                  {report.location}
                  {report.equipment
                    ? ` · ${report.equipment}`
                    : ""}
                </p>
              </div>

              {/* TITLE */}
              <h3 className="mt-4 line-clamp-2 text-sm font-bold leading-5 text-white">
                {report.title}
              </h3>

              {/* DETAILS */}
              <p className="mt-2 line-clamp-3 text-[10px] leading-5 text-white/70">
                {report.details}
              </p>

              {/* TYPE + SOURCE */}
              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-md px-2 py-1 text-[9px] font-bold uppercase ${getTypeBadgeClass(
                      report.type,
                    )}`}
                  >
                    {getTypeLabel(report.type)}
                    {getImpactCount(report) > 0
                      ? `: ${getImpactCount(report)}`
                      : ""}
                  </span>

                  {report.sourceLink ? (
                    <a
                      href={report.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-white/25 bg-white/5 px-3 py-1.5 text-[9px] font-bold text-white transition hover:border-white/50 hover:bg-white/10"
                    >
                      Source ↗
                    </a>
                  ) : (
                    <span className="rounded-md border border-white/10 px-3 py-1.5 text-[9px] font-semibold text-white/35">
                      No Source
                    </span>
                  )}
                </div>

                {/* IMPACT SUMMARY */}
                <div className="mt-3 border-t border-white/15 pt-3">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-white/55">
                    <span>
                      Fatal: {report.fatalities}
                    </span>

                    <span>
                      Injured: {report.injuries}
                    </span>

                    <span>
                      Trapped: {report.trapped}
                    </span>

                    <span>
                      Other: {report.other}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* EMPTY */}
          {filteredReports.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#171247]/5">
                <span className="text-xl">📋</span>
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No accident reports found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
                No published reports match the selected filters.
                Try changing the year, state, type or date range.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-md bg-[#171247] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#241b65]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-lg border border-black/10 px-5 py-4 text-center text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <p className="text-3xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold">
        {label}
      </p>
    </div>
  );
}