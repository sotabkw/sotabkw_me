export type SnsLink = {
  name: string
  url: string
  icon: 'github' | 'x' | 'zenn'
}

export const snsLinks: SnsLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/sotabkw',
    icon: 'github',
  },
  {
    name: 'X',
    url: 'https://x.com/sotabkw',
    icon: 'x',
  },
  {
    name: 'Zenn',
    url: 'https://zenn.dev/sotabkw',
    icon: 'zenn',
  },
]
