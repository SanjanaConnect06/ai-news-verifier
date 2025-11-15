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
      className="w-full max-w-6xl mx-auto space-y-8"
    >
      {/* Hero Section */}
      <div className="text-center py-8 md:py-12 px-4 relative">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(99, 102, 241, 0.6)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-base font-bold mb-6"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-shadow-lg">⚡ AI-Powered Real-Time Verification</span>
          </motion.div>
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            Verify News,
          </span>
          <br />
          <motion.span 
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            Fight Misinformation 🔥
          </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-semibold text-center px-4"
        >
          🚀 Instantly verify any news claim with AI-powered analysis across multiple trusted sources. Get credibility scores and fact-checking in seconds.
        </motion.p>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium"
        >
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-emerald-500/50 transition-all">
            <span className="text-emerald-400 text-lg font-bold">✓</span>
            <span className="text-gray-300">Multi-source verification</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-emerald-500/50 transition-all">
            <span className="text-emerald-400 text-lg font-bold">✓</span>
            <span className="text-gray-300">Real-time analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-emerald-500/50 transition-all">
            <span className="text-emerald-400 text-lg font-bold">✓</span>
            <span className="text-gray-300">Indian languages support</span>
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

      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center py-20 px-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 blur-xl opacity-60"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-28 h-28 rounded-full border-8 border-t-blue-600 border-r-indigo-600 border-b-purple-600 border-l-transparent"></div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-5xl"
              >
                🔍
              </motion.span>
            </div>
          </motion.div>
          
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
          >
            Analyzing with AI
          </motion.h2>
          
          <motion.div className="flex space-x-3 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-lg shadow-blue-500/50"
              />
            ))}
          </motion.div>
          
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="text-gray-400 text-lg font-medium"
          >
            Checking facts across multiple sources...
          </motion.p>
        </motion.div>
      )}

      {/* Results */}
      {result && !loading && (
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
