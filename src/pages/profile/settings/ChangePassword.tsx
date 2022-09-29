import { Button, TextInput } from '@mantine/core'
import React from 'react'
import { Heading } from '../../../components'
import { styles } from './UserData'

function ChangePassword() {
  return (
    <div className='w-full h-full relative'>
      <Heading title='Изменение пароля' description='Введите данные для изменения пароля' />
      <div className='mt-4 max-w-2xl'>
        <TextInput
          label='Старый пароль'
          classNames={{
            label: styles.label
          }}
        />
        <TextInput
          label='Новый пароль'
          classNames={{
            label: styles.label
          }}
        />
        <TextInput
          label='Повторите пароль'
          classNames={{
            label: styles.label
          }}
        />
      </div>
      <div className='flex justify-end max-w-2xl mt-4'>
        <Button 
          size='md'
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ChangePassword