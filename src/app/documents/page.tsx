const documents = [
    {
        title: "NLETA Introduction",
        category: "Document",
        year: "2026",
        file: "/documents/NLETA Introduction.pdf",
        description: "Official document by NLETA.",
    },
    {
        title: "Service selection Proposal",
        category: "Document",
        year: "2026",
        file: "/documents/Service selection Proposal.pdf",
        description: "Official NLETA document.",
    },
    {
        title: "NLETA Annexure-A",
        category: "Pricing",
        year: "2026",
        file: "/documents/Annexure-A.pdf",
        description: "Official NLETA pricing document.",
    },
    {
        title: "NLETA Annexure-B",
        category: "Pricing",
        year: "2026",
        file: "/documents/Annexure-B.pdf",
        description: "Official NLETA pricing document.",
    },
    {
        title: "NLETA ISO 9001:2015 Certificate",
        category: "Certification",
        year: "2026",
        file: "/documents/ISO9001.jpeg",
        description: "Official NLETA certification document.",
    },

    {
        title: "NLETA ISO 210001:2025 Certificate",
        category: "Certification",
        year: "2026",
        file: "/documents/ISO21001.jpeg",
        description: "Official NLETA certification document.",
    },

    {
        title: "NLETA ISO 45001:2018 Certificate",
        category: "Certification",
        year: "2026",
        file: "/documents/ISO45001.jpeg",
        description: "Official NLETA certification document.",
    },
];

export default function DocumentsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <style>{`
                @keyframes documentsHeroZoom {
                    0% {
                        transform: scale(1);
                    }

                    100% {
                        transform: scale(1.08);
                    }
                }

                @keyframes documentsFadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(24px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes documentsFadeIn {
                    0% {
                        opacity: 0;
                    }

                    100% {
                        opacity: 1;
                    }
                }

                @keyframes documentsIconFloat {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-3px);
                    }
                }

                .documents-hero-image {
                    animation: documentsHeroZoom 12s ease-in-out infinite alternate;
                    will-change: transform;
                }

                .documents-hero-content {
                    animation: documentsFadeUp 0.8s ease-out both;
                }

                .documents-section-content {
                    animation: documentsFadeUp 0.8s ease-out 0.15s both;
                }

                .documents-card {
                    animation: documentsFadeUp 0.7s ease-out both;
                }

                .documents-file-icon {
                    transition:
                        transform 0.35s ease,
                        box-shadow 0.35s ease;
                }

                .documents-card:hover .documents-file-icon {
                    transform: translateY(-3px) rotate(-2deg);
                    box-shadow: 0 10px 22px rgba(23, 18, 71, 0.18);
                }

                .documents-view-button,
                .documents-download-button {
                    transition:
                        transform 0.25s ease,
                        box-shadow 0.25s ease,
                        background-color 0.25s ease,
                        border-color 0.25s ease;
                }

                .documents-view-button:hover,
                .documents-download-button:hover {
                    transform: translateY(-2px);
                }

                @media (prefers-reduced-motion: reduce) {
                    .documents-hero-image,
                    .documents-hero-content,
                    .documents-section-content,
                    .documents-card {
                        animation: none !important;
                    }

                    .documents-file-icon,
                    .documents-view-button,
                    .documents-download-button {
                        transition: none !important;
                    }
                }
            `}</style>

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative min-h-[430px] overflow-hidden lg:min-h-[460px]">
                {/* BACKGROUND IMAGE */}
                <div
                    className="documents-hero-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/documents-bg.png')",
                    }}
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-[#171247]/80" />

                {/* COLOR OVERLAY */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,138,0,0.20),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(23,108,240,0.20),transparent_35%)]" />

                {/* HERO CONTENT */}
                <div className="documents-hero-content relative mx-auto flex min-h-[430px] max-w-7xl items-center px-5 py-20 sm:px-6 lg:min-h-[460px] lg:px-8 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                            NLETA
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Documents
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                            Access official NLETA documents, reports,
                            certificates and other important publications.
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                DOCUMENTS
            ====================================================== */}
            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
                {/* SECTION HEADER */}
                <div className="documents-section-content mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
                            Official Resources
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-[#171247] sm:text-3xl">
                            NLETA Documents
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            View or download official documents published by the National
                            Lift &amp; Escalator Testing Agency.
                        </p>
                    </div>

                    <div className="rounded-lg bg-[#171247] px-4 py-2.5 text-xs font-bold text-white shadow-sm">
                        {documents.length} Documents
                    </div>
                </div>

                {/* =================================================
                    DOCUMENT LIST
                ================================================== */}
                <div className="grid gap-4 md:grid-cols-2">
                    {documents.map((document, index) => (
                        <article
                            key={`${document.file}-${index}`}
                            className="documents-card group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#171247]/20 hover:shadow-[0_16px_35px_rgba(23,18,71,0.10)]"
                            style={{
                                animationDelay: `${0.12 + index * 0.1}s`,
                            }}
                        >
                            <div className="flex gap-4">
                                {/* FILE ICON */}
                                <div className="documents-file-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#171247] text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.25 2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15A2.25 2.25 0 0 0 6.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25V7.5l-5.25-5.25Z"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.25 2.25V7.5h5.25M8.25 12h7.5M8.25 15.75h7.5"
                                        />
                                    </svg>
                                </div>

                                {/* CONTENT */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                                                {document.category}
                                            </span>

                                            <h3 className="mt-2 text-base font-bold leading-6 text-[#171247]">
                                                {document.title}
                                            </h3>
                                        </div>

                                        <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                                            {document.year}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                        {document.description}
                                    </p>

                                    {/* ACTIONS */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {/* VIEW */}
                                        <a
                                            href={document.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="documents-view-button inline-flex items-center gap-2 rounded-md bg-[#cac4ff] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#241b65] hover:shadow-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12 18.25 18.75 12 18.75 2.25 12 2.25 12Z"
                                                />

                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="2.75"
                                                />
                                            </svg>

                                            View
                                        </a>

                                        {/* DOWNLOAD */}
                                        <a
                                            href={document.file}
                                            download
                                            className="documents-download-button inline-flex items-center gap-2 rounded-md border border-[#171247]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#171247] hover:border-[#171247] hover:bg-slate-50 hover:shadow-sm"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4.5 21h15"
                                                />
                                            </svg>

                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* =================================================
                    EMPTY STATE
                ================================================== */}
                {documents.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#171247]/5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="h-7 w-7 text-[#171247]"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15A2.25 2.25 0 0 0 6.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25V7.5l-5.25-5.25Z"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 2.25V7.5h5.25"
                                />
                            </svg>
                        </div>

                        <h3 className="mt-4 text-base font-bold text-slate-800">
                            No documents available
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Official NLETA documents will appear here once they are
                            published.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
