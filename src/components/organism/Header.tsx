import { SectionContainer } from '@components/layout/SectionContainer'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Meh } from 'react-feather'
import { DarkModeSelectMenu } from './DarkModeSelectMenu'

export const Header = () => {
  const [isHeightOver, setIsHeightOver] = useState<boolean>(false) //1.

  useEffect(() => {
    // 2
    const scrollAction = () => {
      // 3
      if (0 === window.scrollY) {
        // 150の値は 判定したい高さに変更する
        setIsHeightOver(true)
      } else {
        setIsHeightOver(false)
      }
    }
    window.addEventListener('scroll', scrollAction) // 4.
    scrollAction() // 初期描画時に一度だけ判定する

    return () => {
      // 5
      window.removeEventListener('scroll', scrollAction)
    }
  }, [])

  const className = isHeightOver
    ? 'bg-white/95 dark:bg-transparent supports-backdrop-blur:bg-white/60 '
    : 'bg-white dark:bg-slate-800/75 supports-backdrop-blur:bg-white/95'

  return (
    <header
      className={`z-10 border-b-0.5 border-gray-200 dark:border-slate-600 sticky top-0  backdrop-blur transition-colors ${className}`}
    >
      <SectionContainer>
        {
          <div className="flex items-center justify-between py-4">
            <div>
              <Link href="/" passHref>
                <div className="flex items-center">
                  <Meh
                    className="animate-bounce text-primary-400"
                    aria-hidden="true"
                  />
                  <p className="text-xl font-mono font-bold pl-3 tracking-widest">
                    sota_bkw
                  </p>
                </div>
              </Link>
            </div>

            <div className="text-sm flex items-center justify-between">
              <DarkModeSelectMenu />
            </div>
          </div>
        }
      </SectionContainer>
    </header>
  )
}
