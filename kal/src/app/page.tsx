'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { Progress } from "@radix-ui/react-progress"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from './page.module.css';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })
const VisitTracker = dynamic(() => import('../components/VisitTracker'), { ssr: false })

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [darkMode, setDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  useEffect(() => {
    // Función para detectar la preferencia de color del sistema
    const detectColorScheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setDarkMode(false);
      } else {
        setDarkMode(true);
      }
    };

    // Detectar la preferencia inicial
    detectColorScheme();

    // Escuchar cambios en la preferencia de color del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(!e.matches);
    };
    mediaQuery.addListener(handleChange);

    // Configurar el listener para el scroll
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Limpiar los listeners
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
        <nav className={`sticky top-4 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-4 border-t-4 border-[#5BCEFA] border-b-4 border-b-[#F5A9B8] w-[calc(100%-2rem)] max-w-4xl mx-auto`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center justify-center w-full md:w-auto mb-4 md:mb-0">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className={`mr-4 ${styles.logo}`}
                  // Elimina el estilo inline y usa las clases CSS
                />
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('title')}</span>
            </div>
            <button
              onClick={toggleMenu}
              className={`md:hidden text-2xl ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              ☰
            </button>
            <div className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto md:right-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} md:bg-transparent p-4 md:p-0 ${darkMode ? 'text-gray-100' : 'text-gray-900'} w-full md:w-auto rounded-b-lg shadow-lg md:shadow-none`}>
              <button
                onClick={toggleDarkMode}
                className={`md:hidden mb-4 px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
              </button>
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>{t('about')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink href="#about" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-blue-50'}`}>Información Personal</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>{t('projects')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink href="#projects" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-blue-50'}`}>Futuros Proyectos</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#contact" className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}>{t('contact')}</NavigationMenuLink>
                  </NavigationMenuItem>
                  <button
                    onClick={toggleDarkMode}
                    className={`hidden md:block px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <select onChange={(e) => changeLanguage(e.target.value)} value={router.locale}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="eu">Euskara</option>
                    <option value="zh">中文</option>
                  </select>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto pt-8 px-4 overflow-x-hidden">
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
