import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { LayoutWrapper } from '@components/layout/LayoutWrapper'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <body className="bg-white dark:bg-slate-900 dark:bg-gradient-to-r from-slate-900 to-slate-700 dark:text-gray-50">
      <LayoutWrapper>{<Component {...pageProps} />}</LayoutWrapper>
    </body>
  )
}
export default MyApp
