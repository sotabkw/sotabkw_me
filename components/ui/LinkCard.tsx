'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type OgpData = {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

type LinkCardProps = {
  url: string
}

export function LinkCard({ url }: LinkCardProps) {
  const [ogp, setOgp] = useState<OgpData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
        if (res.ok) {
          const data = await res.json()
          setOgp(data)
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  if (loading) {
    return (
      <div className="animate-pulse aspect-[1200/630] max-w-xs rounded-md bg-foreground/5" />
    )
  }

  if (!ogp?.image) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md border border-border bg-card p-4"
      >
        <p className="text-sm text-muted truncate">{url}</p>
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Image
        src={ogp.image}
        alt={ogp.title || ''}
        width={1200}
        height={630}
        className="aspect-[1200/630] max-w-xs object-cover rounded-md"
        sizes="(max-width: 768px) 80vw, 320px"
      />
    </a>
  )
}
