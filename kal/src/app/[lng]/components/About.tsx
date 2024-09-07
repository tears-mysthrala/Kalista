import React from 'react';
import { TFunction } from 'i18next';

interface AboutProps {
  darkMode: boolean;
  t: TFunction;
}

const About: React.FC<AboutProps> = ({ darkMode, t }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('about')}</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{t('aboutDescription')}</p>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('frontendDevelopment')}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "85%"}}></div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{t('backendDevelopment')}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-green-600 h-2.5 rounded-full" style={{width: "80%"}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;