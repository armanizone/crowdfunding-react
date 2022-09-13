import React from 'react'
import { Button } from '@mantine/core'
import { BsEye } from 'react-icons/bs'
import { EditProjectContext, styles } from '../pages/project/edit'
interface CreateButtonsProps {
  back?: string,
  forward?: string,
  incubator?: boolean,
  callback?: () => void
}

function CreateButtons({ back, forward, callback, incubator}: CreateButtonsProps) {

  const { handleTabChange } = React.useContext(EditProjectContext)

  return (
    <div className={`${styles.bgWrapper} flex items-center mt-4`}>
      {back && (
        <Button
          size='md'
          onClick={() => handleTabChange(back)}
        >
          Назад
        </Button>
      )}
      <div className='w-full flex justify-center gap-x-4'>
        <Button
          variant='subtle'
          leftIcon={<BsEye />}
          size='md'
        >
          Предпросмотр
        </Button>
        <Button
          size='md'
          variant='light'
          onClick={callback}
        >
          Сохранить
        </Button>
      </div>
      {forward 
        ?
          <Button
            size='md'
            onClick={() => handleTabChange(forward)}
          >
            Продолжить
          </Button>
        :
          incubator 
            ? 
              <Button
                size='md'
                disabled
              >
                Бизнес-инкубатор
              </Button>
            :
              <Button
                size='md'
              >
                Отправить на модерацию
              </Button>
          
      }
    </div>
  )
}

export default CreateButtons