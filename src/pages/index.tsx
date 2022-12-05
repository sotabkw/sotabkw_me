import { BlogLayout } from '@components/layout/BlogLayout'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'
import { PageSEO } from '@components/organism/SEO'
import { siteMetadata } from '@data/siteMetadata'
import { getClient } from '@lib/restClient.ts/restClient'
import { Article, Blog, BlogUseCase } from '@usecase/Blog'
import type { GetStaticProps } from 'next'
import { HealthCheck } from './api/health_check'
import useSwr from 'swr'
import { useState } from 'react'

type Props = {
  contents: Article[]
  totalCount: number
}

export const BLOG_PER_PAGE = 6

const fetcher = async (args: string): Promise<HealthCheck> => {
  const response = await fetch(args)
  return (await response.json()) as HealthCheck
}

export default function Home({ contents, totalCount }: Props) {
  const [hoge, setHoge] = useState('')
  const { data, error } = useSwr<HealthCheck>('/api/health_check', fetcher)

  fetcher('/api/health_check').then((s) => setHoge(s.name))

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <body>
        {data?.name}
        <ScrollRevealContainer scrollSpeedType="normal">
          <BlogLayout {...{ contents, totalCount, currentPage: 1 }} />
        </ScrollRevealContainer>
      </body>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
