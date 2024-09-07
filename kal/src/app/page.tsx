'use client';

import { useState, useEffect } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { Progress } from "@radix-ui/react-progress"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import styles from './page.module.css';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import { fallbackLng } from '../i18n/settings';

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })
const VisitTracker = dynamic(() => import('../components/VisitTracker'), { ssr: false })

export default function Home() {
  redirect(`/${fallbackLng}`);
}
