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

export default function ClientPage({ lng }: { lng: string }) {
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

  // ... resto del código ...

  if (!isLoaded) {
    return null; // o un componente de carga
  }

  return (
    <div>
      {/* Tu contenido JSX va aquí */}
      <h1>{t('welcome')}</h1>
      {/* Agrega el resto de tus componentes y JSX */}
    </div>
  );
}