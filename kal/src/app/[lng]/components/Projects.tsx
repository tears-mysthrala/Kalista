import React from 'react';
import { TFunction } from 'i18next';

interface ProjectsProps {
  darkMode: boolean;
  t: TFunction;
}

const Projects: React.FC<ProjectsProps> = ({ darkMode, t }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{t('projects')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('elearningPlatform')}</h3>
          <p className="text-gray-700 dark:text-gray-300">{t('elearningDescription')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('taskManagementApp')}</h3>
          <p className="text-gray-700 dark:text-gray-300">{t('taskManagementDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;