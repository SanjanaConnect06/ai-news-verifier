import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Home, History, Info } from 'lucide-react';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);

  const addToHistory = (item) => {
    setHistory(prev => [item, ...prev.slice(0, 9)]); // Keep last 10 items
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI News Verifier</span>
              </Link>
              <div className="flex space-x-2">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium text-gray-700 hover:text-blue-600"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-100 transition-all duration-200 font-medium text-gray-700 hover:text-purple-600"
                >
                  <Info className="w-5 h-5" />
                  <span>About</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage history={history} addToHistory={addToHistory} />} 
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">AI News Verifier</span>
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 AI News Verifier. Helping you fight misinformation with AI-powered verification.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          About AI News Verifier
        </h1>
        <p className="text-xl text-gray-600">
          Empowering you to fight misinformation with cutting-edge AI technology
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-100">
        <div>
          <p className="text-xl text-gray-700 leading-relaxed">
            AI News Verifier is a powerful tool designed to help you verify the credibility 
            of news articles and claims in the age of misinformation. Our advanced AI algorithms 
            analyze multiple trusted sources to provide you with accurate, reliable information.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">⚙️</span>
            How It Works
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold text-xl mr-3">1.</span>
              <span className="text-lg">Enter a news claim or topic you want to verify</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold text-xl mr-3">2.</span>
              <span className="text-lg">Our AI analyzes multiple trusted sources in real-time</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 font-bold text-xl mr-3">3.</span>
              <span className="text-lg">Get a credibility score and detailed analysis instantly</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold text-xl mr-3">4.</span>
              <span className="text-lg">Review sources and make informed decisions</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
            <span className="text-3xl mr-3">✨</span>
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h3 className="font-bold text-lg text-blue-900 mb-2">✓ Multi-Source Verification</h3>
              <p className="text-gray-700">Cross-reference information from trusted news outlets</p>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <h3 className="font-bold text-lg text-purple-900 mb-2">✓ AI-Powered Scoring</h3>
              <p className="text-gray-700">Advanced algorithms for credibility assessment</p>
            </div>
            <div className="bg-pink-50 p-5 rounded-xl border border-pink-200">
              <h3 className="font-bold text-lg text-pink-900 mb-2">✓ Real-Time Analysis</h3>
              <p className="text-gray-700">Get instant results with intelligent caching</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <h3 className="font-bold text-lg text-indigo-900 mb-2">✓ Beautiful Interface</h3>
              <p className="text-gray-700">Modern design with smooth animations</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;