import React from 'react'
import { TextInput } from '@mantine/core'
import { styles } from '../../../pages/project/edit'
import { CreateButtons, CreateLabel, FileInput } from '../../../components'
// import { useParams } from 'react-router-dom'

function Verification() {

  // const { id } = useParams()

  const [verification, setVerification] = React.useState({
    name: '',
    phone: '',
    iin: '',
    front: null,
    back: null,
  })

  const handleInput = (e: any) => {
    const {name, value} = e.target
    setVerification({...verification, [name]: value})
  }

  const handleFiles = (e: any) => {
    
  }

  const toModeration = () => {

  }

  return (
    <div>
      <div className='wrapper'>
        <div className='mb-4'>
          <p>Нам нужно верифицировать лицо, которое будет выступать организатором проекта.</p>
        </div>
        <CreateLabel label='Автор проекта'>
          <TextInput
            classNames={{
              error: styles.error,
            }}
            py={6}
            px={16}
            size='md'
            placeholder='Инициалы автора'
            required
            variant="unstyled"
            value={verification.name}
            onChange={handleInput}
            name='name'
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
            required
            variant="unstyled"
            value={verification.phone}
            onChange={handleInput}
            name='phone'
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
            required
            variant="unstyled"
            value={verification.iin}
            onChange={handleInput}
            name='iin'
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
              inputProps={{
              }}
              name='front'
            />
            <FileInput 
              label='Обратная сторона'
              buttonProps={{
                compact: true, 
                variant: 'outline',
              }}
              inputProps={{
              }}
              name='back'
            />
          </div>
        </CreateLabel>
      </div>
      <CreateButtons 
        back='/edit/rewards'
        toModeration={toModeration}
       />
    </div>
  )
}

export default Verification 