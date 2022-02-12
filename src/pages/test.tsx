import { BlogLayout } from '@components/layout/BlogLayout'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'

export default function Test() {
  return (
    <>
      <ScrollRevealContainer scrollSpeedType="fast">
        <div className="py-12 text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100  md:px-2 md:text-8xl md:leading-14">
          Test Page
        </div>
      </ScrollRevealContainer>
      <ScrollRevealContainer scrollSpeedType="slow">
        <BlogLayout />
        <BlogLayout />
        <BlogLayout />
        <BlogLayout />
      </ScrollRevealContainer>
    </>
  )
}
