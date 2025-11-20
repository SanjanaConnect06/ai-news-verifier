import { motion } from 'framer-motion';
import VerificationForm from '../components/home/VerificationForm';
import VerificationResult from '../components/home/VerificationResult';
import RecentHistory from '../components/home/RecentHistory';

function HomePage({
  history,
  addToHistory,
  externalResult,
  setExternalResult,
  loading,
  setLoading,
  onResult,
}) {
  const handleResultInternal = (data) => {
    if (onResult) {
      onResult(data);
    } else if (setExternalResult) {
      setExternalResult(data);
      if (data && data.credibilityScore !== undefined && addToHistory) {
        addToHistory({
          text: data.text,
          credibility_score: data.credibilityScore,
          timestamp: new Date().toISOString(),
        });
      }
    }
  };

  const result = externalResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-6xl space-y-10"
    >
      <div className="text-center">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
          Verify a news claim
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Paste a headline or claim below and let Truthify analyze it across multiple trusted sources.
        </p>
      </div>

      {/* Verification Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12 }}
      >
        <VerificationForm
          onResult={handleResultInternal}
          loading={loading}
          setLoading={setLoading}
        />
      </motion.div>

      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mb-6"
          >
            <div className="h-28 w-28 rounded-full bg-gradient-to-r from-[#2EA7FF] via-[#8C6BFF] to-[#6B7CFF] blur-xl opacity-70" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-24 w-24 rounded-full border-4 border-t-[#2EA7FF] border-r-[#8C6BFF] border-b-[#6B7CFF] border-l-transparent" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-4xl"
              >
                🔍
              </motion.span>
            </div>
          </motion.div>

          <motion.h3
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-3 bg-gradient-to-r from-[#2EA7FF] to-[#8C6BFF] bg-clip-text text-2xl font-black text-transparent"
          >
            Analyzing with AI
          </motion.h3>

          <motion.div className="mb-4 flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                animate={{ y: [0, -16, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#2EA7FF] to-[#6B7CFF] shadow-[0_0_18px_rgba(46,167,255,0.8)]"
              />
            ))}
          </motion.div>

          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="text-sm font-medium text-slate-300"
          >
            Checking facts across multiple sources…
          </motion.p>
        </motion.div>
      )}

      {/* Results */}
      {result && !loading && (
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.16 }}
        >
          <VerificationResult result={result} />
        </motion.div>
      )}

      {/* History */}
      {history?.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.22 }}
        >
          <RecentHistory history={history} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default HomePage;
