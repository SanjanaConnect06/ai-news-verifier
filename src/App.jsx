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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        {/* Navigation */}
        <nav className="bg-gray-900/95 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI News Verifier</span>
              </Link>
              <div className="flex space-x-2">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200 font-medium text-gray-300 hover:text-blue-400"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-200 font-medium text-gray-300 hover:text-purple-400"
                >
                  <Info className="w-5 h-5" />
                  <span>About</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - Centered */}
        <main className="flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage history={history} addToHistory={addToHistory} />} 
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-black/50 backdrop-blur-xl text-white border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI News Verifier</span>
              </div>
              <p className="text-gray-500 text-xs">
                © 2025 AI News Verifier. Helping you fight misinformation with AI-powered verification.
              </p>
              <div className="flex justify-center space-x-4 text-xs text-gray-600">
                <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
                <span>•</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors">Contact</span>
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
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          About AI News Verifier
        </h1>
        <p className="text-xl text-gray-400">
          Empowering you to fight misinformation with cutting-edge AI technology
        </p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-700">
        <div>
          <p className="text-xl text-gray-300 leading-relaxed">
            AI News Verifier is a powerful tool designed to help you verify the credibility 
            of news articles and claims in the age of misinformation. Our advanced AI algorithms 
            analyze multiple trusted sources to provide you with accurate, reliable information.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <h2 className="text-3xl font-bold mb-4 text-white flex items-center">
            <span className="text-3xl mr-3">⚙️</span>
            How It Works
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-400 font-bold text-xl mr-3">1.</span>
              <span className="text-lg">Enter a news claim or topic you want to verify</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 font-bold text-xl mr-3">2.</span>
              <span className="text-lg">Our AI analyzes multiple trusted sources in real-time</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 font-bold text-xl mr-3">3.</span>
              <span className="text-lg">Get a credibility score and detailed analysis instantly</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 font-bold text-xl mr-3">4.</span>
              <span className="text-lg">Review sources and make informed decisions</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
            <span className="text-3xl mr-3">✨</span>
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/30">
              <h3 className="font-bold text-lg text-blue-400 mb-2">✓ Multi-Source Verification</h3>
              <p className="text-gray-300">Cross-reference information from trusted news outlets</p>
            </div>
            <div className="bg-purple-500/10 p-5 rounded-xl border border-purple-500/30">
              <h3 className="font-bold text-lg text-purple-400 mb-2">✓ AI-Powered Scoring</h3>
              <p className="text-gray-300">Advanced algorithms for credibility assessment</p>
            </div>
            <div className="bg-pink-500/10 p-5 rounded-xl border border-pink-500/30">
              <h3 className="font-bold text-lg text-pink-400 mb-2">✓ Real-Time Analysis</h3>
              <p className="text-gray-300">Get instant results with intelligent caching</p>
            </div>
            <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/30">
              <h3 className="font-bold text-lg text-indigo-400 mb-2">✓ Dark Mode Design</h3>
              <p className="text-gray-300">Beautiful interface with smooth animations</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;