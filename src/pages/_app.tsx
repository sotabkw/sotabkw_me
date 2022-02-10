import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { Header } from '@components/organism/Header'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
