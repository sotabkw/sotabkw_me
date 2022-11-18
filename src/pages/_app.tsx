import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { LayoutWrapper } from '@components/layout/LayoutWrapper'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <LayoutWrapper>{<Component {...pageProps} />}</LayoutWrapper>
}
export default MyApp
