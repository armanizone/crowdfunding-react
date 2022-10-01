import React from 'react'
import { Heading, Load, Pillar } from '../../../components'

function Draft({values = [], loading}: any) {

  if (loading) return <Load/>

  return (
    <div className='w-full h-full relative'>
      <Heading title='Черновики' description='Черновики ваших проектов' />
      <div className='flex flex-col gap-y-8 mt-4'>
        {values?.map((item: any) => {
          return (
            <Pillar project={item} type='draft' key={item.id} />
          )
        })}
      </div>
    </div>
  )
}

export default Draft