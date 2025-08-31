import React, { useState } from 'react';
import { User, Shield, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { EmailResult } from '../types/email';

interface ResultCardProps {
  result: EmailResult;
  darkMode: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, darkMode }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ok':
        return darkMode ? 'text-emerald-400' : 'text-emerald-600';
      case 'invalid':
        return darkMode ? 'text-red-400' : 'text-red-600';
      default:
        return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ok':
        return <CheckCircle className="w-5 h-5" />;
      case 'invalid':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  if (!result.sonjj) {
    return null;
  }

  return (
    <div className={`p-8 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-700 animate-slideIn ${
      darkMode 
        ? 'bg-gray-900/90 border-gray-700/50' 
        : 'bg-white/90 border-white/50'
    }`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold transition-colors duration-500 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Email Verification Results
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Provider Card */}
        <div className={`p-6 rounded-2xl transition-all duration-500 hover:scale-105 ${
          darkMode ? 'bg-gray-800/80 border border-gray-600/50' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Mail className={`w-6 h-6 transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-lg font-semibold transition-colors duration-500 ${
              darkMode ? 'text-gray-200' : 'text-blue-800'
            }`}>
              Provider Type
            </h3>
          </div>
          <p className={`text-2xl font-bold transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {result.sonjj.type}
          </p>
          <p className={`text-sm mt-2 transition-colors duration-500 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Email service provider detected
          </p>
        </div>

        {/* Security & Availability Card */}
        <div className={`p-6 rounded-2xl transition-all duration-500 hover:scale-105 ${
          result.sonjj.disposable.toLowerCase() === 'no'
            ? darkMode 
              ? 'bg-gray-800/80 border border-emerald-600/50' 
              : 'bg-emerald-50 border border-emerald-200'
            : darkMode
              ? 'bg-gray-800/80 border border-red-600/50'
              : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className={`w-6 h-6 transition-colors duration-500 ${
              result.sonjj.disposable.toLowerCase() === 'no'
                ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                : darkMode ? 'text-red-400' : 'text-red-600'
            }`} />
            <h3 className={`text-lg font-semibold transition-colors duration-500 ${
              result.sonjj.disposable.toLowerCase() === 'no'
                ? darkMode ? 'text-gray-200' : 'text-emerald-800'
                : darkMode ? 'text-gray-200' : 'text-red-800'
            }`}>
              Availability Status
            </h3>
          </div>
          <p className={`text-xl font-bold transition-colors duration-500 ${
            result.sonjj.disposable.toLowerCase() === 'no'
              ? darkMode ? 'text-emerald-300' : 'text-emerald-700'
              : darkMode ? 'text-red-300' : 'text-red-700'
          }`}>
            {result.sonjj.disposable.toLowerCase() === 'no' ? 'Legitimate' : 'Disposable'}
          </p>
          <p className={`text-sm mt-2 transition-colors duration-500 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {result.sonjj.disposable.toLowerCase() === 'no' ? 'Real account available' : 'Temporary/disposable email'}
          </p>
        </div>
      </div>

      {/* Existence Status and Avatar Section */}
      <div className={`mt-6 p-6 rounded-2xl transition-all duration-500 ${
        darkMode ? 'bg-gray-800/60 border border-gray-700/30' : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 transition-colors duration-500 ${getStatusColor(result.sonjj.status)}`}>
              {getStatusIcon(result.sonjj.status)}
              <span className="font-semibold">Existence: {result.sonjj.status}</span>
            </div>
            <div className={`text-sm transition-colors duration-500 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {result.sonjj.status.toLowerCase() === 'ok' ? 'Email exists and is active' : 'Email may not exist or is disabled'}
            </div>
          </div>
          
          {result.sonjj.avatar && (
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium transition-colors duration-500 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Profile Picture:
              </span>
              <div className="relative group">
                <img
                  src={result.sonjj.avatar}
                  alt="Profile Avatar"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                  darkMode ? 'bg-emerald-500 border-gray-900' : 'bg-emerald-500 border-white'
                }`}></div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ResultCard;