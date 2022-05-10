import { Button } from '@components/uiParts/Button'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDown, Edit3, Tag, User } from 'react-feather'

type PageType = 'About' | 'Blog' | 'Tags'
export const PageMenu = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('Blog')
  const router = useRouter()

  useEffect(() => {
    router.pathname === '/404' && setCurrentPage('Blog')
    router.pathname === '/about' && setCurrentPage('About')
  }, [router])

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-white bg-gray-400 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {currentPage}
            <ChevronDown
              className="w-5 h-5 ml-2 -mr-1 text-gray-600 dark:text-primary-400 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-32 mt-6 origin-top-right bg-white  dark:bg-slate-800/95 divide-y divide-gray-200 dark:divide-gray-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-primary-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-bold`}
                    onClick={() => {
                      setCurrentPage('Blog')
                      router.push('/')
                    }}
                  >
                    <Edit3 className="w-5 h-5 mr-2" aria-hidden="true" />
                    Blog
                  </Button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-primary-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-bold`}
                    onClick={() => {
                      setCurrentPage('About')
                      router.push('/about')
                    }}
                  >
                    <User className="w-5 h-5 mr-2" aria-hidden="true" />
                    About
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-primary-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-bold`}
                    onClick={() => {
                      setCurrentPage('Tags')
                      router.push('/tags')
                    }}
                  >
                    <Tag className="w-5 h-5 mr-2" aria-hidden="true" />
                    Tags
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
