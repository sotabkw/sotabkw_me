import { PageSEO } from '@components/organism/SEO'
import { siteMetadata } from '@data/siteMetadata'
import { getClient } from '@lib/restClient.ts/restClient'
import { Article, BlogUseCase } from '@usecase/Blog'
import { format } from 'date-fns'
import { GetStaticProps } from 'next'
import Link from 'next/link'

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

export default function BlogId({
  blog,
  preview,
}: {
  blog: Article
  preview: boolean
}) {
  return (
    <>
      <PageSEO title={blog.title} description={blog.leadSentence} />
      {preview && (
        <Link href="/">
          <a href="/api/clear-preview" aria-label="プレビュー解除">
            プレビューモードを解除
          </a>
        </Link>
      )}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="space-y-1 text-center py-10 border-b border-gray-200">
          <p className="text-base leading-6 font-medium text-gray-500 my-3 tracking-widest">
            {preview
              ? '※下書き'
              : format(new Date(blog.publishedAt), 'yyyy/MM/dd')}
          </p>
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-white">
            {blog.title}
          </h1>
          {blog.category && (
            <div className="pt-2 text-blue-400">#{blog.category}</div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
          className="prose max-w-none pt-10 pb-8 prose-blue prose dark:prose-invert"
        />
      </main>
    </>
  )
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const blogUseCase = new BlogUseCase(getClient())
  const data = await blogUseCase.getList()
  const paths = data.contents.map(
    (content: { id: string }) => `/blog/${content.id}`
  )
  return { paths, fallback: false }
}

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps: GetStaticProps = async (context) => {
  const blogUseCase = new BlogUseCase(getClient())
  const { params, previewData } = context

  const draftKey = isDraft(previewData) ? previewData.draftKey : undefined

  const id = params?.id

  const data =
    typeof id === 'string' ? await blogUseCase.getDetail(id, draftKey) : null
  return {
    props: {
      blog: data,
      preview: context.params?.preview || false,
    },
  }
}
