import { useState } from 'react';
import { motion } from 'framer-motion';
import VerificationForm from '../components/home/VerificationForm';
import VerificationResult from '../components/home/VerificationResult';
import RecentHistory from '../components/home/RecentHistory';

function HomePage({ history, addToHistory }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResult = (data) => {
    setResult(data);
    if (data && data.credibilityScore !== undefined) {
      addToHistory({
        text: data.text,
        credibility_score: data.credibilityScore,
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>AI-Powered Real-Time Verification</span>
          </div>
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          Verify News,
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl">Fight Misinformation</span>
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Instantly verify any news claim with AI-powered analysis across multiple trusted sources. Get credibility scores and fact-checking in seconds.
        </motion.p>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3 text-sm font-medium"
        >
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <span className="text-emerald-500 text-lg font-bold">✓</span>
            <span className="text-gray-700">Multi-source verification</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <span className="text-emerald-500 text-lg font-bold">✓</span>
            <span className="text-gray-700">Real-time analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <span className="text-emerald-500 text-lg font-bold">✓</span>
            <span className="text-gray-700">Indian languages support</span>
          </div>
        </motion.div>
      </div>

      {/* Verification Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <VerificationForm 
          onResult={handleResult} 
          loading={loading} 
          setLoading={setLoading} 
        />
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <VerificationResult result={result} />
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RecentHistory history={history} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default HomePage;
