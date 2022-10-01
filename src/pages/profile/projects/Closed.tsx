import React from 'react'
import { Heading, Load, Pillar } from '../../../components'

function Closed({values = [], loading}: any) {

  if (loading) return <Load />

  return (
    <div className='w-full h-full relative'>
      <Heading title='Завершенные проекты' description='Ваши завершенные проекты' />
      <div className='flex flex-col gap-y-4 mt-4'>
        {values?.map((item: any) => {
          return (
            <Pillar project={item} type='closed' key={item.id} />
          )
        })}
      </div>
    </div>
  )
}

export default Closed