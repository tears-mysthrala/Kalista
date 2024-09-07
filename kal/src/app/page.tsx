import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Label } from "@radix-ui/react-label"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"
import { Progress } from "@radix-ui/react-progress"
import dynamic from 'next/dynamic'
import { headers } from 'next/headers';
import { trackVisit } from '../lib/tracker';

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })

export default function Home() {
  trackVisit({
    geo: { country: headers().get('x-vercel-ip-country') || 'Unknown' },
    headers: headers()
  });

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <NavigationMenu className="mb-8">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Sobre Mí</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#about">Información Personal</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Proyectos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#projects">Mis Trabajos</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#contact">Contacto</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <header className="text-center mb-12">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src="/tu-foto.jpg" alt="Unai Kalista Urzainqui" />
          <AvatarFallback>UKU</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mb-2">Unai Kalista Urzainqui</h1>
        <p className="text-xl text-gray-600">Desarrollador Backend</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <section id="about" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sobre Mí</h2>
          <p className="text-gray-700 mb-4">
            Soy un desarrollador backend con experiencia en Python y Django. Mi enfoque se centra en crear soluciones eficientes y escalables para aplicaciones web. Tengo un fuerte interés en el aprendizaje continuo y en mantenerme actualizado con las últimas tecnologías y mejores prácticas en el desarrollo de software.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="skill1">Python</Label>
              <Progress id="skill1" value={90} max={100} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '90%' }}></div>
              </Progress>
            </div>
            <div>
              <Label htmlFor="skill2">Django</Label>
              <Progress id="skill2" value={85} max={100} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
              </Progress>
            </div>
            <div>
              <Label htmlFor="skill3">SQL</Label>
              <Progress id="skill3" value={80} max={100} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '80%' }}></div>
              </Progress>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Mis Proyectos</h2>
          <div className="border rounded-lg p-6 text-center bg-gray-100">
            <p className="text-gray-600 text-lg">
              Los proyectos se añadirán próximamente. Estoy trabajando en recopilar y presentar mis trabajos más destacados.
            </p>
            <p className="text-gray-500 mt-2">
              ¡Vuelve pronto para ver mis proyectos!
            </p>
          </div>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">Contáctame</h2>
          <ContactForm />
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2024 Unai Kalista Urzainqui. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
