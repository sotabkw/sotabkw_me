import { FC, useRef, useEffect } from 'react'
import scrollReveal from 'scrollreveal'

type ScrollRevealContainerProps = {
  move?: string
  delay?: number
}

const ScrollRevealContainer: FC<ScrollRevealContainerProps> = ({
  children,
  move,
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
  }, [sectionRef])

  return <section ref={sectionRef}>{children}</section>
}

export default ScrollRevealContainer
