import React from 'react';

export default function LanguageToggle({ language, onLanguageChange }) {
  const languages = ['English', 'Nyanja', 'Bemba'];

  return (
    <div className="flex justify-center space-x-2 p-4 bg-white shadow-sm z-10">
      {languages.map(lang => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            language === lang
              ? 'bg-chumaGreen text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}