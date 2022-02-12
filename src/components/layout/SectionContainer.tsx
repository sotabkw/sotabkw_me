import { FC } from 'react'

type Props = {
  children: React.ReactNode
  isScreen?: boolean
}

export const SectionContainer: FC<Props> = ({ children, isScreen = false }) => {
  const className = isScreen && 'min-h-screen'
  return (
    <div
      className={`${className}   mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0`}
    >
      {children}
    </div>
  )
}
