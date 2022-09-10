import { Button } from '@components/uiParts/Button'
import Tag from '@components/uiParts/Tag'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  date: string
  tags: string[]
  summary: string
  title: string
  slug: string
}

export const BlogSection: FC<Props> = ({
  date,
  tags,
  summary,
  title,
  slug,
}) => {
  return (
    <article className="border-t-0.5 border-gray-200 dark:border-slate-600">
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 py-12">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 tracking-widest">
            <time dateTime={date}>{date}</time>
          </dd>
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={`/blog/${slug}`} passHref>
                  <Button
                    as="a"
                    className="text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    {title}
                  </Button>
                </Link>
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} url={tag} />
                ))}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {summary}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link
              href={`/blog/${slug}`}
              aria-label={`Read "${title}"`}
              passHref
            >
              <Button
                as="a"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
              >
                Read more &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
