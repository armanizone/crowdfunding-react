import React from 'react'
import { Button, Select, Textarea, TextInput } from '@mantine/core'
import { Heading } from '../../../components'
import { cities } from '../../../utils/db'
import useAuth from '../../../hooks/useAuth'

export const styles = {
  label: 'text-slate-400 uppercase text-xs'
}

function UserData() {

  const {user} = useAuth()

  return (
    <div className='w-full h-full relative'>
      <Heading title='Настройки' description='Ваши настройки' />
      <div className='mt-4'>
        <div className='grid grid-cols-3 gap-4 max-w-2xl'>
          <TextInput
            label='Имя'
            placeholder='Имя'
            classNames={{
              label: styles.label
            }}
          />
          <TextInput
            label='Контактный телефон'
            placeholder='Телефон'
            classNames={{
              label: styles.label
            }}
          />
          <Select
            data={cities}
            label='Город'
            placeholder='Город'
            clearable
            searchable
            classNames={{
              label: styles.label
            }}
          />
          <TextInput
            label='Сайт'
            placeholder='Адрес вашего сайт'
            classNames={{
              label: styles.label
            }}
          />
          <TextInput
            label='Instagram'
            classNames={{
              label: styles.label
            }}
          />
          <TextInput
            label='Telegram'
            classNames={{
              label: styles.label
            }}
          />

        </div>
        <div className='flex gap-x-4 max-w-2xl mt-4'>
          <div className='w-32'>
            <div className={`${styles.label} font-semibold leading-4 mb-0.5`}>Фотография</div>
            <img
              src={user?.photoURL ?? 'https://s7.planeta.ru/p?url=https%3A%2F%2Fstatic.planeta.ru%2Fimages%2Favatars%2Fava-u-03.jpg&width=150&height=150&crop=true&pad=false&disableAnimatedGif=true'}
              alt=""
              className='h-32'
            />
            <div className='flex'>
              <Button compact size='xs' variant='subtle'>Изменить</Button>
              <Button compact size='xs' variant='subtle'>Удалить</Button>
            </div>
          </div>
          <Textarea
            label='О себе'
            placeholder='Расскажите немного о себе'
            className='-mt-2 w-auto flex-1'
            classNames={{
              label: styles.label,
              input: 'h-32'
            }}
          />
        </div>
        <div className='flex justify-end mt-4 max-w-2xl'>
          <Button
            size='md'
          >
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserData