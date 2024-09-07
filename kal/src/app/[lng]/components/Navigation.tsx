'use client';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { useTranslation } from 'react-i18next';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  // ... resto del código ...
}