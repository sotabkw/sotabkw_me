import { Footer } from '@components/organism/Footer'
import { Header } from '@components/organism/Header'
import { FC } from 'react'
import { SectionContainer } from './SectionContainer'

type Props = {
  children: React.ReactNode
}

export const LayoutWrapper: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer isScreen={true}>{children}</SectionContainer>
      <Footer />
    </>
  )
}
