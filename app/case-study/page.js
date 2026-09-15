"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConstellationBackground from "@/components/effects/ConstellationBackground";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Magnetic from "@/components/ui/Magnetic";
import { IMAGES } from "@/data/images";
import { REGISTER_CLIENT_URL } from "@/data/links";

const EASE = [0.22, 1, 0.36, 1];

const HEADLINE_STATS = [
  { value: "+73%", label: "Total sales" },
  { value: "+50%", label: "Sessions" },
  { value: "1.07M", label: "Search impressions" },
  { value: "+24%", label: "Conversion rate" },
];

const PANELS = [
  {
    tag: "Acquisition",
    title: "A diversified traffic mix",
    desc: "No single channel carries the store. Organic search, paid social, direct and organic social all contribute meaningfully — engagement holding above 92% across the board — so the business isn't one ad account away from a slowdown.",
    image: IMAGES.caseStudy1,
    stat: { value: "92.76%", label: "Avg. engagement rate" },
  },
  {
    tag: "SEO",
    title: "Organic clicks compounding month over month",
    desc: "Three months into structured SEO work, Search Console shows steady click volume against 201K impressions, with the average position climbing toward the top of page one.",
    image: IMAGES.caseStudy2,
    stat: { value: "5.54K", label: "Clicks · 3 months" },
  },
  {
    tag: "Paid Media",
    title: "Full-funnel pixel accuracy on Meta",
    desc: "Search, Add to Cart, Initiate Checkout, Add Payment Info and Purchase are all tracked server-and-browser side, giving campaign optimisation clean signal from the very top of the funnel to the sale.",
    image: IMAGES.caseStudy3,
    stat: { value: "5", label: "Funnel events, fully active" },
  },
  {
    tag: "Revenue",
    title: "Sessions and sales climbing together",
    desc: "Store-level analytics tell the real story — sessions up 50%, total sales up 73% and conversion rate up 24% quarter over quarter, proof the extra traffic actually converts.",
    image: IMAGES.caseStudy4,
    stat: { value: "27", label: "Orders, +4% QoQ" },
  },
  {
    tag: "Paid Media",
    title: "TikTok added as a second growth engine",
    desc: "Server-side event tracking extended to TikTok Ads Manager — Pageview through to Purchase all reporting live, with event match quality scores actively monitored and improved.",
    image: IMAGES.caseStudy5,
    stat: { value: "1,948", label: "Pageview events tracked" },
  },
  {
    tag: "SEO",
    title: "Sustained visibility, not a short-term spike",
    desc: "Zoomed out over a full year, the same domain now pulls 1.07M impressions and 4.81K clicks a month — evidence the early SEO gains held and kept scaling.",
    image: IMAGES.caseStudy6,
    stat: { value: "1.07M", label: "Impressions · 12 months" },
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <ConstellationBackground />

      <main className="relative z-10 min-h-screen">
        {/* Page identifier */}
        <section className="relative pt-24 pb-4 sm:pt-28 sm:pb-6">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <div>
                <h1 className="font-serif text-[1.3rem] text-white sm:text-[1.5rem]">
                  Case Study
                </h1>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
                  Growth, in the client&apos;s own dashboards
                </p>
              </div>
            </motion.div>
            <div className="mt-6 h-px w-full bg-white/[0.06]" />
          </div>
        </section>

        {/* Hero */}
        <section className="relative py-8 sm:py-14">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="max-w-3xl"
            >
              <span className="label label-line text-violet-300/80">
                E-commerce · Shopify
              </span>
              <h2 className="mt-6 display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.05] text-white">
                One quarter of focused work,
                <br />
                <span className="italic text-gradient-violet">
                  measured in real dashboards.
                </span>
              </h2>
              <p className="mt-6 max-w-[560px] text-[0.98rem] leading-relaxed text-white/60">
                No mock-ups, no vanity screenshots — every panel below is
                pulled straight from the client&apos;s own Google Analytics,
                Search Console, Meta Events Manager, Shopify and TikTok Ads
                accounts. SEO, paid social and analytics working as one
                system, tracked end to end.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Evidence panels */}
        <section className="relative py-12 sm:py-20">
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-violet-600/10 blur-[200px]" />

          <div className="container relative flex flex-col gap-16 sm:gap-24">
            {PANELS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Screenshot */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_20px_60px_-20px_rgba(91,33,182,0.35)]">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
                </div>

                {/* Copy */}
                <div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-violet-400/60">
                    {String(i + 1).padStart(2, "0")} · {p.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-white">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                    {p.desc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
                    <span className="font-serif text-[0.9rem] text-violet-300">
                      {p.stat.value}
                    </span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-wide text-white/30">
                      {p.stat.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 sm:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <h2 className="mt-8 display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-white/80">
              Want numbers like these
              <br />
              <span className="italic text-gradient-violet">
                on your own dashboards?
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] text-white/50">
              We take on a limited number of projects at a time so every
              brand gets the focus it deserves.
            </p>
            <div className="mt-8">
              <Magnetic strength={0.4}>
                <a
                  href={REGISTER_CLIENT_URL}
                  data-cursor-label="Let's talk"
                  className="btn btn-primary"
                >
                  Start your project
                </a>
              </Magnetic>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
