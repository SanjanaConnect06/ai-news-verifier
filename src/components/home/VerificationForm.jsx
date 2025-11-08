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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-sm transition duration-300"></div>
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a news claim or headline to verify..."
              className="w-full px-7 py-6 text-lg rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all bg-transparent font-medium text-gray-800 placeholder:text-gray-400"
              disabled={loading}
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
        >
          {loading ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              <span>Verify News Now</span>
            </>
          )}
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

