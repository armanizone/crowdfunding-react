import { Button } from '@mantine/core'
import React from 'react'
import { IReward } from '../interfaces/reward.interface'
interface RewardProps {
  reward: IReward,
}

function Reward({reward}: RewardProps): JSX.Element {

  return (
    <div className='p-4 rounded-md border relative overflow-hidden min-w-[260px] max-w-[260px] md:min-w-[340px] md:max-w-[340px] bg-white'>
      <div className='relative overflow-hidden rounded-md'>
        {reward.image && (
          <img
            src={reward.image}
            alt={reward.image}
            className='aspect-video object-fill z-50'
          />
        )}
        <div className='absolute aspect-video top-0 left-0 bottom-0 right-0 -z-10 bg-white border-b border-slate-200'></div>
      </div>
      <div className='flex flex-col mt-4 gap-y-4'>
        <h2 className='text-base font-semibold'>{reward?.title}</h2>
        <div className='text-slate-500 text-[15px]'>
          {reward?.how_to_get}
        </div>
        <div className='flex justify-between'>
          <div>
            {reward.cost} цена
          </div>
          <div>
            {reward.count} количество
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Button fullWidth className='tracking-widest uppercase'>
          Приобрести
        </Button>
      </div>
    </div>
  )
}

export default Reward