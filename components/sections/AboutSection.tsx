'use client'

import { Typewriter } from '@/components/ui/Typewriter'

export function AboutSection() {
  return (
    <section className="py-16">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        sotabkw
      </h1>
      <p className="mt-4 text-lg text-muted">
        <Typewriter text="Software Engineer" speed={60} delay={500} />
      </p>
      <p className="mt-6 max-w-xl leading-relaxed text-foreground/80">
        <Typewriter
          text="Software engineer focused on web application development."
          speed={40}
          delay={1800}
        />
      </p>
    </section>
  )
}
