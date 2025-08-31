import React, { useState, useEffect } from 'react';
import { Mail, Sun, Moon, Copy, Check, AlertCircle, User, Shield } from 'lucide-react';
import { checkEmail } from './api/emailChecker';
import { EmailResult } from './types/email';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<EmailResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkEmail(email);
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Failed to check email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setEmail('');
    setResult(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl transition-all duration-500 ${
              darkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
            } shadow-lg`}>
              <Mail className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Valid Email Checker
              </h1>
              <p className={`text-sm transition-colors duration-500 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Gmail verify, disable, exist, and availability checker
              </p>
            </div>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className={`text-center mb-8 p-6 rounded-3xl transition-all duration-500 ${
            darkMode ? 'bg-gray-900/50 border border-gray-700/30' : 'bg-white/60'
          } backdrop-blur-sm`}>
            <h2 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Check Gmail Verify, Disable, Exist, and Availability Easily
            </h2>
            <p className={`text-lg leading-relaxed transition-colors duration-500 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Discover the power of Valid Email Checker and streamline your email verification process. 
              Our advanced tool enables quick and efficient verification, ensuring accurate data. 
              Don't waste time on invalid emails.
            </p>
            <div className={`mt-4 text-sm font-medium transition-colors duration-500 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Experience the convenience and accuracy of our solution
            </div>
          </div>

          {/* Input Form */}
          <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-700 ${
            darkMode 
              ? 'bg-gray-900/80 border-gray-700/50 shadow-black/40' 
              : 'bg-white/90 border-white/50 shadow-black/10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium mb-3 transition-colors duration-500 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  Email Address to Verify
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Gmail or any email to verify..."
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 ${
                      darkMode
                        ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/30'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30'
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                    loading || !email
                      ? darkMode
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500/30'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner />
                      <span>Checking...</span>
                    </div>
                  ) : (
                    'Verify Email Now'
                  )}
                </button>

                {(result || error) && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 ${
                      darkMode
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 focus:ring-gray-500/30'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400/30'
                    }`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className={`mt-6 p-6 rounded-2xl border-2 border-red-500/50 transition-all duration-500 ${
              darkMode ? 'bg-red-950/50 backdrop-blur-sm' : 'bg-red-50'
            } animate-slideIn`}>
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <p className={`font-medium transition-colors duration-500 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="mt-8 space-y-6 animate-slideIn">
              <ResultCard result={result} darkMode={darkMode} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`mt-16 text-center transition-colors duration-500 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p className={`text-sm transition-colors duration-500 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Advanced email verification • Don't waste time on invalid emails
          </p>
          <p className={`text-xs mt-2 transition-colors duration-500 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Start verifying with Valid Email Checker today and experience the convenience and accuracy
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;