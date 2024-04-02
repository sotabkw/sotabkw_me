import { LayoutWrapper } from '@components/layout/LayoutWrapper'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <LayoutWrapper>{<Component {...pageProps} />}</LayoutWrapper>
}
export default MyApp
