import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { Heading, Pillar } from '../../../components'

function Draft({values = []}: any) {

  const { user } = useAuth()

  return (
    <div className='w-full h-full relative'>
      <Heading title='Черновики' description='Черновики ваших проектов' />
      <div className='flex flex-col gap-y-8 mt-4'>
        {values?.map((project: any) => {
          return (
            <Pillar project={project} type='draft' />
          )
        })}
      </div>
    </div>
  )
}

export default Draft