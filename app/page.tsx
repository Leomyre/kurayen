"use client"

import { Button } from "@/components/ui/button"
import { Download, Github, Facebook, Mail, Phone} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CharacterTraits from "./components/character-traits"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import TypedText from "./components/typed-text"

export default function Page() {
  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block neon-text">Léomyre</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-neonRed">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-neonRed">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-neonRed">
                Contact
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              className="border-neonRed text-neonRed hover:bg-neonRed/10"
              onClick={() => window.open("/cv.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 relative z-10">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative w-64 h-64 mb-4 overflow-hidden rounded-full border-2 border-neonRed shadow-neon">
                <Image
                  src="leomyre.jpg"
                  alt="Léomyre"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-2 p-5">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <TypedText text="Hello, I am Léomyre" typingSpeed={80} className="neon-text" />
                </h1>
                <div className="h-24 md:h-16">
                  <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                    <TypedText
                      text="A developer passionate about modern technologies and creating web applications. I love taking on technical challenges and learning new skills every day."
                      typingSpeed={30}
                      startDelay={2000}
                    />
                  </p>
                </div>
              </div>
              <div className="space-x-4">
      <Link href="https://github.com/Leomyre" target="_blank">
        <Button variant="outline" size="icon" className="border-neonBlue text-neonBlue hover:bg-neonBlue/10">
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </Button>
      </Link>
      <Link href="mailto:ghleomyre@gmail.com">
        <Button variant="outline" size="icon" className="border-neonBlue text-neonBlue hover:bg-neonBlue/10">
          <Mail className="h-4 w-4" />
          <span className="sr-only">Email</span>
        </Button>
      </Link>
      <Link href="https://wa.me/33385807810" target="_blank">
        <Button variant="outline" size="icon" className="border-neonBlue text-neonBlue hover:bg-neonBlue/10">
          <Phone className="h-4 w-4" />
          <span className="sr-only">WhatsApp</span>
        </Button>
      </Link>
      <Link href="https://facebook.com/YourFacebookUsername" target="_blank">
        <Button variant="outline" size="icon" className="border-neonBlue text-neonBlue hover:bg-neonBlue/10">
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Facebook</span>
        </Button>
      </Link>
    </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              <span className="text-neonBlue">My</span> <span className="neon-text">Character</span>
            </h2>
            <CharacterTraits />
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              <span className="text-neonBlue">Pro</span>
              <span className="neon-text">jects</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
                title="Portfolio"
                description="This portfolio was created to showcase my skills and some of my ongoing development projects."
                image="/placeholder.svg?height=400&width=600"
                link="#"
                tags={["Next.js, TypeScript, TailwindCSS"]}
              />
              <ProjectCard
                title="Chika-chat"
                description="Chika-chat is a lightweight and ephemeral messaging web application. It is secure, easy to use, and designed for seamless communication."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/Leomyre/Chika"
                tags={["Django, HTML, CSS, JavaScript", "TailwindCSS"]}
              />
              <ProjectCard
                title="Event Platform"
                description="This platform allows organizers to announce and manage the events they organize."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/Leomyre/event"
                tags={["Django, HTML, CSS, JavaScript", "TailwindCSS"]}
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              <span className="neon-text">Tech</span> <span className="text-neonBlue">Stack</span>
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                <span className="text-neonBlue">Get in</span> <span className="neon-text">Touch</span>
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 relative z-10">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">
            © 2024 <span className="neon-text">Léomyre</span>. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:text-neonRed" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:text-neonRed" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

