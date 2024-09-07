import { useTranslation } from 'react-i18next';

interface ProjectsProps {
  darkMode: boolean;
}

export default function Projects({ darkMode }: ProjectsProps) {
  const { t } = useTranslation('common');

  return (
    <section id="projects" className={`mb-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('projects')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 hover:shadow-md transition-shadow`}>
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{t('elearningPlatform')}</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('elearningDescription')}</p>
        </div>
        <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4 hover:shadow-md transition-shadow`}>
          <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{t('taskManagementApp')}</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('taskManagementDescription')}</p>
        </div>
      </div>
    </section>
  );
}