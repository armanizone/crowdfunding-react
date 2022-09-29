import React from 'react'
import { Heading } from '../../../components'

function Active({values = []}: any) {

  console.log(values, 'active');

  return (
    <div className='w-full h-full relative'>
      <Heading title='Активные проекты' description='Ваши запушенные проекты' />
    </div>
  )
}

export default Active