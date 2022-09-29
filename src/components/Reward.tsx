import React from 'react'
import cn from 'classnames'
import { Button } from '@mantine/core'
import { IReward } from '../interfaces/reward.interface'
import dayjs from 'dayjs'
interface RewardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reward: IReward,
}

function Reward({reward, className, ...props}: RewardProps): JSX.Element {

  const sending = dayjs(new Date()).locale('ru').format('DD/MM/YYYY')
  
  return (
    <div 
      className={cn(className, 'p-4 rounded-md border relative bg-white overflow-hidden')}
      {...props}
    >
      <div className='relative overflow-hidden'>
        {reward.image ? (
          <img
            src={reward.image}
            alt={reward.image}
            className='aspect-video object-fill z-50'
          />
        ) : <div className='aspect-video object-cover z-50 bg-slate-200 border-b border-slate-200'></div>}
      </div>
      <div className='flex flex-col mt-4 gap-y-4'>
        <h2 className='text-base font-semibold'>{reward?.title}</h2>
        <p>{reward?.description}</p>
        <div className='text-slate-500 text-[15px]'>
          {reward?.how_to_get}
        </div>
        <div>
          <p>Примерная дата доставки</p>
          <p>{sending}</p>
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