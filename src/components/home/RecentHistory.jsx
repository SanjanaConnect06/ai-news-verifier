import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function RecentHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
        <div className="p-2 bg-purple-100 rounded-lg mr-3">
          <Clock className="w-7 h-7 text-purple-600" />
        </div>
        <span>Recent Verifications</span>
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-2 border-gray-200 p-5 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex justify-between items-center group"
          >
            <div className="flex-1">
              <p className="text-gray-800 font-semibold text-lg truncate pr-4 group-hover:text-purple-700 transition">{item.text}</p>
              {item.timestamp && (
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              )}
            </div>
            <span
              className={`px-4 py-2 rounded-full text-base font-bold whitespace-nowrap shadow-md ${
                item.credibility_score >= 70
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                  : item.credibility_score >= 40
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                  : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
              }`}
            >
              {item.credibility_score}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
