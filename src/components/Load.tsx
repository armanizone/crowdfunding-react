import React from 'react'
import { Loader } from '@mantine/core'

function Load() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Loader size='lg' />
    </div>
  )
}

export default Load