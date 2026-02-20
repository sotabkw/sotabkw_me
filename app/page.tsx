import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AboutSection } from '@/components/sections/AboutSection'
import { SnsSection } from '@/components/sections/SnsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-end px-4 py-3 sm:px-8">
        <ThemeToggle />
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-8">
        <AboutSection />
        <SnsSection />
        <ProjectsSection />
      </main>
    </>
  )
}
