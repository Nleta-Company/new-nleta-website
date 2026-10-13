import Image from "next/image";
import Link from "next/link";
import { footerNavigation, siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-nleta-navy text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
              <Image
                src="/nleta-logo.jpg"
                alt="NLETA official logo"
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </span>

            <span className="text-2xl font-extrabold">
              {siteConfig.name}
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/75">
            Engineering services, lift and escalator safety, skill
            development, and digital governance for a safer industry.
          </p>

          <p className="mt-4 text-sm text-blue-100/75">
            Engineering · Safety · Training
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-blue-100/75">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <Link href="/news" className="transition hover:text-white">
                News &amp; Updates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold">Contact</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-blue-100/75">
            <p>National Lift &amp; Escalator Testing Agency</p>

            <a
              href="mailto:info@nleta.org.in"
              className="block hover:text-white"
            >
              info@nleta.org.in
            </a>

            <Link
              href="/contact"
              className="inline-block hover:text-white"
            >
              Contact and enquiries ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-blue-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
