import React from 'react'
import { ChevronRight } from 'react-feather'

export const Introduce: React.VFC = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl  dark:text-gray-100 font-bold tracking-widest flex">
        <div className="mr-2 flex items-center">
          <ChevronRight />
        </div>
        About me
      </h1>
      <p className="text-lg font-sans text-gray-500 dark:text-gray-100">
        ソフトウェアエンジニアしています。
        エンジニアとしては、フロントエンドやサーバーサイドにおけるアプリケーションの開発経験が多いです。
      </p>
    </div>
  )
}
