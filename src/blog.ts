import { generateOgImage } from '@utils/generateOgImage'
import {
  RequestGenericInterface,
  FastifyInstance,
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify'
import path from 'path'
import fs from 'fs'

const blogDomain = 'https://watanabebkw.microcms.io' || 'http://localhost:3000'
const cwd = process.cwd()

interface RequestGeneric extends RequestGenericInterface {
  Params: {
    slug: string
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done: any
) {
  instance.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send('ok')
  })

  instance.get(
    '/check',
    async (req: FastifyRequest<RequestGeneric>, reply: FastifyReply) => {
      try {
        // first-post で疎通をチェックする
        const slug = 'first-post'
        const res = await fetch(`${blogDomain}/api/v1/blogs/${slug}`)
        const json = (await res.json()) as { title: string }

        reply.send({ title: json.title })
      } catch (e: any) {
        console.error(e.message)

        reply.send({ error: e.message })
      }
    }
  )

  instance.get(
    '/posts/:slug/image',
    async (req: FastifyRequest<RequestGeneric>, reply: FastifyReply) => {
      const slug = req.params.slug

      reply.header('Content-Type', 'image/png')

      try {
        const res = await fetch(`${blogDomain}/api/v1/blogs/${slug}`)
        const json = (await res.json()) as { title: string }
        const img = await generateOgImage(json.title)

        reply.send(img)
      } catch (e: any) {
        console.error(e.message)
        const file = path.resolve(cwd, 'public/ogp2.png')
        const siteImg = fs.readFileSync(file)

        reply.send(siteImg)
      }
    }
  )

  done()
}
