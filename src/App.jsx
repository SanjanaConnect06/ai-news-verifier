import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import TruthifyFooter from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const addToHistory = (item) => {
    setHistory((prev) => [item, ...prev.slice(0, 9)]);
  };

  const handleResult = (data) => {
    setResult(data);
    if (data && data.credibilityScore !== undefined) {
      addToHistory({
        text: data.text,
        credibility_score: data.credibilityScore,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const behavior = prefersReduced ? 'auto' : 'smooth';
    el.scrollIntoView({ behavior, block: 'start' });
  };

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{ background: 'linear-gradient(to bottom, #0b0b0b, #111318)' }}
    >
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="group inline-flex items-center gap-3 focus-visible:outline-none"
            aria-label="Truthify home"
          >
            <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-[#8C6BFF] to-[#2EA7FF] shadow-[0_0_18px_rgba(140,107,255,0.7)]" />
            <span className="font-black tracking-[0.38em] text-[0.7rem] uppercase text-slate-100/80 sm:text-xs">
              Truthify
            </span>
          </button>
          <div className="flex items-center gap-6 text-[0.85rem] font-medium text-slate-200">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="relative inline-flex items-center gap-1.5 text-sm tracking-wide text-slate-200 transition-transform duration-200 hover:-translate-y-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA7FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Home</span>
              <span className="hidden text-xs text-[#2EA7FF] sm:inline">●</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="relative inline-flex items-center gap-1.5 text-sm tracking-wide text-slate-200 transition-transform duration-200 hover:-translate-y-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>About</span>
            </button>
          </div>
        </nav>
      </header>

      <main id="top" className="pt-24">
        <Hero
          id="hero"
          onVerifyClick={() => scrollToSection('verify')}
          prefersReducedMotion={prefersReducedMotion}
        />
        <Stats prefersReducedMotion={prefersReducedMotion} />
        <section id="about" className="border-t border-white/5 bg-black/40/">
          <Features prefersReducedMotion={prefersReducedMotion} onVerifyLinkClick={() => scrollToSection('verify')} />
        </section>

        {/* Verification experience from existing app */}
        <section
          id="verify"
          className="border-t border-white/5 bg-gradient-to-b from-black/40 via-slate-950/80 to-black/90 px-4 py-16 sm:px-6 lg:px-8"
          aria-label="Verify a news claim with Truthify"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-6xl flex-col gap-10"
          >
            <HomePage
              history={history}
              addToHistory={addToHistory}
              externalResult={result}
              setExternalResult={setResult}
              loading={loading}
              setLoading={setLoading}
              onResult={handleResult}
            />
          </motion.div>
        </section>
      </main>

      <TruthifyFooter />
    </div>
  );
}

export default App;
