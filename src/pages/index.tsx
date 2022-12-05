import { BlogLayout } from '@components/layout/BlogLayout'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'
import { PageSEO } from '@components/organism/SEO'
import { siteMetadata } from '@data/siteMetadata'
import { getClient } from '@lib/restClient.ts/restClient'
import { Article, Blog, BlogUseCase } from '@usecase/Blog'
import type { GetStaticProps } from 'next'
import { HealthCheck } from './api/health_check'
import useSwr from 'swr'

type Props = {
  contents: Article[]
  totalCount: number
  test: HealthCheck
}

export const BLOG_PER_PAGE = 6

const fetcher = async (args: string): Promise<HealthCheck> => {
  const response = await fetch(args)
  return (await response.json()) as HealthCheck
}

export default function Home({ contents, totalCount, test }: Props) {
  const { data, error } = useSwr<HealthCheck>('/api/health_check', fetcher)
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <body>
        {data?.name}
        {test.name}
        {test.name}
        {test.name}
        {test.name}
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
  const test = await fetcher('/api/health_check')
  const data: Blog = await blogUseCase.getList({
    offset: 0,
    limit: BLOG_PER_PAGE,
  })
  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
      test: test,
    },
  }
}
