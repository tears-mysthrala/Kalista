'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import '../../i18n/client'
import dynamic from 'next/dynamic'
import styles from '../page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';

interface ComponentProps {
  darkMode: boolean;
  t: TFunction;
}

const AboutComponent = dynamic<ComponentProps>(() => import('./components/About').then(mod => ({ default: mod.default as React.ComponentType<ComponentProps> })));
const ProjectsComponent = dynamic<ComponentProps>(() => import('./components/Projects').then(mod => ({ default: mod.default as React.ComponentType<ComponentProps> })));
const ContactFormComponent = dynamic<ComponentProps>(() => import('../../components/ContactForm').then(mod => ({ default: mod.default as React.ComponentType<ComponentProps> })), { ssr: false });
const VisitTracker = dynamic(() => import('../../components/VisitTracker'), { ssr: false });

export default function ClientPage({ lng }: { lng: string }) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [darkMode, setDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lng);
    setIsLoaded(true);
  }, [lng, i18n]);

  const changeLanguage = (newLang: string) => {
    router.push(`/${newLang}`);
  };

  useEffect(() => {
    const detectColorScheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setDarkMode(false);
      } else {
        setDarkMode(true);
      }
    };

    detectColorScheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(!e.matches);
    };
    mediaQuery.addListener(handleChange);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      mediaQuery.removeListener(handleChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={`${styles.container} ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen`}>
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "url('/logo.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.45,
          filter: darkMode 
            ? 'drop-shadow(0 0 1.5rem rgba(255, 255, 255, 0.4))' 
            : 'drop-shadow(0 0 1.5rem rgba(0, 0, 0, 0.4))',
          transform: 'scale(4)',
          transformOrigin: 'center'
        }} 
      />
      
      <VisitTracker />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          changeLanguage={changeLanguage} 
          lng={lng} 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          isMobile={isMobile} 
          styles={styles}
        />

        <main className="flex-grow container mx-auto px-4 py-8">
          <section id="about" className="mb-16 text-left">
            <AboutComponent darkMode={darkMode} t={t} />
          </section>
          <section id="projects" className="mb-16 text-left">
            <ProjectsComponent darkMode={darkMode} t={t} />
          </section>
          <section id="contact" className="mb-16 text-left">
            <ContactFormComponent darkMode={darkMode} t={t} />
          </section>
        </main>

        <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400">
          <p>{t('copyright')}</p>
        </footer>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors"
            aria-label="Volver arriba"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}