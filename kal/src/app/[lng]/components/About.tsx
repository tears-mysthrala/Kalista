import { Label } from "@radix-ui/react-label"
import { Progress } from "@radix-ui/react-progress"
import { useTranslation } from 'react-i18next';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const { t } = useTranslation('common');

  return (
    <section id="about" className={`mb-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('about')}</h2>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
        {t('aboutDescription')}
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="skill1" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('frontendDevelopment')}</Label>
          <Progress id="skill1" value={90} max={100} className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-[#5BCEFA]" style={{ width: '90%' }}></div>
          </Progress>
        </div>
        <div>
          <Label htmlFor="skill2" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('backendDevelopment')}</Label>
          <Progress id="skill2" value={85} max={100} className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-[#F5A9B8]" style={{ width: '85%' }}></div>
          </Progress>
        </div>
      </div>
    </section>
  );
}