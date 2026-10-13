
"use client";

import { useState, type FormEvent } from "react";

type ReportKind = "complaint" | "incident";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fieldClass =
    "w-full rounded-lg border border-[#d8e1eb] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2465a7] focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-[#102844]";

export default function IssueReportForms() {
    const [kind, setKind] = useState<ReportKind | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading || !kind) return;

        setError("");
        setSuccess("");

        if (!API_URL) {
            setError("Report service is not configured. Please try again later.");
            return;
        }

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        if (formData.get("consent") !== "on") {
            setError("Please provide consent before submitting this report.");
            return;
        }

        formData.set("consent", "true");

        const files = formData
            .getAll("evidence")
            .filter(
                (item): item is File =>
                    item instanceof File && item.size > 0,
            );

        if (files.length > 5) {
            setError("You can upload a maximum of 5 files.");
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
        ];

        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                setError("Only JPG, PNG, WebP and PDF files are allowed.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError(`Each file must be 5 MB or smaller: ${file.name}`);
                return;
            }
        }

        setLoading(true);

        try {
            const endpoint =
                kind === "complaint" ? "/complaints" : "/incident-reports";

            const response = await fetch(
                `${API_URL.replace(/\/+$/, "")}${endpoint}`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const apiMessage = Array.isArray(result?.message)
                    ? result.message.join(", ")
                    : result?.message;

                throw new Error(
                    apiMessage ||
                    `Unable to submit report (HTTP ${response.status}). Please try again.`,
                );
            }

            setSuccess(
                kind === "complaint"
                    ? "Your complaint has been submitted successfully. NLETA will review it."
                    : "Your incident report has been submitted successfully. NLETA will review it.",
            );

            formElement.reset();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="report-an-issue" className="section-padding bg-white">
            <div className="container-shell">
                {!kind ? (
                    <div className="mx-auto max-w-4xl">
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="eyebrow">Complaints &amp; incident reporting</span>
                            <h2 className="section-title mt-4">
                                How can we help you?
                            </h2>
                            <p className="body-copy mt-4">
                                Choose the option that best matches your requirement.
                                Only the selected form will open.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setKind("complaint");
                                    setError("");
                                    setSuccess("");
                                }}
                                className="group rounded-2xl border border-[#e1e8f0] bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2465a7] hover:shadow-lg sm:p-8"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-[#2465a7]">
                                    C
                                </span>
                                <h3 className="mt-5 text-xl font-bold text-[#102844]">
                                    Submit a Complaint
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Raise a service complaint, technical issue, inspection
                                    delay or other concern with NLETA.
                                </p>
                                <span className="mt-6 inline-block text-sm font-semibold text-[#2465a7] group-hover:underline">
                                    Continue to complaint form →
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setKind("incident");
                                    setError("");
                                    setSuccess("");
                                }}
                                className="group rounded-2xl border border-[#e1e8f0] bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2465a7] hover:shadow-lg sm:p-8"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl font-bold text-red-700">
                                    !
                                </span>
                                <h3 className="mt-5 text-xl font-bold text-[#102844]">
                                    Report an Incident
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Report a lift-related incident, entrapment, equipment
                                    malfunction or safety concern.
                                </p>
                                <span className="mt-6 inline-block text-sm font-semibold text-[#2465a7] group-hover:underline">
                                    Continue to incident form →
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-4xl">
                        <button
                            type="button"
                            onClick={() => {
                                setKind(null);
                                setError("");
                                setSuccess("");
                            }}
                            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2465a7] hover:underline"
                        >
                            ← Back to options
                        </button>

                        <div className="rounded-2xl border border-[#e1e8f0] bg-[#f8fafc] p-4 shadow-sm sm:p-7">
                            <div className="mb-6">
                                <span className="eyebrow">
                                    {kind === "complaint"
                                        ? "Complaint submission"
                                        : "Incident reporting"}
                                </span>
                                <h2 className="section-title mt-3">
                                    {kind === "complaint"
                                        ? "Submit a Complaint"
                                        : "Report an Incident"}
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Complete the relevant details below. Fields marked with *
                                    are required.
                                </p>
                            </div>

                            {success ? (
                                <div
                                    role="status"
                                    className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"
                                >
                                    <h3 className="font-semibold text-emerald-950">
                                        Report submitted successfully!
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-emerald-900">
                                        {success}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setKind(null);
                                            setSuccess("");
                                            setError("");
                                        }}
                                        className="mt-4 text-sm font-semibold text-[#2465a7] hover:underline"
                                    >
                                        Back to report options
                                    </button>
                                </div>
                            ) : (
                                <form
                                    key={kind}
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                    className="space-y-5"
                                >
                                    {error && (
                                        <p
                                            role="alert"
                                            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700"
                                        >
                                            {error}
                                        </p>
                                    )}

                                    {kind === "complaint" ? (
                                        <>
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label className={labelClass} htmlFor="complaint-name">
                                                        Full name *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="complaint-name"
                                                        name="name"
                                                        required
                                                        minLength={2}
                                                        maxLength={100}
                                                        autoComplete="name"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelClass} htmlFor="complaint-email">
                                                        Email address *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="complaint-email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        maxLength={254}
                                                        autoComplete="email"
                                                        placeholder="you@company.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelClass} htmlFor="complaint-phone">
                                                        Phone number
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="complaint-phone"
                                                        name="phone"
                                                        type="tel"
                                                        maxLength={25}
                                                        autoComplete="tel"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="complaint-organization"
                                                    >
                                                        Organization / building
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="complaint-organization"
                                                        name="organization"
                                                        maxLength={150}
                                                        placeholder="Company, society or building"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="complaint-category"
                                                    >
                                                        Complaint category *
                                                    </label>
                                                    <select
                                                        className={fieldClass}
                                                        id="complaint-category"
                                                        name="category"
                                                        required
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>
                                                            Select category
                                                        </option>
                                                        <option value="Service Quality">Service Quality</option>
                                                        <option value="Staff Conduct">Staff Conduct</option>
                                                        <option value="Testing Process">Testing Process</option>
                                                        <option value="Communication">Communication</option>
                                                        <option value="Billing">Billing</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="complaint-reference"
                                                    >
                                                        Lift / asset reference
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="complaint-reference"
                                                        name="relatedReference"
                                                        maxLength={100}
                                                        placeholder="e.g. LD-1281"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClass} htmlFor="complaint-subject">
                                                    Subject *
                                                </label>
                                                <input
                                                    className={fieldClass}
                                                    id="complaint-subject"
                                                    name="subject"
                                                    required
                                                    minLength={3}
                                                    maxLength={200}
                                                    placeholder="Briefly describe the issue"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className={labelClass}
                                                    htmlFor="complaint-description"
                                                >
                                                    Complaint details *
                                                </label>
                                                <textarea
                                                    className={fieldClass}
                                                    id="complaint-description"
                                                    name="description"
                                                    required
                                                    minLength={10}
                                                    maxLength={5000}
                                                    rows={5}
                                                    placeholder="Explain the issue, when it occurred and any relevant details"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label className={labelClass} htmlFor="incident-name">
                                                        Reporter name *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-name"
                                                        name="reporterName"
                                                        required
                                                        minLength={2}
                                                        maxLength={100}
                                                        autoComplete="name"
                                                        placeholder="Enter reporter's full name"
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelClass} htmlFor="incident-email">
                                                        Reporter email *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-email"
                                                        name="reporterEmail"
                                                        type="email"
                                                        required
                                                        maxLength={254}
                                                        autoComplete="email"
                                                        placeholder="you@company.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label className={labelClass} htmlFor="incident-phone">
                                                        Reporter phone
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-phone"
                                                        name="reporterPhone"
                                                        type="tel"
                                                        maxLength={25}
                                                        autoComplete="tel"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="incident-organization"
                                                    >
                                                        Organization
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-organization"
                                                        name="organization"
                                                        maxLength={150}
                                                        placeholder="Company, society or building management"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label className={labelClass} htmlFor="incident-type">
                                                        Incident type *
                                                    </label>
                                                    <select
                                                        className={fieldClass}
                                                        id="incident-type"
                                                        name="incidentType"
                                                        required
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Select incident type</option>
                                                        <option value="Lift stopped between floors">
                                                            Lift stopped between floors
                                                        </option>
                                                        <option value="Entrapment">Entrapment</option>
                                                        <option value="Door malfunction">Door malfunction</option>
                                                        <option value="Unexpected movement">
                                                            Unexpected movement
                                                        </option>
                                                        <option value="Injury">Injury</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="incident-severity"
                                                    >
                                                        Severity *
                                                    </label>
                                                    <select
                                                        className={fieldClass}
                                                        id="incident-severity"
                                                        name="severity"
                                                        required
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Select severity</option>
                                                        <option value="LOW">Low</option>
                                                        <option value="MEDIUM">Medium</option>
                                                        <option value="HIGH">High</option>
                                                        <option value="CRITICAL">Critical</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className={labelClass} htmlFor="incident-date">
                                                        Incident date and time *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-date"
                                                        name="incidentDate"
                                                        type="datetime-local"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClass}
                                                        htmlFor="incident-location"
                                                    >
                                                        Incident location *
                                                    </label>
                                                    <input
                                                        className={fieldClass}
                                                        id="incident-location"
                                                        name="location"
                                                        required
                                                        maxLength={250}
                                                        placeholder="Building, address, city"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    className={labelClass}
                                                    htmlFor="incident-reference"
                                                >
                                                    Lift / asset reference
                                                </label>
                                                <input
                                                    className={fieldClass}
                                                    id="incident-reference"
                                                    name="relatedReference"
                                                    maxLength={100}
                                                    placeholder="e.g. LD-1281 (if known)"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className={labelClass}
                                                    htmlFor="incident-description"
                                                >
                                                    Incident description *
                                                </label>
                                                <textarea
                                                    className={fieldClass}
                                                    id="incident-description"
                                                    name="description"
                                                    required
                                                    minLength={10}
                                                    maxLength={5000}
                                                    rows={5}
                                                    placeholder="Describe what happened, including the sequence of events"
                                                />
                                            </div>

                                            <div>
                                                <label className={labelClass} htmlFor="incident-injury">
                                                    Injury details
                                                </label>
                                                <textarea
                                                    className={fieldClass}
                                                    id="incident-injury"
                                                    name="injuryDetails"
                                                    maxLength={2000}
                                                    rows={3}
                                                    placeholder="Mention injuries, if any. Otherwise enter None."
                                                />
                                            </div>

                                            <div>
                                                <label className={labelClass} htmlFor="incident-action">
                                                    Immediate action taken
                                                </label>
                                                <textarea
                                                    className={fieldClass}
                                                    id="incident-action"
                                                    name="immediateAction"
                                                    maxLength={2000}
                                                    rows={3}
                                                    placeholder="Describe immediate safety steps taken"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className={labelClass} htmlFor="report-evidence">
                                            Supporting evidence (optional)
                                        </label>
                                        <input
                                            className={`${fieldClass} file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#2465a7]`}
                                            id="report-evidence"
                                            name="evidence"
                                            type="file"
                                            multiple
                                            accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                                        />
                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            Up to 5 files, 5 MB each. Accepted formats: JPG, PNG,
                                            WebP and PDF. Please avoid uploading sensitive personal
                                            documents unless necessary.
                                        </p>
                                    </div>

                                    <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                                        <input
                                            className="mt-1 h-4 w-4 shrink-0 accent-[#2465a7]"
                                            type="checkbox"
                                            name="consent"
                                            required
                                        />
                                        <span>
                                            I confirm that the information provided is accurate
                                            to the best of my knowledge and consent to NLETA using
                                            it to review and respond to this report. *
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        {loading
                                            ? "Submitting report..."
                                            : kind === "complaint"
                                                ? "Submit Complaint"
                                                : "Submit Incident Report"}
                                        {!loading && <span aria-hidden="true"> →</span>}
                                    </button>

                                    <p className="text-xs leading-5 text-slate-400">
                                        For immediate danger, contact local emergency services
                                        first. This form is not an emergency response channel.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
