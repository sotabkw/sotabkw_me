import { CareerContents } from '@components/constant/CarrierContent'
import { ChevronRight } from 'react-feather'
import { ResumeBar } from './ResumeBar'

export const Carrier: React.VFC = () => {
  return (
    <div className="p-4 rounded-3xl">
      <h1 className="mb-4 text-4xl dark:text-white font-bold tracking-widest ml-4 flex">
        <div className="mr-2 flex items-center">
          <ChevronRight />
        </div>
        Carrier
      </h1>
      <ul>
        {CareerContents.map((cc, index) => (
          <li key={index} className="list-none">
            <ResumeBar
              date={cc.date}
              title={cc.title}
              body={cc.body}
              incHref={cc.incHref}
              isLast={index === CareerContents.length - 1}
              isPreset={cc.isPresent}
              isFirst={index === 0}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
