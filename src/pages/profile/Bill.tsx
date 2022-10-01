import { Button } from '@mantine/core'
import React from 'react'
import { Heading } from '../../components'

function Bill() {
  return (
    <div className='w-full h-full bg-white mt-6 border'>
      <div className='flex'>
        <div className='border-r-2 w-[76px]'>
        </div>
        <div className='w-full p-6'>
          <Heading title='Баланс' description='Ваши транзакции' />
          <div className='flex w-full justify-between mt-4'>
            <div className='text-2xl font-bold'>
              0 T
            </div>
            <div>
              <Button>Пополнить баланс</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bill