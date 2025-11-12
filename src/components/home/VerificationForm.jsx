import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader } from 'lucide-react';
import { verifyNews } from '../../utils/api';

function VerificationForm({ onResult, loading, setLoading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    setLoading(true);
    
    try {
      const result = await verifyNews(query);
      onResult(result);
    } catch (err) {
      setError('Failed to verify news. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl opacity-50 group-hover:opacity-60 group-focus-within:opacity-70 blur-md transition duration-500 animate-pulse"></div>
          <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-700 group-focus-within:border-blue-500 transition-all duration-300">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="✨ Enter a news claim or headline to verify..."
              className="w-full px-8 py-7 text-lg rounded-3xl focus:outline-none transition-all bg-transparent font-semibold text-white placeholder:text-gray-500 placeholder:font-normal"
              disabled={loading}
            />
            <motion.div
              animate={{ scale: loading ? [1, 1.1, 1] : 1, rotate: loading ? 360 : 0 }}
              transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
              className="absolute right-7 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-indigo-500 w-7 h-7" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          type="submit"
          disabled={loading || !query.trim()}
          className="relative w-full group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl transition-all duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          <div className="relative px-8 py-6 text-white font-bold text-xl shadow-2xl flex items-center justify-center space-x-3">
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-7 h-7" />
                </motion.div>
                <span className="animate-pulse">Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Search className="w-7 h-7" />
                <span>🔍 Verify News Now</span>
              </>
            )}
          </div>
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </form>
    </div>
  );
}

export default VerificationForm;

