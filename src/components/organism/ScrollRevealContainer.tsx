import { FC, useRef, useEffect } from 'react'
import scrollReveal from 'scrollreveal'

type move = 'left' | 'right' | 'top' | 'bottom'

type ScrollRevealContainerProps = {
  move?: move
  delay?: number
}

const ScrollRevealContainer: FC<ScrollRevealContainerProps> = ({
  children,
  move = 'top',
  delay = 200,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: false,
        delay: delay,
        opacity: 0,
        origin:
          move === 'left'
            ? 'left'
            : move === 'right'
            ? 'right'
            : move === 'top'
            ? 'top'
            : 'bottom',
        distance: '40px',
      })
  }, [sectionRef, move, delay])

  return <section ref={sectionRef}>{children}</section>
}

export default ScrollRevealContainer
