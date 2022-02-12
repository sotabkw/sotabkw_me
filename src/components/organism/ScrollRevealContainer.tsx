import { scrollFadeIn, scrollSpeedType } from '@utils/scroolFadeIn'
import { FC, useEffect } from 'react'

type Props = {
  scrollSpeedType: scrollSpeedType
}

export const ScrollRevealContainer: FC<Props> = ({
  children,
  scrollSpeedType,
}) => {
  let className: string

  switch (scrollSpeedType) {
    case 'normal':
      className = '.js-show-on-scrolls-normal motion-safe:animate-fadeIn'
      break
    case 'fast':
      className = '.js-show-on-scrolls-fast motion-safe:animate-fadeInFast'
      break
    case 'slow':
      className = '.js-show-on-scrolls-slow motion-safe:animate-fadeInSlow'
      break
  }

  useEffect(() => {
    scrollFadeIn(scrollSpeedType)
  }, [scrollSpeedType])

  return <div className={`${className}`}>{children}</div>
}

// type move = 'left' | 'right' | 'top' | 'bottom'

// type ScrollRevealContainerProps = {
//   move?: move
//   delay?: number
// }

// const ScrollRevealContainer: FC<ScrollRevealContainerProps> = ({
//   children,
//   move = 'bottom',
//   delay = 300,
// }) => {
//   const sectionRef = useRef<HTMLElement>(null)

//   useEffect(() => {
//     if (sectionRef.current)
//       scrollReveal().reveal(sectionRef.current, {
//         reset: true,
//         delay: delay,
//         opacity: 0,
//         duration: 1000,
//         origin:
//           move === 'left'
//             ? 'left'
//             : move === 'right'
//             ? 'right'
//             : move === 'top'
//             ? 'top'
//             : 'bottom',
//         distance: '20px',
//       })
//   }, [sectionRef, move, delay])

//   return sectionRef ? <section ref={sectionRef}>{children}</section> : <></>
// }

// export default ScrollRevealContainer
