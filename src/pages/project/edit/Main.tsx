import React from 'react'
import { Button, LoadingOverlay, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { EditProjectContext, styles } from '../../../pages/project/edit'
import { cities } from '../../../utils/db'

import { CreateLabel, CreateButtons, Card, FileInput } from '../../../components'
import ProjectService from '../../../service/ProjectService'
import { uploadAndGetImage } from '../../../service/StorageService'
import Compressor from 'compressorjs'
import useAuth from '../../../hooks/useAuth'
import { projectSchema } from '../../../utils/validation'
import { useDebouncedState } from '@mantine/hooks'

function Main() {

  const { user } = useAuth()

  const {project, id} = React.useContext(EditProjectContext)

  const [proj, setProj] = React.useState(project)
  const [previewProj, setPreviewProj] = useDebouncedState(project, 800)

  React.useEffect(() => {
    setProj(project)
  }, [project])

  React.useEffect(() => {
    setPreviewProj(proj)
    // eslint-disable-next-line
  }, [proj])

  const [image, setImage] = React.useState<File | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return
    setImage(e?.target?.files[0])
    setProj({ ...proj, image: URL.createObjectURL(e?.target?.files[0]) })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null, name?: any, val?: any) => {
    if (e?.target) {
      const { name, value } = e.target
      setErrors({ ...errors, [name]: [] })
      if (parseInt(value)) return setProj({ ...proj, [name]: parseInt(value) })
      setProj({ ...proj, [name]: value })
      return
    }
    setProj({ ...proj, [name]: val })
    setErrors({ ...errors, [name]: [] })
  }

  const [loading, setLoading] = React.useState({
    save: false,
  })

  const handleLoading = (name: string, value: boolean) => {
    setLoading({ ...loading, [name]: value })
  }


  const yupErrorToErrorObject = (err: any) => {
    const object: any[] = [];
    err.inner.forEach((x: any) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors(object);
  }

  const [errors, setErrors] = React.useState<any>({
    title: [],
    description: [],
    image: [],
    city: [],
    goal: [],
    duration: []
  })

  const updateProject = async () => {
    handleLoading('save', true)
    await projectSchema.validate({
      ...proj
    }, { abortEarly: false })
      .then(async () => {
        if (image) {
          new Compressor(image, {
            quality: 0.6,
            async success(file) {
              await uploadAndGetImage(`projects/${id}/main-img`, file)
              .then(async (e) => {
                await ProjectService.updateProject(id as string, {
                  ...proj,
                  image: e,
                  user: {
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                    email: user?.email
                  },
                })
                .finally(() => handleLoading('save', false))
              })
            },
          })
          return
        }
        await ProjectService.updateProject(id as string, {
          ...proj,
          user: {
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            uid: user?.uid,
            email: user?.email
          },
        })
          .finally(() => handleLoading('save', false))
        handleLoading('save', false)
        
      })
      .catch((err) => {
        yupErrorToErrorObject(err)
        handleLoading('save', false)

      })
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
              error={errors.title?.[0]}
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
                      setProj({ ...proj, image: null })
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
              error={errors.description?.[0]}
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
              onChange={(e) => setProj({ ...proj, city: e })}
              data={cities}
              py={6}
              px={16}
              variant='unstyled'
              classNames={{
                item: 'text-sm'
              }}
              error={errors.city?.[0]}
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
              error={errors.goal?.[0]}
            // disabled={posted}
            />
          </CreateLabel>
          <CreateLabel
            label='Длительность проекта'
            tooltip='Длительность указана в днях (минимум 15, максимум 120 дней)'
            className='border-b'
          >
            <NumberInput
              placeholder='Количество дней после запуска проекта'
              name="duration"
              value={proj?.duration ?? 15}
              onChange={(e) => handleInput(null, 'duration', e)}
              py={6}
              px={16}
              required
              variant="unstyled"
              error={errors.duration?.[0]}
              hideControls
            // disabled={posted}
            />
          </CreateLabel>
        </div>
        <div className='wrapper'>
          <Card
            project={previewProj}
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