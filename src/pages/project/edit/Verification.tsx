import React from 'react'
import { TextInput } from '@mantine/core'
import { EditProjectProps, styles } from '../../../pages/project/edit'
import { CreateButtons, CreateLabel } from '../../../components'

function Verification({project}: EditProjectProps) {

  

  return (
    <div>
      <div className={styles.bgWrapper}>
        <CreateLabel label='Контрагент'>
          <TextInput
            classNames={{
              error: styles.error,
            }}
            py={6}
            px={16}
            size='md'
            placeholder="Инициалы"
            type="text"
            name="title"
            required
            variant="unstyled"
          />
        </CreateLabel>
        <CreateLabel label='Номер' className='border-b'>
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
      </div>
      <CreateButtons back='/edit/rewards' />
    </div>
  )
}

export default Verification 