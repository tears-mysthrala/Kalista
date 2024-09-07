import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  changeLanguage: (lang: string) => void;
  lng: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;
  styles: {
    [key: string]: string;
  };
}

export default function Navigation({ darkMode, toggleDarkMode, changeLanguage, lng, isMenuOpen, toggleMenu, isMobile, styles }: NavigationProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
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
        <AnimatePresence>
          {(isMenuOpen || !isMobile) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`md:flex flex-col md:flex-row fixed md:relative top-[4rem] md:top-auto left-0 right-0 md:left-auto md:right-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} md:bg-transparent p-4 md:p-0 ${darkMode ? 'text-gray-100' : 'text-gray-900'} w-full md:w-auto rounded-b-lg shadow-lg md:shadow-none z-50`}
            >
              <NavigationMenu className="md:mr-4">
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
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0 md:ml-auto">
                <button
                  onClick={toggleDarkMode}
                  className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
                <select 
                  onChange={(e) => changeLanguage(e.target.value)} 
                  value={lng}
                  className={`px-3 py-1 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 border-gray-600' 
                      : 'bg-gray-200 text-gray-700 border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="eu">Euskara</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}