import React from 'react'
import { ChevronRight } from 'react-feather'

export const Introduce: React.VFC = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl  dark:text-gray-100 font-bold tracking-widest flex">
        <div className="mr-2 flex items-center">
          <ChevronRight />
        </div>
        about me
      </h1>
      <p className="text-lg font-sans text-gray-500 dark:text-gray-100">
        Hi, my name is Sota. Welcome to my site. I&apos;m a Software Engineer. I
        like the front-end, so I want to pursue technical pursuits and at the
        same time pursue how to deliver excellent UI/UX to users as a product.
        However, I am also interested in the back-end and am currently studying.
      </p>
    </div>
  )
}
