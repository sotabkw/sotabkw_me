import { RestClientInterface } from '@lib/restClient.ts/restClient'

export type Blog = {
  contents: Article[]
  totalCount: number
}

export type Article = {
  id: string
  leadSentence: string
  title: string
  publishedAt: Date
  content: string
  eyecatch: string
  category: string[]
}

export type BlogUseCaseInterface = {
  getList: (args?: { offset: number; limit: number }) => Promise<Blog>
  getDetail: (id: string, draftKey?: string) => Promise<Article>
}

export class BlogUseCase implements BlogUseCaseInterface {
  constructor(private readonly restClient: RestClientInterface) {}

  public async getList(args?: {
    offset: number
    limit: number
  }): Promise<Blog> {
    const params = args ? `?offset=${args.offset}&limit=${args.limit}` : ''
    return await this.restClient.get<Blog>(`/api/v1/blogs${params}`)
  }

  public async getDetail(id: string, draftKey?: string): Promise<Article> {
    const params = draftKey ? `?draftKey=${draftKey}` : ''
    return await this.restClient.get<Article>(`/api/v1/blogs/${id}${params}`)
  }
}
