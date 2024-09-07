import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { Progress } from "@radix-ui/react-progress"
import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })
const VisitTracker = dynamic(() => import('../components/VisitTracker'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <VisitTracker />
      {/* Resto del código sin cambios */}
    </div>
  );
}
