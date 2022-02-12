import React from 'react'
import { ChevronRight } from 'react-feather'
import Tag from '@components/uiParts/Tag'
import { SkillContents } from '@components/constant/SkillContent'

export const Skill: React.VFC = () => {
  return (
    <div className="p-4 rounded-3xl">
      <h1 className="mb-4 text-4xl dark:text-white font-bold tracking-widest ml-4 flex">
        <div className="mr-2 flex items-center">
          <ChevronRight />
        </div>
        Skill
      </h1>
      <ul className="mb-6 flex flex-wrap px-7 list-none">
        {SkillContents.map((s, i) => (
          <li key={i} className="list-none my-2">
            <Tag text={s.name} url={s.href} />
          </li>
        ))}
      </ul>
    </div>
  )
}
