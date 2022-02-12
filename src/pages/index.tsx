import { BlogLayout } from '@components/layout/BlogLayout'

import dynamic from 'next/dynamic'

const ScrollRevealContainer = dynamic(
  import('@components/organism/ScrollRevealContainer'),
  {
    ssr: false,
  }
)

export default function Home() {
  return (
    <body>
      <ScrollRevealContainer delay={200}>
        <BlogLayout />
      </ScrollRevealContainer>
    </body>
  )
}
