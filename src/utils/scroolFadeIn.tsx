export type scrollSpeedType = 'normal' | 'fast' | 'slow'

export const scrollFadeIn = (scrollSpeedType: scrollSpeedType) => {
  let className: string
  let query: string
  switch (scrollSpeedType) {
    case 'normal':
      className = 'motion-safe:animate-fadeIn'
      query = '.js-show-on-scrolls-normal'
      break
    case 'fast':
      className = 'motion-safe:animate-fadeInFast'
      query = '.js-show-on-scrolls-fast'
      break
    case 'slow':
      className = 'motion-safe:animate-fadeInSlow'
      query = '.js-show-on-scrolls-slow'
      break
  }

  console.log(className)

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className)
      } else {
        entry.target.classList.remove(className)
      }
    })
  }

  const observer = new IntersectionObserver(callback)

  const targets = document.querySelectorAll(query)
  targets.forEach((target) => {
    target.classList.add('opacity-0')
    observer.observe(target)
  })
}
