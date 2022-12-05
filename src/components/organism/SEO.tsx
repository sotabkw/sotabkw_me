import { siteMetadata } from '@data/siteMetadata'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
  title: string
  description: string
  ogType: string
  ogImage: string
  twImage: string
  canonicalUrl?: string
}

const CommonSEO: React.FC<Props> = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
  canonicalUrl,
}) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={`${siteMetadata.siteUrl}${router.asPath}`}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={ogImage} key={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link
        rel="canonical"
        href={
          canonicalUrl
            ? canonicalUrl
            : `${siteMetadata.siteUrl}${router.asPath}`
        }
      />
    </Head>
  )
}

type PageSEOProps = {
  title: string
  description: string
  ogImage?: string
}

export const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  ogImage,
}) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImage || ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

type TagSEOProps = {
  title: string
  description: string
}

export const TagSEO: React.FC<TagSEOProps> = ({ title, description }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}
