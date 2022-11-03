import React from 'react'
import { Button } from '@mantine/core'
import { EditProjectContext } from '../pages/project/edit'

import cn from 'classnames'

import { BsEye } from 'react-icons/bs'
import PreviewProjectModal from './PreviewProjectModal'
interface CreateButtonsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  back?: string,
  forward?: string,
  incubator?: boolean,
  callback?: () => void,
  projectId?: string 
  loading?: boolean,
  toModeration?: () => void,
}

function CreateButtons({ back, forward, callback, toModeration, incubator, loading, projectId, className, ...props}: CreateButtonsProps) {

  const { handleTabChange, project } = React.useContext(EditProjectContext)

  const [preview, setPreview] = React.useState(false)

  return (
    <>
      <div className={cn(className, `wrapper flex items-center gap-4 mt-4`)} {...props}>
        {back && (
          <Button
            size='sm'
            onClick={() => handleTabChange(back)}
            variant='light'
          >
            Назад
          </Button>
        )}
        <div className='w-full flex gap-4 justify-center'>
          <Button
            variant='subtle'
            leftIcon={<BsEye />}
            size='sm'
            onClick={() => setPreview(true)}
          >
            Предпросмотр
          </Button>
          <Button
            size='sm'
            variant='filled'
            onClick={callback}
            loading={loading}
            
          >
            Сохранить
          </Button>
        </div>
        {forward ?
          <Button
            size='sm'
            onClick={() => handleTabChange(forward)}
            variant='light'
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
      <PreviewProjectModal preview={preview} setPreview={setPreview} project={project} />
    </>
  )
}

export default CreateButtons