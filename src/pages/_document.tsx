import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang="ja-JP" className="dark">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <body className="bg-white dark:bg-slate-900 dark:bg-gradient-to-r from-slate-900 to-slate-700 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
