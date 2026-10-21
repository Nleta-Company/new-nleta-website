"use client";

import { useMemo, useState } from "react";
import type { AccidentReport } from "./newsData";

type AccidentReportsClientProps = {
  reports: AccidentReport[];
};

export default function AccidentReportsClient({
  reports,
}: AccidentReportsClientProps) {
  const [selectedState, setSelectedState] = useState("All States");

  const states = useMemo(
    () => [
      "All States",
      ...Array.from(new Set(reports.map((report) => report.state))).sort(),
    ],
    [reports]
  );

  const filteredReports = useMemo(() => {
    if (selectedState === "All States") {
      return reports;
    }

    return reports.filter((report) => report.state === selectedState);
  }, [reports, selectedState]);

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
          <label htmlFor="accident-state-filter" className="whitespace-nowrap">
            Filter:
          </label>

          <select
            id="accident-state-filter"
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
            className="min-w-[175px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredReports.map((report) => (
          <article
            key={report.id}
            className="flex min-h-[175px] flex-col rounded-md bg-[#171247] p-3 text-white shadow-sm"
          >
            <div className="text-[9px] font-bold text-orange-400">
              {report.date}
            </div>

            <div className="mt-1 text-[9px] font-semibold text-white/70">
              📍 {report.state}
            </div>

            <h3 className="mt-2 text-sm font-bold leading-5 text-white">
              {report.title}
            </h3>

            <p className="mt-1 line-clamp-3 flex-1 text-[10px] leading-4 text-white/75">
              {report.details}
            </p>

            <div className="mt-3">
              <span
                className={`inline-flex rounded px-2 py-1 text-[9px] font-extrabold ${
                  report.tag === "FATAL"
                    ? "bg-red-500 text-white"
                    : report.tag === "OTHER"
                      ? "bg-slate-500 text-white"
                      : "bg-blue-600 text-white"
                }`}
              >
                {report.tag}:{report.tagCount}
              </span>
            </div>
          </article>
        ))}

        {filteredReports.length === 0 && (
          <div className="col-span-full rounded-md bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No accident reports found for this state.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
