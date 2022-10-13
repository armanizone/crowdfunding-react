import React from 'react'
import Project from '../pages/project'
import { Button, Modal } from '@mantine/core'
import { EditProjectContext } from '../pages/project/edit'

import cn from 'classnames'

import { BsEye } from 'react-icons/bs'
interface CreateButtonsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  back?: string,
  forward?: string,
  incubator?: boolean,
  callback?: () => void,
  projectId?: string 
  loading?: boolean,
  toModeration?: () => void
}

function CreateButtons({ back, forward, callback, toModeration, incubator, loading, projectId, className, ...props}: CreateButtonsProps) {

  const { handleTabChange } = React.useContext(EditProjectContext)

  const [opened, setOpened] = React.useState(false)

  return (
    <>
      <div className={cn(className, `wrapper flex flex-wrap items-center justify-between gap-4 mt-4`)} {...props}>
        {back && (
          <Button
            size='sm'
            onClick={() => handleTabChange(back)}
            variant='light'
            fullWidth
          >
            Назад
          </Button>
        )}
        <div className='w-full flex flex-wrap-reverse gap-4 justify-center gap-x-4 order-first'>
          <Button
            variant='subtle'
            leftIcon={<BsEye />}
            size='sm'
            onClick={() => setOpened(true)}
          >
            Предпросмотр
          </Button>
          <Button
            size='sm'
            variant='filled'
            onClick={callback}
            loading={loading}
            fullWidth
          >
            Сохранить
          </Button>
        </div>
        {forward ?
          <Button
            size='sm'
            onClick={() => handleTabChange(forward)}
            variant='light'
            fullWidth
            >
            Продолжить
          </Button>
          :
          incubator ? 
            <Button
              size='sm'
              disabled
            >
              Бизнес-инкубатор
            </Button>
          :
            <Button
              size='sm'
              onClick={toModeration}
            >
              Отправить на модерацию
            </Button>
        }
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overflow='inside'
        fullScreen
        padding={0}
        classNames={{
          header: 'mr-2 p-4 mb-0',
        }}
      >
        <Project projectId={projectId} />
      </Modal>
    </>
  )
}

export default CreateButtons