import type { NextApiRequest, NextApiResponse } from 'next'

export type HealthCheck = {
  name: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<HealthCheck>) => {
  res.status(200).json({ name: 'sotabkw' })
}
