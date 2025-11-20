import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

const heroTextVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero({ id = 'hero', onVerifyClick, prefersReducedMotion }) {
  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8"
      aria-labelledby="truthify-hero-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(148,163,255,0.20),_transparent_65%)]" />
      <FloatingParticles density="normal" variant="hero" />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          variants={heroTextVariants}
          custom={0}
          className="mb-8 inline-flex items-center rounded-full border border-[#8C6BFF]/60 bg-black/40 px-5 py-2 text-xs font-semibold tracking-[0.15em] text-slate-100/90 shadow-[0_0_25px_rgba(140,107,255,0.6)] backdrop-blur-md"
        >
          <span className="mr-2 text-base" aria-hidden="true">
            ⚡
          </span>
          <span>AI-Powered Real-Time Verification</span>
        </motion.div>

        {/* Headline lines */}
        <div className="space-y-4">
          <motion.h1
            id="truthify-hero-heading"
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'visible'}
            variants={heroTextVariants}
            custom={0.12}
            className="font-display text-[2.5rem] font-black leading-tight tracking-[0.18em] text-slate-100 sm:text-5xl md:text-[3.4rem] lg:text-[3.8rem]"
          >
            VERIFY NEWS,
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'visible'}
            variants={heroTextVariants}
            custom={0.24}
            className="relative space-y-4"
          >
            <div className="inline-block">
              <div
                className="font-display text-[2.8rem] font-black uppercase tracking-[0.22em] text-transparent sm:text-[3.3rem] md:text-[3.8rem] lg:text-[4.1rem]"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #8C6BFF, #2EA7FF, #6B7CFF)',
                  WebkitBackgroundClip: 'text',
                  textShadow:
                    '0 0 26px rgba(140,107,255,0.75), 0 0 42px rgba(46,167,255,0.65)',
                }}
              >
                FIGHT MISINFORMATION 🔥
              </div>
            </div>

            {/* Animated underline */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
              transition={{
                delay: 0.5,
                duration: prefersReducedMotion ? 0.3 : 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'center' }}
              className="relative mx-auto h-[3px] w-full max-w-xl overflow-hidden rounded-full bg-slate-900/70"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8C6BFF] via-[#2EA7FF] to-[#6B7CFF]" />
              <motion.div
                initial={{ x: '-30%' }}
                animate={{ x: '120%' }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-y-[-6px] w-28 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.95),_transparent_70%)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          variants={heroTextVariants}
          custom={0.36}
          className="mt-10 max-w-3xl text-balance text-sm font-medium leading-relaxed text-slate-300 sm:text-base"
        >
          Instantly verify any news claim with AI-powered analysis across multiple trusted sources.
          Get credibility scores and fact-checking in seconds.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          variants={heroTextVariants}
          custom={0.46}
          className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm"
          aria-label="Key Truthify capabilities"
        >
          {["Multi-source verification", "Real-time analysis", "Indian languages support"].map(
            (label) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/5 px-4 py-2 text-[0.78rem] font-medium text-slate-100 shadow-[0_10px_35px_rgba(22,199,132,0.25)] backdrop-blur-sm"
              >
                <span className="text-emerald-400" aria-hidden="true">
                  ✓
                </span>
                <span>{label}</span>
              </div>
            ),
          )}
        </motion.div>

        {/* Search CTA row */}
        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          variants={heroTextVariants}
          custom={0.6}
          className="mt-10 w-full max-w-3xl"
        >
          <div
            className="relative rounded-full border border-slate-700/80 bg-black/60 p-[2px] shadow-[0_18px_70px_rgba(0,0,0,0.9)]"
            role="search"
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(46,167,255,0.22),_transparent_60%)]" />
            <div className="relative flex flex-col gap-3 rounded-full bg-black/70 px-4 py-2 sm:flex-row sm:items-center sm:px-5 sm:py-2.5">
              <input
                type="text"
                aria-label="Enter a news claim or headline to verify"
                placeholder="Enter a news claim or headline to verify…"
                className="h-11 w-full rounded-full border-none bg-transparent px-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
              />
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onVerifyClick}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8C6BFF] via-[#6B7CFF] to-[#2EA7FF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(46,167,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA7FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="relative" aria-hidden="true">
                  🔍
                </span>
                <span className="relative">Verify News Now</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}