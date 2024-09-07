'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  changeLanguage: (lang: string) => void;
  lng: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;  // Añadido esta línea
  styles: any;
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  toggleDarkMode,
  changeLanguage,
  lng,
  isMenuOpen,
  toggleMenu,
  styles
}) => {
  const { t } = useTranslation('common');
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/languages')
      .then(response => response.json())
      .then(data => setLanguages(data))
      .catch(error => console.error('Error fetching languages:', error));
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${darkMode ? styles.navDark : styles.navLight} fixed top-4 left-0 right-0 z-50 mx-auto`} style={{ width: '90%', maxWidth: '1200px' }}>
        <div className="container mx-auto px-4 py-2 rounded-full shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-pink-400"></div>
          
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </Link>

            <span className={`${styles.logo} text-center flex-grow`}>{t('title')}</span>

            {/* Menú para pantallas grandes */}
            <div className="hidden md:flex items-center space-x-4">
              <ul className={`${styles.navLinks} flex space-x-4`}>
                <li><a href="#about" className="hover:text-indigo-500">{t('about')}</a></li>
                <li><a href="#projects" className="hover:text-indigo-500">{t('projects')}</a></li>
                <li><a href="#contact" className="hover:text-indigo-500">{t('contact')}</a></li>
              </ul>
              <button onClick={toggleDarkMode} className={styles.modeToggle}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={lng}
                className={`${styles.langSelect} ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de menú para pantallas pequeñas */}
            <button onClick={toggleMenu} className={`${styles.menuToggle} md:hidden`}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
        </div>
      </nav>
      
      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="fixed top-20 left-20 right-7 z-40 bg-white dark:bg-gray-800 shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              <li><a href="#about" className="block hover:text-indigo-500">{t('about')}</a></li>
              <li><a href="#projects" className="block hover:text-indigo-500">{t('projects')}</a></li>
              <li><a href="#contact" className="block hover:text-indigo-500">{t('contact')}</a></li>
            </ul>
            <div className="mt-4 space-y-2">
              <button onClick={toggleDarkMode} className={`${styles.modeToggle} w-full text-left`}>
                {darkMode ? `☀️ ${t('lightMode')}` : `🌙 ${t('darkMode')}`}
              </button>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={lng}
                className={`${styles.langSelect} w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {t(`language.${lang}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;