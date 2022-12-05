import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  name: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<Response>) => {
  res.status(200).json({ name: 'sotabkw' })
}
