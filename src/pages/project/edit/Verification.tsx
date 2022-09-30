import React from 'react'
import { TextInput } from '@mantine/core'
import { EditProjectProps, styles } from '../../../pages/project/edit'
import { CreateButtons, CreateLabel, FileInput } from '../../../components'

function Verification({project, id}: EditProjectProps) {

  const toModaration = () => {
    console.log('sended');
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='mb-4'>
          <p>Нам нужно верифицировать лицо, которое будет выступать организатором проекта.</p>
        </div>
        <CreateLabel label='Контрагент'>
          <TextInput
            classNames={{
              error: styles.error,
            }}
            py={6}
            px={16}
            size='md'
            placeholder='Инициалы автора'
            type="text"
            name="title"
            required
            variant="unstyled"
          />
        </CreateLabel>
        <CreateLabel label='Номер'>
          <TextInput
            classNames={{
              error: styles.error,
            }}
            py={6}
            px={16}
            size='md'
            placeholder="Введите номер"
            type="text"
            name="title"
            required
            variant="unstyled"
          />
        </CreateLabel>
        <CreateLabel label='ИИН' >
          <TextInput
            classNames={{
              error: styles.error,
            }}
            py={6}
            px={16}
            size='md'
            placeholder="Введите номер"
            type="text"
            name="title"
            required
            variant="unstyled"
          />
        </CreateLabel>
        <CreateLabel label='Удостоверение личности' className='border-b'>
          <div className='flex gap-x-4 items-center p-4'>
            <FileInput 
              label='Лицевая сторона'
              buttonProps={{
                compact: true, 
                variant: 'outline',
              }}
            />
            <FileInput 
              label='Обратная сторона'
              buttonProps={{
                compact: true, 
                variant: 'outline',
              }}
            />
          </div>
        </CreateLabel>
      </div>
      <CreateButtons back='/edit/rewards' />
    </div>
  )
}

export default Verification 