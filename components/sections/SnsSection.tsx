'use client'

import { snsLinks } from '@/data/sns'
import { SnsIcon } from '@/components/ui/SnsIcon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function SnsSection() {
  return (
    <section className="py-8">
      <ScrollReveal>
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Links
        </h2>
      </ScrollReveal>
      <div className="mt-4 flex flex-wrap gap-4">
        {snsLinks.map((link, i) => (
          <ScrollReveal key={link.name} delay={i * 100}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:bg-card-hover"
            >
              <SnsIcon icon={link.icon} />
              <span>{link.name}</span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
