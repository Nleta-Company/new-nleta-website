
"use client";

import { useState, type FormEvent } from "react";

type HiringRequirement = {
  hiringMarket: string;
  destinationCountry: string;
  industry: string;
  jobRole: string;
  vacancies: string;
  qualification: string;
  experience: string;
  salary: string;
  jobLocation: string;
  employmentType: string;
  contractDuration: string;
};

type EmployerEnquiryResponse = {
  id?: string;
  referenceNumber?: string;
  message?: string | string[];
};

const emptyRequirement = (): HiringRequirement => ({
  hiringMarket: "Domestic — India",
  destinationCountry: "",
  industry: "",
  jobRole: "",
  vacancies: "",
  qualification: "",
  experience: "",
  salary: "",
  jobLocation: "",
  employmentType: "Permanent",
  contractDuration: "",
});

export default function EmployerConnectForm() {
  const [employerType, setEmployerType] = useState("Direct Employer");

  const [requirements, setRequirements] = useState<HiringRequirement[]>([
    emptyRequirement(),
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

  const labelClass = "text-sm font-semibold text-slate-700";

  const hasInternationalRequirement = requirements.some(
    (requirement) => requirement.hiringMarket === "International",
  );

  function updateRequirement(
    index: number,
    field: keyof HiringRequirement,
    value: string,
  ) {
    setRequirements((current) =>
      current.map((requirement, requirementIndex) =>
        requirementIndex === index
          ? { ...requirement, [field]: value }
          : requirement,
      ),
    );

    setSubmitError("");
  }

  function addRequirement() {
    setRequirements((current) => [...current, emptyRequirement()]);
    setSubmitError("");
  }

  function removeRequirement(index: number) {
    setRequirements((current) =>
      current.filter((_, requirementIndex) => requirementIndex !== index),
    );

    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

      if (!apiBase) {
        throw new Error(
          "The submission service is not configured. Please contact NLETA.",
        );
      }

      const form = event.currentTarget;

      if (!form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);

      const read = (name: string): string =>
        String(formData.get(name) ?? "").trim();

      const payload = {
        companyName: read("companyName"),
        employerType: read("employerType"),
        country: read("country"),
        state: read("state") || null,
        city: read("city"),
        address: read("address") || null,
        website: read("website") || null,
        gstRegistrationNumber: read("gstRegistrationNumber") || null,
        agencyLicence: read("agencyLicence") || null,

        contactName: read("contactName"),
        designation: read("designation"),
        email: read("email"),
        phone: read("phone"),

        recruitmentModel: read("recruitmentModel"),
        sponsorship: hasInternationalRequirement
          ? read("sponsorship") || null
          : null,
        accommodation: read("accommodation"),
        transport: read("transport") || null,
        workingHours: read("workingHours"),
        weeklyOff: read("weeklyOff") || null,
        additionalConditions: read("additionalConditions") || null,

        declaration: formData.get("declaration") === "on",

        requirements: requirements.map((item) => ({
          hiringMarket: item.hiringMarket,

          destinationCountry:
            item.hiringMarket === "International"
              ? item.destinationCountry.trim()
              : null,

          industry: item.industry.trim(),
          jobRole: item.jobRole.trim(),
          vacancies: Number(item.vacancies),
          qualification: item.qualification.trim() || null,
          experience: item.experience.trim() || null,
          salary: item.salary.trim(),
          jobLocation: item.jobLocation.trim(),
          employmentType: item.employmentType,

          contractDuration:
            item.employmentType === "Contract"
              ? item.contractDuration.trim()
              : null,
        })),
      };

      const response = await fetch(`${apiBase}/employer-enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: EmployerEnquiryResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        const message = Array.isArray(result.message)
          ? result.message.join(", ")
          : result.message;

        throw new Error(
          message || "Unable to submit your enquiry. Please try again.",
        );
      }

      setReferenceNumber(
        result.referenceNumber || result.id || "",
      );

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setEmployerType("Direct Employer");
    setRequirements([emptyRequirement()]);
    setSubmitted(false);
    setSubmitError("");
    setReferenceNumber("");
  }

  return (
    <section
      id="employer-connect-form"
      className="scroll-mt-24 bg-[#f3f6fa] py-16 sm:py-20"
    >
      <div className="container-shell mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            Employer Connect
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#102844] sm:text-4xl">
            Share Your Hiring Requirements
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Tell us about your organisation and one or more vacancies so NLETA
            can understand your requirements.
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            className="rounded-2xl border border-teal-200 bg-white p-8 text-center shadow-sm"
          >
            <div className="text-3xl text-teal-700">✓</div>

            <h3 className="mt-3 text-xl font-bold text-[#102844]">
              Enquiry Submitted Successfully
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Thank you for contacting NLETA. Your employer enquiry has been
              submitted successfully.
            </p>

            {referenceNumber && (
              <div className="mt-5 rounded-xl bg-teal-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Your Enquiry Reference
                </p>

                <p className="mt-2 break-all text-lg font-bold text-teal-800">
                  {referenceNumber}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Please keep this reference number for future communication.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={resetForm}
              className="mt-6 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#102844] transition hover:bg-slate-50"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            {/* 1. Company details */}
            <div>
              <h3 className="text-xl font-bold text-[#102844]">
                01. Company Details
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Company / Organisation Name *
                  <input
                    className={inputClass}
                    name="companyName"
                    placeholder="Enter company name"
                    required
                    maxLength={200}
                  />
                </label>

                <label className={labelClass}>
                  Employer Type *
                  <select
                    className={inputClass}
                    name="employerType"
                    value={employerType}
                    onChange={(event) =>
                      setEmployerType(event.target.value)
                    }
                    required
                  >
                    <option>Direct Employer</option>
                    <option>Recruitment Agency</option>
                    <option>Contractor</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Country *
                  <input
                    className={inputClass}
                    name="country"
                    placeholder="Enter country"
                    required
                    maxLength={100}
                  />
                </label>

                <label className={labelClass}>
                  State / Province
                  <input
                    className={inputClass}
                    name="state"
                    placeholder="Enter state or province"
                    maxLength={100}
                  />
                </label>

                <label className={labelClass}>
                  City *
                  <input
                    className={inputClass}
                    name="city"
                    placeholder="Enter city"
                    required
                    maxLength={100}
                  />
                </label>

                <label className={labelClass}>
                  Office Address
                  <input
                    className={inputClass}
                    name="address"
                    placeholder="Enter office address"
                    maxLength={500}
                  />
                </label>

                <label className={labelClass}>
                  Company Website
                  <input
                    className={inputClass}
                    name="website"
                    type="url"
                    placeholder="https://example.com"
                    maxLength={500}
                  />
                </label>

                <label className={labelClass}>
                  GST No. / Registration No.
                  <input
                    className={inputClass}
                    name="gstRegistrationNumber"
                    placeholder="Enter GST or company registration number"
                    maxLength={100}
                  />
                 
                </label>

                {employerType === "Recruitment Agency" && (
                  <label className={labelClass}>
                    Agency Registration / Licence Details
                    <input
                      className={inputClass}
                      name="agencyLicence"
                      placeholder="Enter details, if applicable"
                      maxLength={1000}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* 2. Contact details */}
            <div>
              <h3 className="text-xl font-bold text-[#102844]">
                02. Contact Person
              </h3>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Contact Person Name *
                  <input
                    className={inputClass}
                    name="contactName"
                    placeholder="Full name"
                    required
                    maxLength={150}
                  />
                </label>

                <label className={labelClass}>
                  Designation *
                  <input
                    className={inputClass}
                    name="designation"
                    placeholder="e.g. HR Manager"
                    required
                    maxLength={150}
                  />
                </label>

                <label className={labelClass}>
                  Official Email *
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    maxLength={254}
                  />
                </label>

                <label className={labelClass}>
                  Contact Number *
                  <input
                    className={inputClass}
                    name="phone"
                    type="tel"
                    placeholder="Enter contact number"
                    required
                    maxLength={30}
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* 3. Repeatable hiring requirements */}
            <div>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#102844]">
                    03. Hiring Requirements
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Add a separate requirement for each job role or vacancy
                    group.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addRequirement}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#102844] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1b4169]"
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    +
                  </span>
                  Add Another Requirement
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {requirements.map((requirement, index) => (
                  <fieldset
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                      <legend className="text-base font-bold text-[#102844]">
                        Requirement {String(index + 1).padStart(2, "0")}
                      </legend>

                      {requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        Hiring Market *
                        <select
                          className={inputClass}
                          name={`requirements[${index}].hiringMarket`}
                          value={requirement.hiringMarket}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "hiringMarket",
                              event.target.value,
                            )
                          }
                          required
                        >
                          <option>Domestic — India</option>
                          <option>International</option>
                        </select>
                      </label>

                      {requirement.hiringMarket === "International" && (
                        <label className={labelClass}>
                          Destination Country *
                          <input
                            className={inputClass}
                            name={`requirements[${index}].destinationCountry`}
                            value={requirement.destinationCountry}
                            onChange={(event) =>
                              updateRequirement(
                                index,
                                "destinationCountry",
                                event.target.value,
                              )
                            }
                            placeholder="Country where the job is located"
                            required
                            maxLength={100}
                          />
                        </label>
                      )}

                      <label className={labelClass}>
                        Industry / Sector *
                        <select
                          className={inputClass}
                          name={`requirements[${index}].industry`}
                          value={requirement.industry}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "industry",
                              event.target.value,
                            )
                          }
                          required
                        >
                          <option value="">Select industry</option>
                          <option>Lift &amp; Escalator</option>
                          <option>Engineering &amp; Technical Services</option>
                          <option>Facility Management</option>
                          <option>Infrastructure / MEP</option>
                          <option>Other</option>
                        </select>
                      </label>

                      <label className={labelClass}>
                        Job Role / Designation *
                        <input
                          className={inputClass}
                          name={`requirements[${index}].jobRole`}
                          value={requirement.jobRole}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "jobRole",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. Lift Technician"
                          required
                          maxLength={200}
                        />
                      </label>

                      <label className={labelClass}>
                        Number of Vacancies *
                        <input
                          className={inputClass}
                          name={`requirements[${index}].vacancies`}
                          type="number"
                          min="1"
                          step="1"
                          value={requirement.vacancies}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "vacancies",
                              event.target.value,
                            )
                          }
                          placeholder="Enter number of openings"
                          required
                        />
                      </label>

                      <label className={labelClass}>
                        Qualification Required
                        <input
                          className={inputClass}
                          name={`requirements[${index}].qualification`}
                          value={requirement.qualification}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "qualification",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. ITI / Diploma"
                          maxLength={500}
                        />
                      </label>

                      <label className={labelClass}>
                        Experience Required
                        <input
                          className={inputClass}
                          name={`requirements[${index}].experience`}
                          value={requirement.experience}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "experience",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. 2–5 years"
                          maxLength={200}
                        />
                      </label>

                      <label className={labelClass}>
                        Salary Range *
                        <input
                          className={inputClass}
                          name={`requirements[${index}].salary`}
                          value={requirement.salary}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "salary",
                              event.target.value,
                            )
                          }
                          placeholder={
                            requirement.hiringMarket === "International"
                              ? "Amount and currency"
                              : "e.g. ₹20,000–₹30,000 per month"
                          }
                          required
                          maxLength={200}
                        />
                      </label>

                      <label className={labelClass}>
                        Job Location *
                        <input
                          className={inputClass}
                          name={`requirements[${index}].jobLocation`}
                          value={requirement.jobLocation}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "jobLocation",
                              event.target.value,
                            )
                          }
                          placeholder="City / work location"
                          required
                          maxLength={200}
                        />
                      </label>

                      <label className={labelClass}>
                        Employment Type *
                        <select
                          className={inputClass}
                          name={`requirements[${index}].employmentType`}
                          value={requirement.employmentType}
                          onChange={(event) =>
                            updateRequirement(
                              index,
                              "employmentType",
                              event.target.value,
                            )
                          }
                          required
                        >
                          <option>Permanent</option>
                          <option>Contract</option>
                          <option>Temporary</option>
                        </select>
                      </label>

                      {requirement.employmentType === "Contract" && (
                        <label className={labelClass}>
                          Contract Duration *
                          <input
                            className={inputClass}
                            name={`requirements[${index}].contractDuration`}
                            value={requirement.contractDuration}
                            onChange={(event) =>
                              updateRequirement(
                                index,
                                "contractDuration",
                                event.target.value,
                              )
                            }
                            placeholder="e.g. 12 months"
                            required
                            maxLength={100}
                          />
                        </label>
                      )}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* 4. Recruitment conditions */}
            <div>
              <h3 className="text-xl font-bold text-[#102844]">
                04. Recruitment Conditions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                These conditions apply to the requirements listed above unless
                otherwise agreed.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Recruitment Model *
                  <select
                    className={inputClass}
                    name="recruitmentModel"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select recruitment model
                    </option>
                    <option>Direct Hiring</option>
                    <option>Through Recruitment Agency</option>
                  </select>
                </label>

                {hasInternationalRequirement && (
                  <label className={labelClass}>
                    Work-Permit Sponsorship *
                    <select
                      className={inputClass}
                      name="sponsorship"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option>Yes — Employer will sponsor</option>
                      <option>No — Existing authorisation required</option>
                      <option>Depends on role / eligibility</option>
                    </select>
                  </label>
                )}

                <label className={labelClass}>
                  Accommodation *
                  <select
                    className={inputClass}
                    name="accommodation"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option>Provided</option>
                    <option>Not Provided</option>
                    <option>Allowance Provided</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Transport
                  <select
                    className={inputClass}
                    name="transport"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option>Provided</option>
                    <option>Not Provided</option>
                    <option>Allowance Provided</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Working Hours / Shifts *
                  <input
                    className={inputClass}
                    name="workingHours"
                    placeholder="e.g. 8 hours, rotational shifts"
                    required
                    maxLength={200}
                  />
                </label>

                <label className={labelClass}>
                  Weekly Off
                  <input
                    className={inputClass}
                    name="weeklyOff"
                    placeholder="e.g. Sunday / Rotational"
                    maxLength={200}
                  />
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Additional Hiring Conditions
                  <textarea
                    className={inputClass}
                    name="additionalConditions"
                    rows={4}
                    placeholder="Mention any other job or recruitment conditions"
                    maxLength={5000}
                  />
                </label>
              </div>
            </div>

            {/* Declaration */}
            <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                name="declaration"
                required
                className="mt-1 h-4 w-4 accent-teal-700"
              />

              <span>
                I confirm that the information provided is accurate and
                understand that submission does not automatically verify the
                employer or guarantee recruitment or placement.
              </span>
            </label>

            {/* API error */}
            {submitError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {submitError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-[#0d9488] to-[#12a6a0] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit Employer Enquiry →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
