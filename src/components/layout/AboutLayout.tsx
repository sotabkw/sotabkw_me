/* eslint-disable @next/next/no-img-element */
import { Carrier } from '@components/organism/carrier'
import { Introduce } from '@components/organism/Introduce'
import { ScrollRevealContainer } from '@components/organism/ScrollRevealContainer'
import { Skill } from '@components/organism/Skill'
import { GitHub, Instagram, Mail, Twitter } from 'react-feather'

export const AboutLayout = () => {
  const JSXArray = {
    about: <Introduce />,
    carrier: <Carrier />,
    skill: <Skill />,
  }
  return (
    <>
      <div className="divide-y">
        <ScrollRevealContainer scrollSpeedType="fast">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              About
            </h1>
          </div>
        </ScrollRevealContainer>
        <ScrollRevealContainer scrollSpeedType="slow">
          <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div className="flex flex-col items-center space-x-2 pt-8">
              <img
                src="/favicon.ico"
                alt="avatar"
                width="192px"
                height="192px"
                className="h-48 w-48 rounded-full"
              />
              <h3 className="pt-4 pb-4 text-2xl font-bold leading-8 font-mono font-bold tracking-widest">
                Sota Watanabe
              </h3>
              <div className="text-gray-500 dark:text-gray-400">
                Software Engineer
              </div>
              <div className="flex space-x-3 pt-6">
                <GitHub
                  className="cursor-pointer w-6 h-6 text-slate-500  hover:text-primary-400"
                  aria-hidden="true"
                  aria-label="github icon"
                />
                <Twitter
                  className="cursor-pointer w-6 h-6  text-slate-500  hover:text-primary-400"
                  aria-hidden="true"
                  aria-label="twitter icon"
                />
                <Mail
                  className="cursor-pointer w-6 h-6  text-slate-500  hover:text-primary-400"
                  aria-hidden="true"
                  aria-label="mail icon"
                />
                <Instagram
                  className="cursor-pointer w-6 h-6  text-slate-500  hover:text-primary-400"
                  aria-hidden="true"
                  aria-label="instagram icon"
                />
              </div>
            </div>
            <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">
              <ul>
                {Object.values(JSXArray).map((e, index) => (
                  <li key={index} className="my-8 list-none">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollRevealContainer>
      </div>
    </>
  )
}
