import React from 'react'
import { Reward } from '../../components'

function ProjectFee({rewards}: any) {
  return (
    <div className="relative">
      <div className="text-base md:text-lg mb-5 font-head border-b border-slate-300 pb-2">
        <span>Вознаграждения</span>
      </div>
      <div className="flex flex-col gap-y-8">
        {rewards?.map((item: any, index: number) => {
          return (
            <Reward
              key={index}
              reward={item}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProjectFee