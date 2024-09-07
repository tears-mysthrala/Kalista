'use client';

import React from 'react';
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
  isMobile: boolean;
  styles: any;
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  toggleDarkMode,
  changeLanguage,
  lng,
  isMenuOpen,
  toggleMenu,
  isMobile,
  styles
}) => {
  const { t } = useTranslation('common');

  return (
    <nav className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md`}>
      <div className="border-t-4 border-blue-400"></div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mr-2" />
            {t('title')}
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={lng}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            {isMobile && (
              <button onClick={toggleMenu} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
                {isMenuOpen ? '✕' : '☰'}
              </button>
            )}
          </div>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <ul className="md:flex md:space-x-4 space-y-2 md:space-y-0">
            <li><a href="#about" className="block hover:text-indigo-500">{t('about')}</a></li>
            <li><a href="#projects" className="block hover:text-indigo-500">{t('projects')}</a></li>
            <li><a href="#contact" className="block hover:text-indigo-500">{t('contact')}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-b-4 border-pink-400"></div>
    </nav>
  );
};

export default Navigation;