
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#f3f6fa] px-4 py-20">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[45px] border-[#102844]/5" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[45px] border-[#12a6a0]/10" />

      <div className="container-shell relative mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-7 flex h-1 w-24 overflow-hidden rounded-full">
          <span className="w-1/3 bg-[#ff9933]" />
          <span className="w-1/3 bg-white" />
          <span className="w-1/3 bg-[#138808]" />
        </div>

        <div className="text-8xl font-extrabold tracking-tighter text-[#102844] sm:text-9xl">
          404
        </div>

        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#2465a7]">
          Page not found
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#102844] sm:text-4xl">
          Looks like this page has moved.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">
          The page you are looking for may have been moved,
          removed, or may not exist. Return to the NLETA homepage
          to explore our engineering services, training, and
          industry resources.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary">
            <span aria-hidden="true">←</span>
            Back to Homepage
          </Link>

          <Link href="/contact" className="button-secondary">
            Contact NLETA
          </Link>
        </div>

        <div className="mt-12 border-t border-[#dfe6ee] pt-6">
          <p className="text-sm font-semibold text-[#102844]">
            NLETA
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Engineering · Safety · Training · Digital Governance
          </p>
        </div>
      </div>
    </main>
  );
}
