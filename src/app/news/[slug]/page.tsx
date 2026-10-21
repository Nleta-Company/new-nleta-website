import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { latestNews } from "@/app/news/newsData";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const instant = false;

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = latestNews.find((item) => item.slug === slug);

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  return {
    title: news.title,
    description: news.summary,
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;

  const news = latestNews.find((item) => item.slug === slug);

  if (!news) {
    notFound();
  }

  const hasArticleContent =
    Boolean(news.content?.trim()) &&
    !news.content?.includes("Complete verified");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================================================
          NEWS DETAIL HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#071b2f] py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: "url('/images/nleta-news-bg.png')",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#071b2f]/75"
        />

        <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
          {/* Back to News */}
          <Link
            href="/news#news"
            className="inline-flex items-center text-sm font-semibold text-cyan-300 transition hover:text-white"
          >
            ← Back to News
          </Link>

          <div className="mt-8">
            {/* Category + Important */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-200 ring-1 ring-white/20">
                {news.category}
              </span>

              {news.important && (
                <span className="inline-flex rounded-full bg-amber-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-200 ring-1 ring-amber-300/30">
                  Important
                </span>
              )}
            </div>

            {/* Date */}
            <p className="mt-6 text-sm font-medium uppercase tracking-wide text-slate-300">
              {news.date}
            </p>

            {/* Title */}
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              {news.title}
            </h1>

            {/* Summary */}
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
              {news.summary}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          NEWS DETAIL CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {/* META */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Source
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {news.source}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {news.category}
              </span>

              {news.important && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Important
                </span>
              )}
            </div>
          </div>

          {/* ARTICLE */}
          <div className="pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
              News Details
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              {news.title}
            </h2>

            <p className="mt-5 text-base font-medium leading-8 text-slate-700">
              {news.summary}
            </p>

            {hasArticleContent ? (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <div className="whitespace-pre-line text-base leading-8 text-slate-700">
                  {news.content}
                </div>
              </div>
            ) : (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8">
                  <p className="font-semibold text-slate-800">
                    Article content will be published here.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Complete verified NLETA news content will be added when the
                    official article information is available.
                  </p>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* BACK BUTTONS */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/news#news"
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            ← Back to Latest News
          </Link>

          <Link
            href="/news#accidental-report"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Accidental Reports
          </Link>
        </div>
      </main>
    </div>
  );
}