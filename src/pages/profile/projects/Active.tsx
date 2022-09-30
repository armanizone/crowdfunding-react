import React from 'react'
import { Heading, Pillar } from '../../../components'

function Active({values = []}: any) {

  console.log(values, 'active');

  return (
    <div className='w-full h-full relative'>
      <Heading title='Активные проекты' description='Ваши запушенные проекты' />
      <div className='flex flex-col gap-y-4 mt-4'>
        {values?.map((item: any) => { 
          return (
            <Pillar project={item} type='active' /> 
          )
        })}
      </div>
    </div>
  )
}

export default Active