import React from 'react'
import { Button, LoadingOverlay, Select, Textarea, TextInput } from '@mantine/core'
import { EditProjectProps, styles } from '../../../pages/project/edit'
import { cities } from '../../../utils/db'

import { CreateLabel, CreateButtons, Card, FileInput} from '../../../components'
import ProjectService from '../../../service/ProjectService'
import { getImage, uploadImage } from '../../../service/StorageService'

function Main({project, id}: EditProjectProps) {

  const [proj, setProj] = React.useState(project)
  
  React.useEffect(() => {
    setProj(project)
  }, [project])

  const [image, setImage] = React.useState<File | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return 
    setImage(e?.target?.files[0])
    setProj({ ...proj, image: URL.createObjectURL(e?.target?.files[0])})
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name?: any, val?: string | null) => {
    if (e.target) {
      const { name, value } = e.target
      if (parseInt(value)) return setProj({...proj, [name]: parseInt(value) })
      setProj({ ...proj, [name]: value})
      return
    } 
    setProj({...proj, [name]: val})
  }

  const[loading, setLoading] = React.useState({
    save: false,
  })

  const handleLoading = (name: string, value: boolean) => {
    setLoading({ ...loading, [name]: value })
  }

  const updateProject = async () => {
    handleLoading('save', true)
    if (image) {
      await uploadImage(`projects/${id}/main-img`, image)
      .then(() => {
        getImage(`projects/${id}/main-img`)
        .then(async e => {
          await ProjectService.updateProject(id as string, {
            ...proj,
            image: e
          })
        })
        .finally(() => handleLoading('save', false))
      })
      return
    } 
    await ProjectService.updateProject(id as string, {
      ...proj,
    })
    .finally(() => handleLoading('save', false))
  }

  return (
    <div>
      <div className={styles.row}>
        <div className='wrapper'>
          <LoadingOverlay visible={loading.save} />
          <CreateLabel 
            label='Название проекта' 
            tooltip='Заголовок который будет представлять ваш проект (обязательное поле)'
          >
            <TextInput
              value={proj?.title ?? ''}
              onChange={handleInput}
              classNames={{
                error: styles.error,
              }}
              py={6}
              px={16}
              size='md'
              placeholder="Не более 50 символов"
              type="text"
              name="title"
              required
              variant="unstyled"
              maxLength={50}
            />
            <div className={styles.restInfo}>
              Осталось {50 - (proj?.title?.length! ?? 0)} символов
            </div>
          </CreateLabel>
          <CreateLabel 
            label='Изображение проекта' 
            tooltip='Рекомендуемое изображение (16:9)'
          >
            <div className='p-4 flex gap-4'>
              {proj?.image && (
                <img 
                  src={proj?.image ?? project?.image} 
                  alt="" 
                  className='w-40 object-contain'
                />
              )}
              <div className='flex flex-col items-start gap-4'>
                {!proj?.image && (
                  <FileInput
                    label='Загрузить изображение'
                    buttonProps={{
                      compact: true,
                      variant: 'light',
                    }}
                    accept='image/*'
                    name='image'
                    onChange={handleImage}
                  />
                )}
                {proj?.image && (
                  <Button 
                    compact
                    color={'red'}
                    variant='subtle'
                    classNames={{
                      label: 'text-sm underline'
                    }}
                    onClick={() => {
                      setImage(null)
                      setProj({...proj, image: null})
                    }}
                  >
                    Удалить
                  </Button>
                )}
              </div>
            </div>
          </CreateLabel>
          <CreateLabel
            label='Коротко о проекте' 
            tooltip='Вкратце опишите что представляет ваш проект (обязательное поле)'  
          >
            <Textarea
              name='description'
              value={proj?.description ?? ''}
              onChange={handleInput}
              placeholder='Коротко о проекте'
              required
              py={6}
              px={16}
              variant='unstyled'
              classNames={{
                input: `${styles.textarea} h-32`
              }}
              maxLength={180}
            />
            <div className={styles.restInfo}>
              Осталось {180 - (proj?.description?.length! ?? 0)} символов
            </div>
          </CreateLabel>
          <CreateLabel 
            label='Город проекта' 
            tooltip='Укажите город реализации проекта'
          >
            <Select
              searchable
              clearable
              placeholder='Введите город'
              name="city"
              value={proj?.city}
              onChange={(e) => setProj({...proj, city: e})}
              data={cities}
              py={6}
              px={16}
              variant='unstyled'
              classNames={{
                item: 'text-sm'
              }}
            // disabled={posted}
            />
          </CreateLabel>
          <CreateLabel 
            label='Сумма сбора' 
            tooltip='Сумма которую необходимо достичь за время длительности проекта (обязательное поле)'
          >
            <TextInput
              placeholder='100 000'
              type='number'
              name="goal"
              value={proj?.goal ?? ''}
              onChange={handleInput}
              py={6}
              px={16}
              required
              variant='unstyled'
            // disabled={posted}
            />
          </CreateLabel>
          <CreateLabel 
            label='Длительность проекта'
            tooltip='Длительность указана в днях (в среднем проекты длятся 30 дней, минимум 10, максимум 90 дней)'
            className='border-b'
          >
            <TextInput
              placeholder='Количество дней после запуска проекта'
              name="duration"
              value={proj?.duration ?? ''}
              onChange={handleInput}
              py={6}
              px={16}
              required
              variant="unstyled"
            // disabled={posted}
            />
          </CreateLabel>
        </div>
        <div className='wrapper'>
          <Card 
            project={proj}
          />
        </div>
      </div>
      <CreateButtons 
        loading={loading.save} 
        forward='/edit/details' 
        callback={updateProject}
      />
    </div>
  )
}

export default Main