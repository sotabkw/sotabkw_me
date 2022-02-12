import React, { FC } from 'react'

import { Activity, Calendar, MapPin } from 'react-feather'

type Props = {
  date: string
  title: string
  incHref: string
  isPreset: boolean
  body?: string
  isLast?: boolean
  isFirst?: boolean
}

export const ResumeBar: React.VFC<Props> = (props) => {
  const { title, date, body, isLast, isFirst, incHref, isPreset } = props

  const className = isPreset
    ? 'text-primary-400'
    : 'dark:text-gray-100 text-gray-400'
  return (
    <li className="list-none">
      <article>
        <div className="grid md:grid-cols-8 xl:grid-cols-5 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden">
          <h3 className="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-5 mb-1 ml-9 md:ml-0">
            <div className="flex text-xl font-sans text-gray-800">
              <a
                href={incHref}
                className="text-lg text-primary-400 flex hover:text-primary-500 transition-colors"
              >
                <div className="mr-2 flex items-center">
                  <MapPin />
                </div>
                {title}
              </a>
            </div>
          </h3>
          <time
            dateTime={date}
            className="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0 text-gray-500"
          >
            {isLast ? (
              <svg
                viewBox="0 0 12 12"
                className={`w-3 h-3 mr-6 overflow-visible ${className}`}
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <circle
                  cx="6"
                  cy="6"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  className="text-gray-200"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 12 12"
                className={`w-3 h-3 mr-6 overflow-visible ${className}`}
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <circle
                  cx="6"
                  cy="6"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                {!isFirst && (
                  <path
                    d="M 6 -6 V -30"
                    fill="none"
                    stroke-width="2"
                    stroke="currentColor"
                    className="text-gray-200"
                  ></path>
                )}
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  className="text-gray-200"
                ></path>
              </svg>
            )}

            <div className="flex text-sm transition-colors  font-sans pt-2 text-gray-500 dark:text-gray-100">
              <div className="mr-2">
                <Calendar />
              </div>
              {date}
            </div>
          </time>
          {body && (
            <p className="font-sans md:col-start-3 md:col-span-6 xl:col-span-3 ml-9 md:ml-0  text-gray-500 dark:text-gray-100">
              <div className="flex text-sm transition-colors pt-2">
                <div className="mr-2">
                  <Activity />
                </div>
                {body}
              </div>
            </p>
          )}
        </div>
      </article>
    </li>
  )
}
