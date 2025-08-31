import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-3 rounded-2xl transition-all duration-700 transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-4 ${
        darkMode
          ? 'bg-gray-800/80 text-yellow-400 hover:bg-gray-700/80 focus:ring-yellow-500/30 border border-gray-600/50'
          : 'bg-gray-800/10 text-gray-700 hover:bg-gray-800/20 focus:ring-gray-500/30'
      }`}
      aria-label="Toggle theme"
    >
      <div className="transition-transform duration-500">
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </div>
    </button>
  );
};

export default ThemeToggle;