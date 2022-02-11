import { Button } from '@components/uiParts/Button'
import { Menu, Transition } from '@headlessui/react'
import { useDarkMode } from '@hooks/useDarkMode'
import { Fragment } from 'react'
import { Sun, Moon } from 'react-feather'

export const DarkModeSelectMenu = () => {
  const { isDarkMode, toggle } = useDarkMode()

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {isDarkMode ? (
              <Moon className="w-5 h-5  text-blue-400" aria-hidden="true" />
            ) : (
              <Sun className="w-5 h-5  text-blue-400" aria-hidden="true" />
            )}
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
          <Menu.Items className="absolute right-0 w-28 mt-6 origin-top-right bg-white dark:bg-slate-800/75 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-blue-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-bold`}
                    onClick={() => toggle(false)}
                  >
                    {active ? (
                      <Sun className="w-5 h-5 mr-2" aria-hidden="true" />
                    ) : (
                      <Sun className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    Light
                  </Button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-blue-400'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-bold`}
                    onClick={() => toggle(true)}
                  >
                    {active ? (
                      <Moon className="w-5 h-5 mr-2 " aria-hidden="true" />
                    ) : (
                      <Moon className="w-5 h-5 mr-2 " aria-hidden="true" />
                    )}
                    Dark
                  </Button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
