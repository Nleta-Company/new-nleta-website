
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

type CandidateStatus =
  | "NEW"
  | "REVIEWING"
  | "SHORTLISTED"
  | "CONTACTED"
  | "HIRED"
  | "REJECTED";

type Candidate = {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  qualification: string;
  experienceLevel: string;
  skills?: string | null;
  preferredRole: string;
  hiringMarket: string;
  destinationCountry?: string | null;
  expectedSalary?: string | null;
  noticePeriod?: string | null;
  availability?: string | null;
  consent: boolean;
  status: CandidateStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
};

const STATUSES: CandidateStatus[] = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "CONTACTED",
  "HIRED",
  "REJECTED",
];

const statusStyle: Record<CandidateStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  REVIEWING: "bg-amber-50 text-amber-700 ring-amber-200",
  SHORTLISTED: "bg-violet-50 text-violet-700 ring-violet-200",
  CONTACTED: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  HIRED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function display(value?: string | null) {
  return value?.trim() ? value : "—";
}

function normalize(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [marketFilter, setMarketFilter] = useState("ALL");

  const [selected, setSelected] = useState<Candidate | null>(null);
  const [editStatus, setEditStatus] =
    useState<CandidateStatus>("NEW");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCandidates = useCallback(async (quiet = false) => {
    if (!API_URL) {
      setError(
        "NEXT_PUBLIC_API_URL is not configured. Add it to your frontend .env.local file."
      );
      setLoading(false);
      setRefreshing(false);
      return;
    }

    if (quiet) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/candidates`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            `Could not load candidates (${response.status}).`
        );
      }

      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.items)
            ? payload.items
            : null;

      if (!rows) {
        throw new Error(
          "Unexpected API response. GET /candidates must return an array of candidate records."
        );
      }

      setCandidates(rows);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load candidates."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadCandidates();
  }, [loadCandidates]);

  // Search and filter candidates together.
  const filteredCandidates = useMemo(() => {
    const term = normalize(search);
    const selectedStatus = normalize(statusFilter);
    const selectedMarket = normalize(marketFilter);

    return candidates.filter((candidate) => {
      const searchableFields = [
        candidate.referenceNumber,
        candidate.id,
        candidate.fullName,
        candidate.email,
        candidate.phone,
        candidate.city,
        candidate.country,
        candidate.preferredRole,
        candidate.qualification,
        candidate.experienceLevel,
        candidate.skills,
        candidate.destinationCountry,
        candidate.expectedSalary,
        candidate.noticePeriod,
        candidate.availability,
        candidate.hiringMarket,
      ];

      const matchesSearch =
        term === "" ||
        searchableFields.some((value) =>
          normalize(value).includes(term)
        );

      const candidateStatus = normalize(candidate.status || "NEW");
      const matchesStatus =
        selectedStatus === "all" ||
        candidateStatus === selectedStatus;

      const candidateMarket = normalize(candidate.hiringMarket);

      const matchesMarket =
        selectedMarket === "all" ||
        candidateMarket === selectedMarket;

      return matchesSearch && matchesStatus && matchesMarket;
    });
  }, [candidates, search, statusFilter, marketFilter]);

  const counts = useMemo(
    () => ({
      total: candidates.length,
      new: candidates.filter(
        (item) => normalize(item.status || "NEW") === "new"
      ).length,
      reviewing: candidates.filter(
        (item) => normalize(item.status) === "reviewing"
      ).length,
      shortlisted: candidates.filter(
        (item) => normalize(item.status) === "shortlisted"
      ).length,
      hired: candidates.filter(
        (item) => normalize(item.status) === "hired"
      ).length,
    }),
    [candidates]
  );

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setMarketFilter("ALL");
  }

  function openCandidate(candidate: Candidate) {
    setSelected(candidate);
    setEditStatus(candidate.status || "NEW");
    setEditNotes(candidate.adminNotes || "");
    setError("");
    setSuccess("");
  }

  async function saveCandidate() {
    if (!selected || !API_URL) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/candidates/${encodeURIComponent(selected.id)}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            status: editStatus,
            adminNotes: editNotes,
          }),
        }
      );

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            `Could not save candidate (${response.status}).`
        );
      }

      const updated: Candidate =
        payload?.data || payload?.candidate || payload;

      setCandidates((current) =>
        current.map((item) =>
          item.id === selected.id
            ? {
                ...item,
                ...(updated && typeof updated === "object"
                  ? updated
                  : {}),
                status: editStatus,
                adminNotes: editNotes,
              }
            : item
        )
      );

      setSelected((current) =>
        current && current.id === selected.id
          ? {
              ...current,
              ...(updated && typeof updated === "object"
                ? updated
                : {}),
              status: editStatus,
              adminNotes: editNotes,
            }
          : current
      );

      setSuccess("Candidate record updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save candidate."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            Recruitment CRM
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Candidate Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review registrations, track candidate status, and maintain
            internal notes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadCandidates(true)}
          disabled={refreshing || loading}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {refreshing ? "Refreshing…" : "↻ Refresh"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-1">{error}</p>

          <button
            type="button"
            onClick={() => void loadCandidates()}
            className="mt-3 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
        >
          {success}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          {
            label: "Total candidates",
            value: counts.total,
            color: "text-slate-900",
          },
          {
            label: "New",
            value: counts.new,
            color: "text-blue-700",
          },
          {
            label: "Reviewing",
            value: counts.reviewing,
            color: "text-amber-700",
          },
          {
            label: "Shortlisted",
            value: counts.shortlisted,
            color: "text-violet-700",
          },
          {
            label: "Hired",
            value: counts.hired,
            color: "text-emerald-700",
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className={`mt-2 text-3xl font-bold ${metric.color}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="block text-sm font-medium text-slate-700">
            Search candidates

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name, email, phone, role, reference…"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Registration status

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal"
            >
              <option value="ALL">All statuses</option>

              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Hiring market

            <select
              value={marketFilter}
              onChange={(event) => setMarketFilter(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal"
            >
              <option value="ALL">All markets</option>
              <option value="India">India</option>
              <option value="Overseas">Overseas</option>
              <option value="Both">India &amp; Overseas (Both)</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
          <span>
            Showing{" "}
            <strong className="text-slate-800">
              {filteredCandidates.length}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-800">
              {candidates.length}
            </strong>{" "}
            candidates
          </span>

          <button
            type="button"
            onClick={clearFilters}
            className="font-semibold text-teal-700 hover:underline"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Candidates table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Preferred role</th>
                <th className="px-5 py-4">Market</th>
                <th className="px-5 py-4">Registered (IST)</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Loading candidate registrations…
                  </td>
                </tr>
              ) : filteredCandidates.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    No candidate registrations match these filters.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="align-top hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {candidate.fullName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Ref: {candidate.referenceNumber || candidate.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {[candidate.city, candidate.country]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-slate-800">{candidate.email}</p>
                      <p className="mt-1 text-slate-500">
                        {candidate.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {candidate.preferredRole}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {candidate.experienceLevel}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p>{candidate.hiringMarket}</p>

                      {candidate.destinationCountry && (
                        <p className="mt-1 text-xs text-slate-500">
                          {candidate.destinationCountry}
                        </p>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {formatDate(candidate.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
                          statusStyle[candidate.status] || statusStyle.NEW
                        }`}
                      >
                        {candidate.status || "NEW"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => openCandidate(candidate)}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                      >
                        View / Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="candidate-modal-title"
        >
          <div className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
                  Candidate profile
                </p>

                <h2
                  id="candidate-modal-title"
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {selected.fullName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Reference: {selected.referenceNumber || selected.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close candidate details"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                  Registration details
                </h3>

                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["Email", selected.email],
                    ["Phone", selected.phone],
                    [
                      "Location",
                      [selected.city, selected.country]
                        .filter(Boolean)
                        .join(", "),
                    ],
                    ["Qualification", selected.qualification],
                    ["Experience", selected.experienceLevel],
                    ["Preferred role", selected.preferredRole],
                    ["Hiring market", selected.hiringMarket],
                    ["Destination country", selected.destinationCountry],
                    ["Expected salary", selected.expectedSalary],
                    ["Notice period", selected.noticePeriod],
                    ["Availability", selected.availability],
                    ["Registered on", formatDate(selected.createdAt)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl bg-slate-50 p-3"
                    >
                      <dt className="text-xs font-medium text-slate-500">
                        {label}
                      </dt>

                      <dd className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {display(value)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">
                    Skills
                  </p>

                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                    {display(selected.skills)}
                  </p>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Consent recorded: {selected.consent ? "Yes" : "No"}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Update status

                    <select
                      value={editStatus}
                      onChange={(event) =>
                        setEditStatus(
                          event.target.value as CandidateStatus
                        )
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800">
                    Internal admin notes

                    <textarea
                      value={editNotes}
                      onChange={(event) => setEditNotes(event.target.value)}
                      rows={7}
                      placeholder="Add screening notes, follow-up details, or decision rationale…"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </label>

                  <p className="mt-1 text-xs text-slate-500">
                    These notes are for the admin team and are not shown on
                    the public form.
                  </p>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    role="status"
                    className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"
                  >
                    {success}
                  </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => void saveCandidate()}
                    disabled={saving}
                    className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
