
"use client";

import { useState, type FormEvent } from "react";

type CandidateFormData = {
    fullName: string;
    email: string;
    mobile: string;
    currentCountry: string;
    state: string;
    city: string;
    qualification: string;
    specialization: string;
    experienceType: string;
    experienceYears: string;
    preferredRole: string;
    jobPreference: string;
    destinationCountry: string;
    expectedSalary: string;
    noticePeriod: string;
    consent: boolean;
};

const initialForm: CandidateFormData = {
    fullName: "",
    email: "",
    mobile: "",
    currentCountry: "India",
    state: "",
    city: "",
    qualification: "",
    specialization: "",
    experienceType: "",
    experienceYears: "",
    preferredRole: "",
    jobPreference: "",
    destinationCountry: "",
    expectedSalary: "",
    noticePeriod: "",
    consent: false,
};

const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#102844] outline-none transition placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-4 focus:ring-teal-500/10";

const labelClass = "block text-sm font-semibold text-[#102844]";

export default function CandidateRegistrationForm() {
    const [form, setForm] = useState<CandidateFormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [referenceNumber, setReferenceNumber] = useState("");

    const updateField = (
        field: keyof CandidateFormData,
        value: string | boolean,
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        if (submitted) setSubmitted(false);
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setSubmitted(false);
        setErrorMessage("");
        setReferenceNumber("");


        const apiBaseUrl = (
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        ).replace(/\/$/, "");

        // Map the website form fields to the current NestJS DTO.
        // State, specialization, and years of experience are preserved in
        // the existing city, skills, and experienceLevel fields respectively.
        const payload = {
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.mobile.trim(),
            city: [form.city.trim(), form.state.trim()].filter(Boolean).join(", "),
            country: form.currentCountry.trim() || "India",
            qualification: form.qualification,
            experienceLevel: `${form.experienceType} (${form.experienceYears})`,
            skills: form.specialization.trim(),
            preferredRole: form.preferredRole.trim(),
            hiringMarket: form.jobPreference,
            destinationCountry: form.jobPreference === "India"
                ? undefined
                : form.destinationCountry.trim(),
            expectedSalary: form.expectedSalary.trim() || undefined,
            noticePeriod: form.noticePeriod,
            availability: form.noticePeriod,
            consent: form.consent,
        };

        try {
            const response = await fetch(`${apiBaseUrl}/candidates`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message = Array.isArray(result?.message)
                    ? result.message.join(" ")
                    : result?.message;
                throw new Error(
                    message || "Registration could not be submitted. Please try again.",
                );
            }

            setReferenceNumber(result?.candidate?.referenceNumber || "");
            setSubmitted(true);
            setForm(initialForm);
        } catch (error) {
            setErrorMessage(
                error instanceof TypeError
                    ? "Cannot connect to the server. Check that the NestJS backend is running on port 5000 and CORS is enabled."
                    : error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    const showDestination =
        form.jobPreference === "Overseas" ||
        form.jobPreference === "Both";

    return (
        <section
            id="candidate-registration-form"
            className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
        >
            <div className="relative overflow-hidden bg-[#102844] px-6 py-8 text-white sm:px-9 sm:py-10">
                <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#12a6a0]/20 blur-3xl"
                />

                <div className="relative">
                    <div className="mb-4 flex h-1 w-20 overflow-hidden rounded-full">
                        <span className="w-1/3 bg-[#ff9933]" />
                        <span className="w-1/3 bg-white" />
                        <span className="w-1/3 bg-[#138808]" />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                        NLETA Candidate Connect
                    </p>

                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                        Candidate Registration
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                        Share your professional profile and career preferences to help
                        us understand your suitability for relevant technical opportunities
                        in India and overseas.
                    </p>
                </div>
            </div>

            <div className="p-5 sm:p-8 lg:p-9">
                {submitted && (
                    <div
                        role="status"
                        className="mb-7 rounded-xl border border-teal-200 bg-teal-50 p-4"
                    >
                        <p className="font-bold text-teal-800">
                            Form submitted successfully!
                        </p>
                        <p className="mt-1 text-sm leading-6 text-teal-700">
                            Your registration has been saved successfully.
                            {referenceNumber ? ` Your reference number is ${referenceNumber}.` : ""}
                        </p>
                    </div>
                )}

                {errorMessage && (
                    <div
                        role="alert"
                        className="mb-7 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                    >
                        <p className="font-bold">Registration failed</p>
                        <p className="mt-1">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-9">
                    {/* Personal information */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5fc] text-sm font-extrabold text-[#2465a7]">
                                01
                            </span>
                            <div>
                                <h3 className="font-bold text-[#102844]">
                                    Personal Information
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Your contact and current location details
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass} htmlFor="candidate-name">
                                    Full Name *
                                </label>
                                <input
                                    id="candidate-name"
                                    className={inputClass}
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    value={form.fullName}
                                    onChange={(e) => updateField("fullName", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-email">
                                    Email Address *
                                </label>
                                <input
                                    id="candidate-email"
                                    type="email"
                                    className={inputClass}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-mobile">
                                    Mobile Number *
                                </label>
                                <input
                                    id="candidate-mobile"
                                    type="tel"
                                    className={inputClass}
                                    placeholder="+91 98765 43210"
                                    autoComplete="tel"
                                    value={form.mobile}
                                    onChange={(e) => updateField("mobile", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-country">
                                    Current Country *
                                </label>
                                <input
                                    id="candidate-country"
                                    className={inputClass}
                                    autoComplete="country-name"
                                    value={form.currentCountry}
                                    onChange={(e) =>
                                        updateField("currentCountry", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-state">
                                    State / Province *
                                </label>
                                <input
                                    id="candidate-state"
                                    className={inputClass}
                                    placeholder="Enter state or province"
                                    autoComplete="address-level1"
                                    value={form.state}
                                    onChange={(e) => updateField("state", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass} htmlFor="candidate-city">
                                    City *
                                </label>
                                <input
                                    id="candidate-city"
                                    className={inputClass}
                                    placeholder="Enter your current city"
                                    autoComplete="address-level2"
                                    value={form.city}
                                    onChange={(e) => updateField("city", e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Education and experience */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8f5] text-sm font-extrabold text-[#07877f]">
                                02
                            </span>
                            <div>
                                <h3 className="font-bold text-[#102844]">
                                    Education & Experience
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Your qualifications and professional background
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className={labelClass} htmlFor="candidate-qualification">
                                    Highest Qualification *
                                </label>
                                <select
                                    id="candidate-qualification"
                                    className={inputClass}
                                    value={form.qualification}
                                    onChange={(e) =>
                                        updateField("qualification", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select qualification</option>
                                    <option value="10th">10th</option>
                                    <option value="12th">12th</option>
                                    <option value="ITI">ITI</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Graduate">Graduate / Bachelor's Degree</option>
                                    <option value="Postgraduate">Postgraduate / Master's Degree</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-specialization">
                                    Trade / Specialization *
                                </label>
                                <input
                                    id="candidate-specialization"
                                    className={inputClass}
                                    placeholder="e.g. Electrical, Mechanical"
                                    value={form.specialization}
                                    onChange={(e) =>
                                        updateField("specialization", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-experience-type">
                                    Experience Level *
                                </label>
                                <select
                                    id="candidate-experience-type"
                                    className={inputClass}
                                    value={form.experienceType}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        updateField("experienceType", value);
                                        if (value === "Fresher") {
                                            updateField("experienceYears", "0");
                                        } else if (form.experienceYears === "0") {
                                            updateField("experienceYears", "");
                                        }
                                    }}
                                    required
                                >
                                    <option value="">Select experience level</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="Experienced">Experienced</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-years">
                                    Years of Experience *
                                </label>
                                <select
                                    id="candidate-years"
                                    className={inputClass}
                                    value={form.experienceYears}
                                    onChange={(e) =>
                                        updateField("experienceYears", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select experience</option>
                                    <option value="0">No experience</option>
                                    <option value="Less than 1 year">Less than 1 year</option>
                                    <option value="1-2 years">1–2 years</option>
                                    <option value="3-5 years">3–5 years</option>
                                    <option value="6-10 years">6–10 years</option>
                                    <option value="More than 10 years">More than 10 years</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Job preferences */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5fc] text-sm font-extrabold text-[#2465a7]">
                                03
                            </span>
                            <div>
                                <h3 className="font-bold text-[#102844]">
                                    Job Preferences
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Tell us what kind of opportunities you are looking for
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass} htmlFor="candidate-role">
                                    Preferred Job Role *
                                </label>
                                <input
                                    id="candidate-role"
                                    className={inputClass}
                                    placeholder="e.g. Lift Technician, Electrician, Supervisor"
                                    value={form.preferredRole}
                                    onChange={(e) =>
                                        updateField("preferredRole", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <fieldset className="sm:col-span-2">
                                <legend className={labelClass}>
                                    Preferred Job Market *
                                </legend>

                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                    {["India", "Overseas", "Both"].map((option) => (
                                        <label
                                            key={option}
                                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-semibold transition ${form.jobPreference === option
                                                    ? "border-[#0d9488] bg-teal-50 text-[#087e76] ring-2 ring-teal-500/10"
                                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="jobPreference"
                                                value={option}
                                                checked={form.jobPreference === option}
                                                onChange={(e) =>
                                                    updateField("jobPreference", e.target.value)
                                                }
                                                className="accent-[#0d9488]"
                                                required
                                            />
                                            {option === "Both"
                                                ? "India & Overseas"
                                                : option}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            {showDestination && (
                                <div className="sm:col-span-2">
                                    <label
                                        className={labelClass}
                                        htmlFor="candidate-destination"
                                    >
                                        Preferred Destination Country *
                                    </label>
                                    <input
                                        id="candidate-destination"
                                        className={inputClass}
                                        placeholder="e.g. UAE, Saudi Arabia, Germany"
                                        value={form.destinationCountry}
                                        onChange={(e) =>
                                            updateField("destinationCountry", e.target.value)
                                        }
                                        required={showDestination}
                                    />
                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                        You may enter one or more preferred countries.
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className={labelClass} htmlFor="candidate-salary">
                                    Expected Salary
                                </label>
                                <input
                                    id="candidate-salary"
                                    className={inputClass}
                                    placeholder="e.g. ₹25,000/month or negotiable"
                                    value={form.expectedSalary}
                                    onChange={(e) =>
                                        updateField("expectedSalary", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className={labelClass} htmlFor="candidate-notice">
                                    Availability / Notice Period *
                                </label>
                                <select
                                    id="candidate-notice"
                                    className={inputClass}
                                    value={form.noticePeriod}
                                    onChange={(e) =>
                                        updateField("noticePeriod", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select availability</option>
                                    <option value="Immediate">Available immediately</option>
                                    <option value="15 days">Within 15 days</option>
                                    <option value="30 days">Within 30 days</option>
                                    <option value="60 days">Within 60 days</option>
                                    <option value="90 days">Within 90 days</option>
                                    <option value="Negotiable">Negotiable</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Consent */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-extrabold text-slate-700">
                                04
                            </span>
                            <div>
                                <h3 className="font-bold text-[#102844]">
                                    Declaration & Consent
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Please review before submitting
                                </p>
                            </div>
                        </div>

                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <input
                                type="checkbox"
                                checked={form.consent}
                                onChange={(e) => updateField("consent", e.target.checked)}
                                className="mt-1 h-4 w-4 shrink-0 accent-[#0d9488]"
                                required
                            />
                            <span className="text-sm leading-6 text-slate-600">
                                I confirm that the information provided is accurate to the
                                best of my knowledge. I consent to NLETA using these details
                                to assess my profile and contact me regarding relevant
                                opportunities, subject to its applicable privacy policy and
                                lawful data-handling practices. *
                            </span>
                        </label>

                        <p className="mt-4 text-xs leading-6 text-slate-500">
                            Registration does not guarantee an interview, job offer,
                            placement, visa or work permit. Do not submit passport copies,
                            medical records or other sensitive documents through this form.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {submitting ? "Submitting..." : "Submit Candidate Registration"}
                        {!submitting && (
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
