export type OgpData = {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

export async function fetchOgp(url: string): Promise<OgpData> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'bot',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch OGP: ${res.status}`)
  }

  const html = await res.text()

  const getMetaContent = (property: string): string => {
    const regex = new RegExp(
      `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
      'i'
    )
    const match = html.match(regex)
    return match?.[1] || match?.[2] || ''
  }

  const getTitle = (): string => {
    const ogTitle = getMetaContent('og:title')
    if (ogTitle) return ogTitle
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    return titleMatch?.[1] || ''
  }

  return {
    title: getTitle(),
    description: getMetaContent('og:description') || getMetaContent('description'),
    image: getMetaContent('og:image'),
    url: getMetaContent('og:url') || url,
    siteName: getMetaContent('og:site_name'),
  }
}
