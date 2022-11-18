import { BlogLayout } from '@components/layout/BlogLayout'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'
import { PageSEO } from '@components/organism/SEO'
import { siteMetadata } from '@data/siteMetadata'
import { getClient } from '@lib/restClient.ts/restClient'
import { Article, Blog, BlogUseCase } from '@usecase/Blog'
import type { GetStaticProps } from 'next'

type Props = {
  contents: Article[]
  totalCount: number
}

export const BLOG_PER_PAGE = 6

export default function Home({ contents, totalCount }: Props) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <body>
        <ScrollRevealContainer scrollSpeedType="normal">
          <BlogLayout {...{ contents, totalCount, currentPage: 1 }} />
        </ScrollRevealContainer>
      </body>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  if (typeof window === 'object') {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  const blogUseCase = new BlogUseCase(getClient())
  const data: Blog = await blogUseCase.getList({
    offset: 0,
    limit: BLOG_PER_PAGE,
  })
  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
    },
  }
}
