import { BlogSection } from '@components/organism/BlogSection'
import { Article } from '@usecase/Blog'
import { format } from 'date-fns'

type Props = {
  contents: Article[]
  totalCount: number
  currentPage: number
}

export const BlogLayout: React.FC<Props> = ({
  contents,
  totalCount,
  currentPage,
}) => {
  const blogContent = [
    {
      date: 'August 8, 2021',
      tags: ['JavaScript', 'Go', 'React'],
      summary:
        'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります',
      title: 'Hello World',
      slug: 'hoge',
    },
    {
      date: 'August 8, 2021',
      tags: ['JavaScript', 'Go', 'React'],
      summary:
        'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります',
      title: 'Hello World',
      slug: 'hoge',
    },
    {
      date: 'August 8, 2021',
      tags: ['JavaScript', 'Go', 'React'],
      summary:
        'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります',
      title: 'Hello World',
      slug: 'hoge',
    },
    {
      date: 'August 8, 2021',
      tags: ['JavaScript', 'Go', 'React'],
      summary:
        'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります',
      title: 'Hello World',
      slug: 'hoge',
    },
    {
      date: 'August 8, 2021',
      tags: ['JavaScript', 'Go', 'React'],
      summary:
        'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります',
      title: 'Hello World',
      slug: 'hoge',
    },
  ]
  return (
    <ul>
      {contents.map((b, index) => {
        const { publishedAt, category, leadSentence, title, id } = b
        return (
          <li key={index}>
            <BlogSection
              date={format(new Date(publishedAt), 'yyyy/MM/dd')}
              tags={category}
              summary={leadSentence}
              title={title}
              slug={id}
            />
          </li>
        )
      })}
    </ul>
  )
}
