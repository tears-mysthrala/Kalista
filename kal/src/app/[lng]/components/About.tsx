import React from 'react';
import { TFunction } from 'i18next';

interface AboutProps {
  darkMode: boolean;
  t: TFunction;
}

const About: React.FC<AboutProps> = ({ darkMode, t }) => {
  return (
    <div className="space-y-6 text-left">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about')}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('aboutDescription')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('frontendDevelopment')}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{t('frontendDescription')}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "85%"}}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('backendDevelopment')}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{t('backendDescription')}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-green-600 h-2.5 rounded-full" style={{width: "80%"}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;