"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNavigation, siteConfig } from "@/lib/site";

const loginLinks = [
  {
    label: "Dashboard Login",
    href: "https://nleta.site.je/login.php",
    description: "Access the NLETA service dashboard",
    icon: "▦",
    external: true,
  },
  {
    label: "CRM Login",
    href: "https://final-crm-three.vercel.app/",
    description: "Manage customer relationships",
    icon: "♙",
    external: true,
  },
  {
    label: "Admin Login",
    href: "/admin/login",
    description: "Manage website enquiries and administration",
    icon: "⚙",
    external: false,
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

  const isActiveLink = (href: string) => {
    const path = href.split("#")[0];
    if (!path || path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setLoginOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setLoginOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const renderLoginLinks = (mobile = false) =>
    loginLinks.map((item) => {
      const content = (
        <>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              mobile
                ? "bg-white text-[#2465a7]"
                : "border border-blue-100 bg-white text-[#2465a7] shadow-sm group-hover:bg-[#102844] group-hover:text-white"
            }`}
            aria-hidden="true"
          >
            {item.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-[#102844]">
              {item.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">
              {item.description}
            </span>
          </span>
          <span
            className="text-sm text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#2465a7]"
            aria-hidden="true"
          >
            ↗
          </span>
        </>
      );

      const className = mobile
        ? "group flex items-center gap-3 rounded-xl p-3 transition hover:bg-white"
        : "group flex items-center gap-3 rounded-xl p-3 transition hover:bg-[#f2f7fc]";

      return item.external ? (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenus}
          className={className}
        >
          {content}
        </a>
      ) : (
        <Link
          key={item.label}
          href={item.href}
          onClick={closeMenus}
          className={className}
        >
          {content}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip */}
      <div className="relative overflow-hidden bg-[#0b1e34] text-white">
        <div className="absolute inset-x-0 top-0 flex h-[2px]" aria-hidden="true">
          <span className="w-1/3 bg-[#ff9933]" />
          <span className="w-1/3 bg-white" />
          <span className="w-1/3 bg-[#138808]" />
        </div>

        <div className="container-shell flex min-h-9 items-center justify-between gap-3 pt-[2px] text-[11px] sm:text-xs">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            <span className="text-slate-200">Engineering</span>
            <span className="text-white/30">/</span>
            <span className="text-slate-200">Safety</span>
            <span className="text-white/30">/</span>
            <span className="text-slate-200">Training</span>
            <span className="text-white/30">/</span>
            <span className="text-slate-200">Digital Governance</span>
          </div>

          <p className="text-slate-200 sm:hidden">
            Engineering · Safety · Training
          </p>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-1.5 font-medium text-slate-200 transition hover:text-teal-200"
          >
            Contact NLETA
            <span
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,35,60,0.055)] backdrop-blur-xl">
        <div className="container-shell flex min-h-[78px] items-center justify-between gap-2 py-3 xl:gap-3">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="NLETA home"
            className="group flex min-w-0 shrink-0 items-center gap-2"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm transition duration-300 group-hover:-rotate-2 group-hover:border-teal-200 group-hover:shadow-md sm:h-[50px] sm:w-[50px]">
              <Image
                src="/nleta-logo.jpg"
                alt="NLETA official logo"
                width={50}
                height={50}
                priority
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[22px] font-extrabold leading-none tracking-[-0.06em] text-[#102844] sm:text-[25px]">
                NLETA
              </span>
              <span className="mt-1 max-w-[165px] text-[9px] leading-[1.35] text-slate-500 2xl:max-w-none 2xl:text-[10px]">
                National Lift &amp; Escalator Testing Agency
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0 xl:flex"
          >
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={`group relative whitespace-nowrap rounded-lg px-1.5 py-2.5 text-[11px] font-medium transition-all duration-200 2xl:px-2 2xl:text-[12px] ${
                  isActiveLink(item.href)
                    ? "bg-teal-50 text-[#087f7b] shadow-sm"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#102844]"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2 bottom-1 h-[2px] origin-left rounded-full bg-[#12a6a0] transition-transform duration-200 ${
                    isActiveLink(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
            <div className="relative" ref={loginRef}>
              <button
                type="button"
                onClick={() => setLoginOpen((open) => !open)}
                aria-expanded={loginOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${
                  loginOpen
                    ? "bg-blue-50 text-[#2465a7]"
                    : "text-[#102844] hover:bg-slate-50"
                }`}
              >
                Login
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    loginOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {loginOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_22px_65px_rgba(15,35,60,0.18)]">
                  <div className="px-3 pb-2 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#12a6a0]">
                      Secure access
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#102844]">
                      Choose your workspace
                    </p>
                  </div>
                  {renderLoginLinks()}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="group relative inline-flex min-h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-[#8eff94] px-3 py-2.5 text-[11px] font-bold text-[#102844] shadow-[0_5px_14px_rgba(16,40,68,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#72f581] hover:shadow-[0_9px_22px_rgba(16,40,68,0.22)] 2xl:px-4 2xl:text-[12px]"
            >
              <span className="absolute inset-y-0 left-0 w-1 bg-[#12a6a0] transition-all duration-200 group-hover:w-full group-hover:opacity-10" />
              <span className="relative">Enquire Now</span>
              <span
                className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Mobile / tablet menu button */}
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#102844] shadow-sm transition hover:border-teal-200 hover:bg-slate-50 lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen((open) => !open);
              setLoginOpen(false);
            }}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100svh-100px)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={`group flex items-center justify-between rounded-lg border-b border-slate-100 px-3 py-3.5 text-sm font-medium transition ${
                  isActiveLink(item.href)
                    ? "border-l-2 border-l-[#12a6a0] bg-teal-50 text-[#087f7b]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#2465a7]"
                }`}
              >
                {item.label}
                <span
                  className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#12a6a0]"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}

            <div className="border-b border-slate-100 py-3">
              <button
                type="button"
                onClick={() => setLoginOpen((open) => !open)}
                aria-expanded={loginOpen}
                aria-haspopup="true"
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-[#102844] hover:bg-slate-50"
              >
                Login
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`h-4 w-4 transition-transform ${loginOpen ? "rotate-180" : ""}`}
                >
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {loginOpen && (
                <div className="mt-2 space-y-1 rounded-xl bg-slate-50 p-2">
                  {renderLoginLinks(true)}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174b80]"
            >
              Enquire Now <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      )}

      <span className="sr-only">{siteConfig.fullName}</span>
    </header>
  );
}
