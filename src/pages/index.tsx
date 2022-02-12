import { BlogLayout } from '@components/layout/BlogLayout'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'

export default function Home() {
  return (
    <body>
      <ScrollRevealContainer scrollSpeedType="normal">
        <BlogLayout />
      </ScrollRevealContainer>
    </body>
  )
}
