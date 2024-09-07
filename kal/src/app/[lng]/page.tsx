'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../../i18n/client'
import dynamic from 'next/dynamic'
import styles from '../page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import About from './components/About';
import Projects from './components/Projects';

const ContactForm = dynamic(() => import('../../components/ContactForm'), { ssr: false })
const VisitTracker = dynamic(() => import('../../components/VisitTracker'), { ssr: false })

export default function Home({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common', { lng });
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isLoaded) {
    return null; // o un componente de carga
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.containerDark : styles.containerLight} relative min-h-screen`}>
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
      
      <div className="relative z-10 overflow-y-auto overflow-x-hidden h-screen">
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

        <main className="max-w-4xl mx-auto pt-8 px-4 overflow-x-hidden">
          <About darkMode={darkMode} />
          <Projects darkMode={darkMode} />

          <section id="contact" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{t('contact')}</h2>
            <ContactForm darkMode={darkMode} />
          </section>
        </main>

        <footer className={`mt-12 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} px-4 pb-4`}>
          <p>{t('copyright')}</p>
        </footer>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-2 rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-500 hover:text-white transition-colors`}
            aria-label="Volver arriba"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}