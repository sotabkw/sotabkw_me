import { AboutLayout } from '@components/layout/AboutLayout'
import { PageSEO } from '@components/organism/SEO'
import { siteMetadata } from '@data/siteMetadata'

export default function Test() {
  return (
    <div>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <AboutLayout />
    </div>
  )
}
