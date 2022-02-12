import { FC, useRef, useEffect } from 'react'
import scrollReveal from 'scrollreveal'

type move = 'left' | 'right' | 'top' | 'bottom'

type ScrollRevealContainerProps = {
  move?: move
  delay?: number
}

const ScrollRevealContainer: FC<ScrollRevealContainerProps> = ({
  children,
  move = 'bottom',
  delay = 300,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay: delay,
        opacity: 0,
        duration: 1000,
        origin:
          move === 'left'
            ? 'left'
            : move === 'right'
            ? 'right'
            : move === 'top'
            ? 'top'
            : 'bottom',
        distance: '20px',
      })
  }, [sectionRef, move, delay])

  return sectionRef ? <section ref={sectionRef}>{children}</section> : <></>
}

export default ScrollRevealContainer
