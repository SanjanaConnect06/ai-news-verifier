import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Instant AI credibility scoring',
    color: 'rgba(22, 199, 132, 1)',
  },
  {
    label: 'Multi-source real-time verification',
    color: 'rgba(46, 167, 255, 1)',
  },
  {
    label: 'Cross-language Indian news support',
    color: 'rgba(140, 107, 255, 1)',
  },
  {
    label: 'Trusted sources aggregated instantly',
    color: 'rgba(139, 178, 36, 1)',
  },
];

export default function Stats({ prefersReducedMotion }) {
  return (
    <section
      aria-label="Truthify capability highlights"
      className="border-t border-white/5 bg-black/40 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        {stats.map((stat, index) => (
          <StatRow
            key={stat.label}
            label={stat.label}
            color={stat.color}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

function StatRow({ label, color, index, prefersReducedMotion }) {
  return (
    <div className="space-y-5 text-center">
      <motion.h2
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-xl font-extrabold uppercase tracking-[0.25em] text-slate-100 sm:text-2xl"
      >
        {label}
      </motion.h2>
      <AnimatedBar
        color={color}
        index={index}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
}

function AnimatedBar({ color, index, prefersReducedMotion }) {
  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, scaleX: 0 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: prefersReducedMotion ? 0.4 : 1.1,
        delay: 0.08 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformOrigin: 'left' }}
      className="relative mx-auto h-[3px] w-full max-w-3xl overflow-hidden rounded-full bg-slate-900/80"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `linear-gradient(90deg, ${color}, ${color})`,
          boxShadow: `0 10px 40px ${color.replace('1)', '0.45)')}`,
        }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-sm"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 22px ${color.replace('1)', '0.8)')}`,
        }}
      />
    </motion.div>
  );
}