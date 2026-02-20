'use client'

import { careers } from '@/data/career'
import { LinkCard } from '@/components/ui/LinkCard'

export function ProjectsSection() {
  return (
    <section className="py-8">
      <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
        Career
      </h2>
      <div className="mt-6 space-y-8">
        {careers.map((career) => (
          <div key={`${career.company}-${career.period}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold">{career.company}</h3>
              <span className="text-sm text-muted">{career.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{career.role}</p>
            {career.description && (
              <p className="mt-2 text-sm text-foreground/70">{career.description}</p>
            )}
            {career.url && (
              <div className="mt-4">
                <LinkCard url={career.url} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
