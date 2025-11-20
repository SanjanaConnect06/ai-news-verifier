import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

const cards = [
  {
    title: 'Real-Time Verification',
    description:
      'AI scans and analyzes claims instantly to give credibility scores within seconds.',
  },
  {
    title: 'Multi-Source Fact Checking',
    description:
      'Cross-checks information using high-quality and trusted news sources.',
  },
  {
    title: 'Indian Language Support',
    description:
      'Understands news claims in multiple Indian languages for inclusive verification.',
  },
  {
    title: 'Reliable & Transparent',
    description:
      'Truthify explains how each claim was analyzed with source-based evidence.',
  },
];

export default function Features({ prefersReducedMotion, onVerifyLinkClick }) {
  return (
    <div className="relative overflow-hidden bg-black/60 px-4 py-20 sm:px-6 lg:px-8">
      {/* Mid explanatory section */}
      <section
        aria-label="Why fighting misinformation is hard"
        className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <FloatingParticles density="low" variant="mid" />
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-400">
          Fighting misinformation is hard.
        </p>
        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-[0.96rem]"
        >
          Truthify simplifies complex fact-checking by using AI to compare claims across multiple
          trusted sources, detect inconsistencies, analyze credibility signals, and help readers
          know what’s real.
        </motion.p>
        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-[0.96rem]"
        >
          Our platform is built to make verification fast, accurate, and accessible — empowering
          everyone to identify misinformation effortlessly.
        </motion.p>
      </section>

      {/* Feature cards */}
      <section
        aria-label="Truthify core features"
        className="relative mx-auto mt-16 max-w-6xl"
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col gap-3 rounded-2xl border border-white/7 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-slate-950/90 p-5 text-left shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-md"
            >
              <div className="mb-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-truthify-blue/40 bg-black/60 shadow-[0_0_20px_rgba(46,167,255,0.45)]">
                <div className="h-4 w-4 rounded-[6px] border border-truthify-blue/70" />
              </div>
              <h3 className="font-display text-[0.95rem] font-semibold tracking-[0.16em] text-slate-50">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">{card.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onVerifyLinkClick}
            className="inline-flex items-center text-sm font-semibold text-truthify-blue underline underline-offset-4 transition-transform duration-150 hover:-translate-y-0.5 hover:text-truthify-purple-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-truthify-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Verify a News Claim
          </button>
        </div>
      </section>
    </div>
  );
}