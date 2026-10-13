
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminGalleryManager from "@/components/AdminGalleryManager";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type AdminProfile = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
};

type EnquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED";

type Enquiry = {
  id: string;
  name: string;
  organization?: string | null;
  email: string;
  phone?: string | null;
  enquiryType?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
};

type CaseStatus = "NEW" | "UNDER_REVIEW" | "RESOLVED" | "CLOSED";

type Evidence = {
  id?: string;
  filename?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  sizeBytes?: number;
  path?: string;
  url?: string;
};

type CaseRecord = {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  relatedReference?: string | null;
  subject?: string;
  description?: string;
  incidentDate?: string;
  location?: string;
  injuryDetails?: string | null;
  immediateAction?: string | null;
  status: CaseStatus;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt?: string;
  evidence?: Evidence[];
};

type ListResponse<T> = {
  data?: T[] | { data?: T[]; total?: number; limit?: number };
  total?: number;
  limit?: number;
  success?: boolean;
};

type Tab = "enquiries" | "complaints" | "incidents" | "gallery";

const caseStatuses: CaseStatus[] = [
  "NEW",
  "UNDER_REVIEW",
  "RESOLVED",
  "CLOSED",
];

const caseStatusLabel: Record<CaseStatus, string> = {
  NEW: "New",
  UNDER_REVIEW: "Under Review",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const caseStatusClass: Record<CaseStatus, string> = {
  NEW: "bg-blue-50 text-blue-700",
  UNDER_REVIEW: "bg-amber-50 text-amber-700",
  RESOLVED: "bg-emerald-50 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-700",
};

const enquiryStatusLabels: Record<EnquiryStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

function formatDate(date?: string | null) {
  if (!date) return "—";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(parsed);
}

function StatusPill({ status }: { status: CaseStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${caseStatusClass[status]}`}
    >
      {caseStatusLabel[status]}
    </span>
  );
}

function EnquiryPill({ status }: { status: EnquiryStatus }) {
  const cls =
    status === "NEW"
      ? "bg-blue-50 text-blue-700"
      : status === "IN_PROGRESS"
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${cls}`}
    >
      {enquiryStatusLabels[status]}
    </span>
  );
}

function unwrapList<T>(
  result: ListResponse<T>,
): { rows: T[]; total: number } {
  const payload = result.data;

  if (Array.isArray(payload)) {
    return { rows: payload, total: result.total ?? payload.length };
  }

  const rows = payload?.data ?? [];

  return {
    rows,
    total: payload?.total ?? result.total ?? rows.length,
  };
}

function displayName(item: CaseRecord) {
  return item.name || item.fullName || item.email || "Unnamed submission";
}

