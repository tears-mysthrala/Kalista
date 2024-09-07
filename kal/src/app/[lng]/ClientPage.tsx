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

const AboutComponent = dynamic<ComponentProps>(() => import('./components/About'));
const ProjectsComponent = dynamic<ComponentProps>(() => import('./components/Projects'));
const ContactFormComponent = dynamic<ComponentProps>(() => import('../../components/ContactForm'), { ssr: false });
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
    <>
      <div className={`${styles.container} ${darkMode ? styles.containerDark : styles.containerLight} min-h-screen w-full`}>
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
        
        <div className="relative z-10 flex flex-col min-h-screen items-center">
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

          <main className="flex-grow w-full max-w-[80%] mx-auto px-4 py-8" style={{ maxWidth: '1200px' }}>
            <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>
            <div className="space-y-16">
              <section className="text-left">
                <AboutComponent darkMode={darkMode} t={t} />
              </section>
              <section className="text-left">
                <ProjectsComponent darkMode={darkMode} t={t} />
              </section>
              <section className="text-left">
                <ContactFormComponent darkMode={darkMode} t={t} />
              </section>
            </div>
          </main>

          <footer className={`w-full max-w-[80%] mx-auto py-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ maxWidth: '1200px' }}>
            <p>{t('copyright')}</p>
          </footer>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-500 hover:text-white transition-colors shadow-lg z-50`}
          style={{ position: 'fixed', zIndex: 9999 }}
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}