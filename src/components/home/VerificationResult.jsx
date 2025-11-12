import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, Calendar, TrendingUp, Languages, Volume2, Square } from 'lucide-react';
import { translateText as apiTranslateText } from '../../utils/api';

function VerificationResult({ result }) {
  if (!result) return null;

  const { credibilityScore, verdict, sources, analysis, text, timestamp, aiPowered } = result;

  // Translation & Voice state
  const [targetLang, setTargetLang] = useState('EN-GB');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translated, setTranslated] = useState(null);
  const [ttsSpeaking, setTtsSpeaking] = useState(false);
  const voicesRef = useRef([]);

  const languages = [
    { code: 'EN-GB', name: 'English (UK)', voice: 'en-GB' },
    { code: 'EN-US', name: 'English (US)', voice: 'en-US' },
    { code: 'HI', name: 'हिन्दी (Hindi)', voice: 'hi-IN' },
    { code: 'TA', name: 'தமிழ் (Tamil)', voice: 'ta-IN' },
    { code: 'TE', name: 'తెలుగు (Telugu)', voice: 'te-IN' },
    { code: 'BN', name: 'বাংলা (Bengali)', voice: 'bn-IN' },
    { code: 'MR', name: 'मराठी (Marathi)', voice: 'mr-IN' },
    { code: 'GU', name: 'ગુજરાતી (Gujarati)', voice: 'gu-IN' },
    { code: 'KN', name: 'ಕನ್ನಡ (Kannada)', voice: 'kn-IN' },
    { code: 'ML', name: 'മലയാളം (Malayalam)', voice: 'ml-IN' },
    { code: 'PA', name: 'ਪੰਜਾਬੀ (Punjabi)', voice: 'pa-IN' },
    { code: 'UR', name: 'اردو (Urdu)', voice: 'ur-PK' },
    { code: 'OR', name: 'ଓଡ଼ିଆ (Odia)', voice: 'or-IN' },
    { code: 'AS', name: 'অসমীয়া (Assamese)', voice: 'as-IN' },
    { code: 'FR', name: 'French (Français)', voice: 'fr-FR' },
    { code: 'ES', name: 'Spanish (Español)', voice: 'es-ES' },
    { code: 'DE', name: 'German (Deutsch)', voice: 'de-DE' },
    { code: 'IT', name: 'Italian (Italiano)', voice: 'it-IT' },
    { code: 'PT-PT', name: 'Portuguese (Português)', voice: 'pt-PT' },
    { code: 'PT-BR', name: 'Portuguese Brazil (Português BR)', voice: 'pt-BR' },
    { code: 'RU', name: 'Russian (Русский)', voice: 'ru-RU' },
    { code: 'TR', name: 'Turkish (Türkçe)', voice: 'tr-TR' },
    { code: 'JA', name: 'Japanese (日本語)', voice: 'ja-JP' },
    { code: 'KO', name: 'Korean (한국어)', voice: 'ko-KR' },
    { code: 'ZH', name: 'Chinese (中文)', voice: 'zh-CN' },
    { code: 'AR', name: 'Arabic (العربية)', voice: 'ar-SA' },
    { code: 'NL', name: 'Dutch (Nederlands)', voice: 'nl-NL' },
    { code: 'PL', name: 'Polish (Polski)', voice: 'pl-PL' },
    { code: 'SV', name: 'Swedish (Svenska)', voice: 'sv-SE' },
  ];

  const deepLToBCP47 = (code) => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.voice : 'en-US';
  };

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    };
    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleTranslate = async () => {
    try {
      setIsTranslating(true);
      setTranslated(null);
      
      let contentToTranslate = `Verdict: ${verdict}\n\nScore: ${credibilityScore}/100\n\n`;
      
      if (analysis && analysis.length > 0) {
        contentToTranslate += `Evidence:\n${analysis.join('\n')}\n\n`;
      }
      
      if (sources && sources.length > 0) {
        contentToTranslate += `Sources:\n`;
        sources.slice(0, 3).forEach((source, idx) => {
          contentToTranslate += `${idx + 1}. ${source.title}\n`;
        });
      }
      
      const resp = await apiTranslateText(contentToTranslate, targetLang);
      setTranslated({ text: resp.translatedText, provider: resp.provider || 'unknown' });
    } catch (e) {
      setTranslated({ text: 'Translation failed. Please try again.', provider: 'error' });
    } finally {
      setIsTranslating(false);
    }
  };

  const speak = (content) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(content);
    const lang = deepLToBCP47(targetLang);
    utter.lang = lang;
    const voice = voicesRef.current.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
    if (voice) utter.voice = voice;
    utter.onend = () => setTtsSpeaking(false);
    utter.onerror = () => setTtsSpeaking(false);
    setTtsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setTtsSpeaking(false);
  };

  const getScoreColor = (v) => {
    if (v === 'TRUE') return 'text-green-700';
    if (v === 'FALSE') return 'text-red-700';
    if (v === 'UNCERTAIN') return 'text-yellow-700';
    return 'text-gray-600';
  };
  
  const getScoreBg = (v) => {
    if (v === 'TRUE') return 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300';
    if (v === 'FALSE') return 'bg-gradient-to-br from-red-50 to-rose-100 border-red-300';
    if (v === 'UNCERTAIN') return 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-300';
    return 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-300';
  };
  
  const getVerdictIcon = (v) => {
    if (v === 'TRUE') return <CheckCircle className="w-16 h-16" />;
    if (v === 'FALSE') return <XCircle className="w-16 h-16" />;
    if (v === 'UNCERTAIN') return <AlertTriangle className="w-16 h-16" />;
    return <AlertTriangle className="w-16 h-16" />;
  };
  
  const getVerdictLabel = (v) => {
    if (v === 'TRUE') return '✅ TRUE';
    if (v === 'FALSE') return '❌ FALSE';
    if (v === 'UNCERTAIN') return '⚠️ UNCERTAIN';
    return v;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Score Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`rounded-3xl border-3 p-12 md:p-16 shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden ${getScoreBg(verdict)}`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="text-center space-y-8 relative z-10">
          <motion.div 
            className={`inline-flex ${getScoreColor(verdict)}`} 
            initial={{ scale: 0, rotate: -180 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ type: "spring", delay: 0.2, bounce: 0.4 }}
          >
            {getVerdictIcon(verdict)}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight">{getVerdictLabel(verdict)}</h2>
            <p className="text-2xl text-gray-700 font-bold">Credibility Score</p>
          </motion.div>
          <motion.div 
            className={`text-9xl font-black ${getScoreColor(verdict)}`} 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.4, type: "spring", bounce: 0.3 }}
          >
            {credibilityScore}<span className="text-6xl">/100</span>
          </motion.div>
        </div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 pt-10 border-t-2 border-gray-300/50 relative z-10"
        >
          <div className="flex items-start justify-between gap-5 flex-wrap">
            <p className="text-gray-900 text-xl leading-relaxed flex-1">
              <span className="font-black text-2xl bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Claim: </span>
              <span className="italic font-semibold">"{text}"</span>
            </p>
            {aiPowered && (
              <motion.div 
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-yellow-300 font-bold text-lg"
                >⚡</motion.span>
                <span className="text-white font-bold text-base">AI-Powered Analysis</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Translate */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
              <Languages className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Translate Results</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-white font-medium">
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <button onClick={handleTranslate} disabled={isTranslating} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 font-semibold shadow-md">
              {isTranslating ? 'Translating…' : 'Translate'}
            </button>
            <button onClick={() => speak(translated?.text || `${verdict}. Score: ${credibilityScore}`)} className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-semibold">
              <Volume2 className="w-5 h-5" />
              {ttsSpeaking ? 'Speaking…' : 'Speak'}
            </button>
            {ttsSpeaking && (
              <button onClick={stopSpeaking} className="px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold">
                <Square className="w-5 h-5" />Stop
              </button>
            )}
          </div>
        </div>
        {translated && (
          <div className="mt-6">
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Via {translated.provider}</div>
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">{translated.text}</div>
          </div>
        )}
      </motion.div>

      {/* Evidence */}
      {analysis && analysis.length > 0 && (
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 md:p-10 border-2 border-blue-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl"></div>
          
          <motion.h3 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black text-gray-900 mb-8 flex items-center relative z-10"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mr-4 shadow-lg"
            >
              <TrendingUp className="w-7 h-7 text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Evidence & Analysis</span>
          </motion.h3>
          <ul className="space-y-5 relative z-10">
            {analysis.map((item, i) => (
              <motion.li 
                key={i} 
                initial={{ x: -30, opacity: 0, scale: 0.9 }} 
                animate={{ x: 0, opacity: 1, scale: 1 }} 
                transition={{ delay: 0.5 + i * 0.15, type: "spring", bounce: 0.3 }} 
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-7 rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-all group"
              >
                <motion.span 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
                  className="text-blue-600 group-hover:text-indigo-600 mr-5 text-3xl font-black transition-colors"
                >✓</motion.span>
                <span className="text-gray-900 font-semibold leading-relaxed text-lg">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Sources */}
      {sources && sources.length > 0 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></span>
            Related Sources
          </h3>
          <div className="space-y-4">
            {sources.map((source, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{source.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{source.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium text-blue-600">{source.source}</span>
                      {source.publishedAt && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(source.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {source.urlToImage && <img src={source.urlToImage} alt={source.title} className="w-24 h-24 object-cover rounded-lg ml-4" />}
                </div>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Read more <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {timestamp && <p className="text-center text-gray-500 text-sm">Verified on {new Date(timestamp).toLocaleString()}</p>}
    </motion.div>
  );
}

export default VerificationResult;