function EvidencePreview({
  file,
  endpoint,
}: {
  file: Evidence;
  endpoint: "complaints" | "incident-reports";
}) {
  const [src, setSrc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    async function loadEvidence() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl || !file.id) {
        setError("Evidence ID or API URL is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl.replace(/\/+$/, "")}/${endpoint}/evidence/${encodeURIComponent(file.id)}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load evidence (HTTP ${response.status}).`,
          );
        }

        const blob = await response.blob();
        const contentType = (
          response.headers.get("content-type") || blob.type
        ).toLowerCase();

        if (
          !contentType.startsWith("image/") &&
          contentType !== "application/pdf"
        ) {
          throw new Error("The server did not return an image or PDF.");
        }

        objectUrl = URL.createObjectURL(blob);

        if (!cancelled) {
          setSrc(objectUrl);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to display this evidence file.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadEvidence();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file.id, endpoint]);

  const filename = file.originalName || file.filename || "Evidence file";
  const isImage = file.mimeType?.startsWith("image/");
  const isPdf = file.mimeType === "application/pdf";

  if (!file.id) {
    return (
      <p className="mt-3 text-sm text-red-700">
        Evidence ID is missing from the API response.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-3">
      {loading && (
        <p className="text-sm text-slate-500">Loading evidence preview...</p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {src && isImage && (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={filename}
            className="max-h-[420px] w-full rounded-lg border border-slate-200 bg-slate-50 object-contain"
          />

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline"
          >
            Open full-size image ↗
          </a>
        </div>
      )}

      {src && isPdf && (
        <div className="space-y-2">
          <iframe
            src={src}
            title={filename}
            className="h-[420px] w-full rounded-lg border border-slate-200"
          />

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-blue-700 hover:underline"
          >
            Open PDF in new tab ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [tab, setTab] = useState<Tab>("enquiries");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryTotal, setEnquiryTotal] = useState(0);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [enquiryError, setEnquiryError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingEnquiryId, setUpdatingEnquiryId] = useState<string | null>(
    null,
  );
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [complaints, setComplaints] = useState<CaseRecord[]>([]);
  const [complaintsTotal, setComplaintsTotal] = useState(0);
  const [incidents, setIncidents] = useState<CaseRecord[]>([]);
  const [incidentsTotal, setIncidentsTotal] = useState(0);
  const [loadingCases, setLoadingCases] = useState(false);
  const [caseError, setCaseError] = useState("");
  const [caseSuccess, setCaseSuccess] = useState("");
  const [caseSearch, setCaseSearch] = useState("");
  const [caseStatusFilter, setCaseStatusFilter] = useState("ALL");
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const [caseNotes, setCaseNotes] = useState("");
  const [updatingCaseId, setUpdatingCaseId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        if (!API_URL) {
          throw new Error(
            "Admin service is not configured. Set NEXT_PUBLIC_API_URL.",
          );
        }

        const response = await fetch(`${API_URL}/admin-auth/me`, {
          credentials: "include",
          cache: "no-store",
        });

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify your admin session.");
        }

        const result = await response.json();

        if (!cancelled) setAdmin(result.admin);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not connect to admin service.",
          );
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const fetchEnquiries = useCallback(async () => {
    if (!API_URL) {
      setEnquiryError("Admin API URL is not configured.");
      setLoadingEnquiries(false);
      return;
    }

    setLoadingEnquiries(true);
    setEnquiryError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const response = await fetch(
        `${API_URL}/contact-enquiries${params.size ? `?${params}` : ""}`,
        { credentials: "include", cache: "no-store" },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Unable to load enquiries (HTTP ${response.status}).`,
        );
      }

      const result: ListResponse<Enquiry> = await response.json();
      const { rows, total } = unwrapList(result);

      setEnquiries(rows);
      setEnquiryTotal(total);
    } catch (err) {
      setEnquiryError(
        err instanceof Error ? err.message : "Failed to load enquiries.",
      );
    } finally {
      setLoadingEnquiries(false);
    }
  }, [router, search, statusFilter]);

  const fetchCases = useCallback(
    async (kind: "complaints" | "incidents") => {
      if (!API_URL) {
        setCaseError("Admin API URL is not configured.");
        return;
      }

      setLoadingCases(true);
      setCaseError("");

      try {
        const params = new URLSearchParams();

        if (caseSearch.trim()) params.set("search", caseSearch.trim());
        if (caseStatusFilter !== "ALL") {
          params.set("status", caseStatusFilter);
        }

        const endpoint =
          kind === "complaints" ? "complaints" : "incident-reports";

        const response = await fetch(
          `${API_URL}/${endpoint}${params.size ? `?${params}` : ""}`,
          { credentials: "include", cache: "no-store" },
        );

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Unable to load ${kind} (HTTP ${response.status}).`,
          );
        }

        const result: ListResponse<CaseRecord> = await response.json();
        const { rows, total } = unwrapList(result);

        if (kind === "complaints") {
          setComplaints(rows);
          setComplaintsTotal(total);
        } else {
          setIncidents(rows);
          setIncidentsTotal(total);
        }
      } catch (err) {
        setCaseError(
          err instanceof Error ? err.message : `Failed to load ${kind}.`,
        );
      } finally {
        setLoadingCases(false);
      }
    },
    [router, caseSearch, caseStatusFilter],
  );

  useEffect(() => {
    if (admin) void fetchEnquiries();
  }, [admin, fetchEnquiries]);

  useEffect(() => {
    if (admin && (tab === "complaints" || tab === "incidents")) {
      void fetchCases(tab);
    }
  }, [admin, tab, fetchCases]);

  async function handleEnquiryStatus(
    enquiry: Enquiry,
    nextStatus: EnquiryStatus,
  ) {
    if (!API_URL || nextStatus === enquiry.status) return;

    setUpdatingEnquiryId(enquiry.id);
    setEnquiryError("");

    try {
      const response = await fetch(
        `${API_URL}/contact-enquiries/${encodeURIComponent(enquiry.id)}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Could not update status (HTTP ${response.status}).`,
        );
      }

      setEnquiries((current) =>
        current.map((item) =>
          item.id === enquiry.id ? { ...item, status: nextStatus } : item,
        ),
      );

      setSelectedEnquiry((current) =>
        current?.id === enquiry.id
          ? { ...current, status: nextStatus }
          : current,
      );
    } catch (err) {
      setEnquiryError(
        err instanceof Error ? err.message : "Failed to update status.",
      );
    } finally {
      setUpdatingEnquiryId(null);
    }
  }

  async function saveCase() {
    if (!API_URL || !selectedCase) return;

    const kind =
      tab === "incidents" ? "incident-reports" : "complaints";

    setUpdatingCaseId(selectedCase.id);
    setCaseError("");
    setCaseSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/${kind}/${encodeURIComponent(selectedCase.id)}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: selectedCase.status,
            adminNotes: caseNotes,
          }),
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(
          `Could not update record (HTTP ${response.status})${
            message ? `: ${message.slice(0, 180)}` : ""
          }.`,
        );
      }

      const result = await response.json().catch(() => null);

      const updated: CaseRecord =
        result?.data ??
        result?.record ??
        {
          ...selectedCase,
          adminNotes: caseNotes,
          updatedAt: new Date().toISOString(),
        };

      const merged = {
        ...selectedCase,
        ...updated,
        adminNotes: updated.adminNotes ?? caseNotes,
      };

      if (tab === "complaints") {
        setComplaints((current) =>
          current.map((item) => (item.id === merged.id ? merged : item)),
        );
      } else {
        setIncidents((current) =>
          current.map((item) => (item.id === merged.id ? merged : item)),
        );
      }

      setSelectedCase(null);
      setCaseSuccess("Changes saved successfully!");
    } catch (err) {
      setCaseError(
        err instanceof Error ? err.message : "Failed to update record.",
      );
    } finally {
      setUpdatingCaseId(null);
    }
  }

  async function handleLogout() {
    if (!API_URL) return;

    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/admin-auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed.");

      router.replace("/admin/login");
    } catch {
      setError("Could not log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-600">
          Verifying admin session...
        </p>
      </main>
    );
  }

  if (error && !admin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="max-w-md rounded-xl border border-red-200 bg-white p-6">
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!admin) return null;

  const activeCases = tab === "incidents" ? incidents : complaints;
  const activeTotal =
    tab === "incidents" ? incidentsTotal : complaintsTotal;

  const enquiryCounts = {
    new: enquiries.filter((item) => item.status === "NEW").length,
    progress: enquiries.filter((item) => item.status === "IN_PROGRESS").length,
    resolved: enquiries.filter((item) => item.status === "RESOLVED").length,
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              NLETA
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl space-y-7 px-5 py-8">
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="mt-1 break-all text-lg font-semibold text-slate-900">
            {admin.email}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                admin.isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {admin.isActive ? "Active account" : "Inactive account"}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {admin.role}
            </span>
          </div>
        </div>

        {caseSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            <span>✓ {caseSuccess}</span>
            <button
              onClick={() => setCaseSuccess("")}
              aria-label="Dismiss success message"
              className="rounded px-2 py-1 text-emerald-800 hover:bg-emerald-100"
            >
              Dismiss
            </button>
          </div>
        )}

        <nav
          className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3"
          aria-label="Admin sections"
        >
          {(
            [
              { id: "enquiries", label: "Contact Enquiries" },
              { id: "complaints", label: "Complaints" },
              { id: "incidents", label: "Incident Reports" },
              { id: "gallery", label: "Training Gallery" },
            ] as { id: Tab; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setSelectedEnquiry(null);
                setSelectedCase(null);
              }}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-blue-700 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {tab === "gallery" ? (
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Training Gallery Management
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Upload training photographs and videos, publish approved
                media, and remove outdated items.
              </p>
            </div>
            <AdminGalleryManager />
          </section>
        ) : tab === "enquiries" ? (
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Contact Enquiries
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  View website enquiries and manage their status.
                </p>
              </div>
              <button
                onClick={() => void fetchEnquiries()}
                disabled={loadingEnquiries}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {loadingEnquiries ? "Refreshing..." : "Refresh enquiries"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Matching enquiries", value: enquiryTotal },
                { label: "New (loaded)", value: enquiryCounts.new },
                { label: "In progress (loaded)", value: enquiryCounts.progress },
                { label: "Resolved (loaded)", value: enquiryCounts.resolved },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or organization..."
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm"
              >
                <option value="ALL">All statuses</option>
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            {enquiryError && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <p>{enquiryError}</p>
                <button
                  onClick={() => void fetchEnquiries()}
                  className="rounded-lg border border-red-300 px-3 py-1.5 font-semibold"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Enquiry</th>
                      <th className="px-5 py-4">Contact</th>
                      <th className="px-5 py-4">Service / Sector</th>
                      <th className="px-5 py-4">Submitted (IST)</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingEnquiries ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-slate-500"
                        >
                          Loading contact enquiries...
                        </td>
                      </tr>
                    ) : enquiries.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-slate-500"
                        >
                          No enquiries found.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enquiry) => (
                        <tr
                          key={enquiry.id}
                          className="align-top hover:bg-slate-50/70"
                        >
                          <td className="max-w-xs px-5 py-4">
                            <p className="font-semibold text-slate-900">
                              {enquiry.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {enquiry.organization || "Individual"}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {enquiry.subject || enquiry.message}
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <a
                              href={`mailto:${enquiry.email}`}
                              className="break-all font-medium text-blue-700 hover:underline"
                            >
                              {enquiry.email}
                            </a>
                            {enquiry.phone && (
                              <p className="mt-1 text-slate-600">
                                {enquiry.phone}
                              </p>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-medium text-slate-800">
                              {enquiry.enquiryType || "General Enquiry"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {enquiry.sector || "—"}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {formatDate(enquiry.createdAt)}
                          </td>
                          <td className="px-5 py-4">
                            <EnquiryPill status={enquiry.status} />
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-col items-start gap-2">
                              <button
                                onClick={() => setSelectedEnquiry(enquiry)}
                                className="font-semibold text-blue-700 hover:underline"
                              >
                                View details
                              </button>
                              <select
                                aria-label={`Update status for ${enquiry.name}`}
                                value={enquiry.status}
                                disabled={updatingEnquiryId === enquiry.id}
                                onChange={(event) =>
                                  void handleEnquiryStatus(
                                    enquiry,
                                    event.target.value as EnquiryStatus,
                                  )
                                }
                                className="max-w-36 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs"
                              >
                                <option value="NEW">New</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>
                              </select>
                              {updatingEnquiryId === enquiry.id && (
                                <span className="text-xs text-slate-500">
                                  Saving...
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
                Showing {enquiries.length} loaded entries · {enquiryTotal}{" "}
                matching records
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {tab === "complaints"
                    ? "Complaints Management"
                    : "Incident Reports"}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Review submissions, update status and save internal admin
                  notes.
                </p>
              </div>
              <button
                onClick={() => void fetchCases(tab)}
                disabled={loadingCases}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {loadingCases ? "Refreshing..." : "Refresh records"}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Matching records</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {activeTotal}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">New records loaded</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {activeCases.filter((item) => item.status === "NEW").length}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
              <input
                type="search"
                value={caseSearch}
                onChange={(event) => setCaseSearch(event.target.value)}
                placeholder="Search name, reference, subject or description..."
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <select
                value={caseStatusFilter}
                onChange={(event) => setCaseStatusFilter(event.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm"
              >
                <option value="ALL">All statuses</option>
                {caseStatuses.map((status) => (
                  <option key={status} value={status}>
                    {caseStatusLabel[status]}
                  </option>
                ))}
              </select>
            </div>

            {caseError && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <p>{caseError}</p>
                <button
                  onClick={() => void fetchCases(tab)}
                  className="rounded-lg border border-red-300 px-3 py-1.5 font-semibold"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Submission</th>
                      <th className="px-5 py-4">Reference / Subject</th>
                      <th className="px-5 py-4">Submitted (IST)</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Evidence</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingCases ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-slate-500"
                        >
                          Loading records...
                        </td>
                      </tr>
                    ) : activeCases.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-slate-500"
                        >
                          No records found for this filter.
                        </td>
                      </tr>
                    ) : (
                      activeCases.map((item) => (
                        <tr
                          key={item.id}
                          className="align-top hover:bg-slate-50/70"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-slate-900">
                              {displayName(item)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.email || "No email provided"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.phone || "No phone provided"}
                            </p>
                          </td>
                          <td className="max-w-sm px-5 py-4">
                            <p className="font-medium text-slate-800">
                              {item.relatedReference || item.location || "—"}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {item.subject || item.description || "—"}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="px-5 py-4">
                            <StatusPill status={item.status} />
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            {item.evidence?.length ?? 0} file(s)
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => {
                                setSelectedCase(item);
                                setCaseNotes(item.adminNotes || "");
                                setCaseError("");
                                setCaseSuccess("");
                              }}
                              className="font-semibold text-blue-700 hover:underline"
                            >
                              View / manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
                Showing {activeCases.length} loaded records · {activeTotal}{" "}
                matching records
              </div>
            </div>
          </section>
        )}
      </section>

      {selectedEnquiry && tab === "enquiries" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedEnquiry(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-details-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="enquiry-details-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Enquiry details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Submitted {formatDate(selectedEnquiry.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Name", value: selectedEnquiry.name },
                {
                  label: "Organization",
                  value: selectedEnquiry.organization || "—",
                },
                { label: "Email", value: selectedEnquiry.email },
                { label: "Phone", value: selectedEnquiry.phone || "—" },
                {
                  label: "Enquiry type",
                  value: selectedEnquiry.enquiryType || "General Enquiry",
                },
                { label: "Sector", value: selectedEnquiry.sector || "—" },
                { label: "Subject", value: selectedEnquiry.subject || "—" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-slate-500">{field.label}</p>
                  <p className="mt-1 break-words font-semibold text-slate-900">
                    {field.value}
                  </p>
                </div>
              ))}

              <div className="sm:col-span-2">
                <p className="text-xs text-slate-500">Message</p>
                <p className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <EnquiryPill status={selectedEnquiry.status} />
              <select
                value={selectedEnquiry.status}
                disabled={updatingEnquiryId === selectedEnquiry.id}
                onChange={(event) =>
                  void handleEnquiryStatus(
                    selectedEnquiry,
                    event.target.value as EnquiryStatus,
                  )
                }
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </section>
        </div>
      )}

      {selectedCase &&
        (tab === "complaints" || tab === "incidents") && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4"
            onClick={() => setSelectedCase(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-details-title"
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="case-details-title"
                    className="text-xl font-bold text-slate-900"
                  >
                    {tab === "complaints"
                      ? "Complaint details"
                      : "Incident report details"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Submitted {formatDate(selectedCase.createdAt)} · ID:{" "}
                    {selectedCase.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Name", value: displayName(selectedCase) },
                  { label: "Email", value: selectedCase.email || "—" },
                  { label: "Phone", value: selectedCase.phone || "—" },
                  {
                    label: "Reference",
                    value: selectedCase.relatedReference || "—",
                  },
                  ...(tab === "incidents"
                    ? [
                        {
                          label: "Location",
                          value: selectedCase.location || "—",
                        },
                        {
                          label: "Incident date",
                          value: formatDate(selectedCase.incidentDate),
                        },
                        {
                          label: "Injury details",
                          value: selectedCase.injuryDetails || "—",
                        },
                        {
                          label: "Immediate action",
                          value: selectedCase.immediateAction || "—",
                        },
                      ]
                    : [
                        {
                          label: "Subject",
                          value: selectedCase.subject || "—",
                        },
                      ]),
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs text-slate-500">{field.label}</p>
                    <p className="mt-1 break-words font-semibold text-slate-900">
                      {field.value}
                    </p>
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    {selectedCase.description || "—"}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h3 className="font-semibold text-slate-900">
                  Evidence files
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedCase.evidence?.length
                    ? `${selectedCase.evidence.length} file(s) attached.`
                    : "No evidence files attached."}
                </p>

                {Boolean(selectedCase.evidence?.length) && (
                  <ul className="mt-3 space-y-4">
                    {selectedCase.evidence?.map((file, index) => (
                      <li
                        key={
                          file.id ||
                          `${file.filename || file.originalName}-${index}`
                        }
                        className="rounded-lg border border-slate-200 p-4 text-sm"
                      >
                        <p className="break-words font-medium text-slate-800">
                          {file.originalName ||
                            file.filename ||
                            `Evidence file ${index + 1}`}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {file.mimeType || "Unknown type"}
                          {typeof (file.sizeBytes ?? file.size) === "number"
                            ? ` · ${(
                                (file.sizeBytes ?? file.size ?? 0) / 1024
                              ).toFixed(1)} KB`
                            : ""}
                        </p>

                        {file.id && (
                          <EvidencePreview
                            file={file}
                            endpoint={
                              tab === "incidents"
                                ? "incident-reports"
                                : "complaints"
                            }
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <h3 className="font-semibold text-slate-900">Admin update</h3>

                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Status
                  <select
                    value={selectedCase.status}
                    onChange={(event) =>
                      setSelectedCase((current) =>
                        current
                          ? {
                              ...current,
                              status: event.target.value as CaseStatus,
                            }
                          : current,
                      )
                    }
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                  >
                    {caseStatuses.map((status) => (
                      <option key={status} value={status}>
                        {caseStatusLabel[status]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Internal admin notes
                  <textarea
                    rows={4}
                    maxLength={5000}
                    value={caseNotes}
                    onChange={(event) => setCaseNotes(event.target.value)}
                    placeholder="Add investigation notes or follow-up actions..."
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="mt-1 block text-right text-xs text-slate-500">
                    {caseNotes.length}/5000
                  </span>
                </label>

                {caseError && (
                  <p
                    role="alert"
                    className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                  >
                    {caseError}
                  </p>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => void saveCase()}
                    disabled={updatingCaseId === selectedCase.id}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
                  >
                    {updatingCaseId === selectedCase.id
                      ? "Saving..."
                      : "Save update"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
    </main>
  );
}
