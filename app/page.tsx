"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { Button } from "@/components/ui/button"
import { Download, Github, Facebook, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "./context/language-context"
import CharacterTraits from "./components/character-traits"
import ContactForm from "./components/contact-form"
import LanguageSwitcher from "./components/language-switcher"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import TypedText from "./components/typed-text"
import { useEffect, useState } from "react"
import SkeletonHeader from "./components/skeletons/skeleton-header"
import SkeletonProfile from "./components/skeletons/skeleton-profile"
import SkeletonSectionTitle from "./components/skeletons/skeleton-section-title"
import SkeletonCharacterTrait from "./components/skeletons/skeleton-character-trait"
import SkeletonProjectCard from "./components/skeletons/skeleton-project-card"
import SkeletonTechStack from "./components/skeletons/skeleton-tech-stack"
import SkeletonContactForm from "./components/skeletons/skeleton-contact-form"

export default function Page() {
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // S'assurer que le rendu côté client est terminé
  useEffect(() => {
    // Simuler un délai de chargement pour montrer les skeletons (optionnel)
    const timer = setTimeout(() => {
      setMounted(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Afficher les skeletons pendant l'hydratation
  if (!mounted) {
    return (
      <div className="min-h-screen relative">
        <SkeletonHeader />

        <main className="container px-4 md:px-6 relative z-10">
          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <SkeletonProfile />
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <SkeletonSectionTitle />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((index) => (
                  <SkeletonCharacterTrait key={index} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <SkeletonSectionTitle />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((index) => (
                  <SkeletonProjectCard key={index} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <SkeletonSectionTitle />
              <SkeletonTechStack />
            </div>
          </section>

          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-2xl">
                <SkeletonSectionTitle />
                <SkeletonContactForm />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 relative z-10">
          <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
            <Skeleton className="h-4 w-48" />
            <div className="sm:ml-auto flex gap-4 sm:gap-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </footer>
      </div>
    )
  }

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
                {t("nav.about")}
              </Link>
              <Link href="#projects" className="transition-colors hover:text-neonRed">
                {t("nav.projects")}
              </Link>
              <Link href="#contact" className="transition-colors hover:text-neonRed">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              className="border-neonRed text-neonRed hover:bg-neonRed/10"
              onClick={() => window.open("/cv.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("button.downloadCV")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 relative z-10">
        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative w-64 h-64 mb-4 overflow-hidden rounded-full border-2 border-neonRed shadow-neon">
                <Image src="/leomyre.jpg" alt="Léomyre" fill className="object-cover" priority />
              </div>
              <div className="space-y-2 p-5">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <TypedText text={t("intro.hello")} typingSpeed={80} className="neon-text" />
                </h1>
                <div className="h-24 md:h-16">
                  <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                    <TypedText text={t("intro.bio")} typingSpeed={30} startDelay={2000} />
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
                <Link href="https://wa.me/0385807810" target="_blank">
                  <Button variant="outline" size="icon" className="border-neonBlue text-neonBlue hover:bg-neonBlue/10">
                    <Phone className="h-4 w-4" />
                    <span className="sr-only">WhatsApp</span>
                  </Button>
                </Link>
                <Link href="https://www.facebook.com/Akari.Leomyre" target="_blank">
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
              <span className="text-neonBlue">{t("section.character").split(" ")[0]}</span>{" "}
              <span className="neon-text">{t("section.character").split(" ")[1]}</span>
            </h2>
            <CharacterTraits t={t} />
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              <span className="text-neonBlue">{t("section.projects").substring(0, 3)}</span>
              <span className="neon-text">{t("section.projects").substring(3)}</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Portfolio"
                description="This portfolio was created to showcase my skills and some of my ongoing development projects."
                image="/placeholder.svg?height=400&width=600"
                link="#"
                tags={["Next.js, TypeScript, TailwindCSS"]}
                translationKey="portfolio"
                t={t}
              />
              <ProjectCard
                title="Chika-chat"
                description="Chika-chat is a lightweight and ephemeral messaging web application. It is secure, easy to use, and designed for seamless communication."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/Leomyre/Chika"
                tags={["Django, HTML, CSS, JavaScript", "TailwindCSS"]}
                translationKey="chika"
                t={t}
              />
              <ProjectCard
                title="Event Platform"
                description="This platform allows organizers to announce and manage the events they organize."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/Leomyre/event"
                tags={["Django, HTML, CSS, JavaScript", "TailwindCSS"]}
                translationKey="event"
                t={t}
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
              <span className="neon-text">{t("section.techStack").split(" ")[0]}</span>{" "}
              <span className="text-neonBlue">{t("section.techStack").split(" ")[1]}</span>
            </h2>
            <TechStack />
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                <span className="text-neonBlue">{t("section.getInTouch").split(" ")[0]}</span>{" "}
                <span className="neon-text">{t("section.getInTouch").split(" ").slice(1).join(" ")}</span>
              </h2>
              <ContactForm t={t} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 relative z-10">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">
            © 2025 <span className="neon-text">Léomyre</span>. {t("footer.rights")}
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:text-neonRed" href="#">
              {t("footer.terms")}
            </Link>
            <Link className="text-xs hover:text-neonRed" href="#">
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

