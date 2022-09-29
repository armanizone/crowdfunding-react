import React from 'react'
import { Heading } from '../../../components'

function Closed({values = []}: any) {

  console.log(values, 'closed');

  return (
    <div className='w-full h-full relative'>
      <Heading title='Завершенные проекты' description='Ваши завершенные проекты' />
    </div>
  )
}

export default Closed