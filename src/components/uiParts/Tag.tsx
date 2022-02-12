import Link from 'next/link'
import { FC } from 'react'
import { Button } from './Button'

type Props = {
  text: string
  url?: string
}

export const Tag: FC<Props> = ({ text, url }) => {
  return (
    <Link href={url || ''} passHref>
      <Button
        as="a"
        className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
      >
        {text.split(' ').join('-')}
      </Button>
    </Link>
  )
}

export default Tag
