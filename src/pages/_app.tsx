import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { Header } from '@components/organism/Header'
import { Footer } from '@components/organism/Footer'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
export default MyApp
