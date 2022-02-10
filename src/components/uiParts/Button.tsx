import { createElement, ReactNode } from 'react'

type Tags = 'button' | 'a'

type Props<T extends Tags> = JSX.IntrinsicElements[T] & {
  as?: T
  children?: ReactNode
  className?: string
}

export const Button = <T extends Tags = 'button'>({
  as,
  children,
  className,
  ...props
}: Props<T>) => {
  return createElement(
    as || 'button',
    {
      ...props,
      className: className,
    },
    children
  )
}
