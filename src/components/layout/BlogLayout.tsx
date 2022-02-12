import { BlogSection } from '@components/organism/BlogSection'

export const BlogLayout = () => {
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
      {blogContent.map((b, index) => {
        const { date, tags, summary, title, slug } = b
        return (
          <li key={index}>
            <BlogSection
              date={date}
              tags={tags}
              summary={summary}
              title={title}
              slug={slug}
            />
          </li>
        )
      })}
    </ul>
  )
}
