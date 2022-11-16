import React from 'react'
import { Button, Checkbox, LoadingOverlay, Overlay, Textarea, TextInput } from '@mantine/core'
import { CreateLabel, FileInput } from '../../../../components'
import useAuth from '../../../../hooks/useAuth'
import { randomId } from '@mantine/hooks'
import { useParams } from 'react-router-dom'
import { getImage, uploadImage } from '../../../../service/StorageService'
import RewardService from '../../../../service/RewardService'
import { rewardSchema } from '../../../../utils/validation'
import { showNotification } from '@mantine/notifications'
import { increment } from 'firebase/firestore'
import ProjectService from '../../../../service/ProjectService'

import { EditProjectContext, styles } from '../../../../pages/project/edit'
import { DatePicker } from '@mantine/dates'

import 'dayjs/locale/ru';

function CreateReward({handleReward, handleRewardLoading}: any) {

  const { id } = useParams()

  const { user } = useAuth()

  const {rewards, project} = React.useContext(EditProjectContext)

  const [image, setImage] = React.useState<File | null>(null)

  const [loading, setLoading] = React.useState(false)

  const handleLoading = (val: boolean) => {
    setLoading(val)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return
    setImage(e?.target?.files[0])
    setReward({ ...reward, image: URL.createObjectURL(e?.target?.files[0]) })
    handleReward('image', URL.createObjectURL(e?.target?.files[0]) )
  }

  const [reward, setReward] = React.useState({
    title: '',
    description: '',
    how_to_get: '',
    image: '',
    cost: 0,
    count: 0,
    bought: 0,
    sending: new Date(),
  })

  const [errors, setErrors] = React.useState<any>({
    title: [],
    description: [],
    how_to_get: [],
    image: [],
    cost: [],
    count: [],
    bought: [],
  })

  const [infinite, setInfinite] = React.useState(false)

  const handleInfinite = () => {
    setInfinite(q => !q)
    setErrors({ ...errors, count: [] })
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name?: any, val?: string) => {
    if (e.target) {
      const { name, value } = e.target
      if (parseInt(value) && (name === 'cost' || name === 'count')) {
        setReward({ ...reward, [name]: parseInt(value) })
        handleReward(name, parseInt(value))
        return
      } 
      setReward({ ...reward, [name]: value })
      setErrors({ ...errors, [name]: [] })
      handleReward(name, value)
      return
    }
    setReward({ ...reward, [name]: val })
    setErrors({ ...errors, [name]: [] })
    handleReward(name, val)
  }

  const rewardId = `${id}-${randomId().slice(8)}`

  const yupErrorToErrorObject = (err: any) => {
    const object: any[] = [];
    err.inner.forEach((x: any) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors(object);
  }


  const createReward = async () => {
    handleLoading(true)
    handleRewardLoading(true)
    await rewardSchema.validate({
      ...reward
    }, { abortEarly: false })
      .then(async () => {
        if (image) {
          const url = `/rewards/${rewardId}/main-img`
          await uploadImage(url, image!)
            .then(() => {
              getImage(url)
                .then(async e => {
                  RewardService.createReward(rewardId as string, {
                    ...reward,
                    uid: project?.uid,
                    project_id: id,
                    image: e,
                    id: rewardId,
                  })
                    .then(async e => {
                      setReward({
                        title: '',
                        description: '',
                        how_to_get: '',
                        image: '',
                        cost: 0,
                        count: 0,
                        bought: 0,
                        sending: new Date(),
                      })

                      await ProjectService.updateProject(id as string, {
                        rewards: increment(1),
                        user: {
                          displayName: user?.displayName,
                          photoURL: user?.photoURL,
                        },
                      })
                      showNotification({
                        title: 'Вознаграждение',
                        message: 'Вознаграждение успешно создано!',
                        color: 'green',
                        autoClose: 3000
                      })
                    })
                })
            })
            .finally(() => {
              handleLoading(false)
              handleRewardLoading(false)
            })
          return
        }
        RewardService.createReward(rewardId as string, {
          ...reward,
          uid: project?.uid,
          project_id: id,
          image: null,
          id: rewardId,
        })
          .then(async e => {
            setReward({
              title: '',
              description: '',
              how_to_get: '',
              image: '',
              cost: 0,
              count: 0,
              bought: 0,
              sending: new Date(),
            })
            await ProjectService.updateProject(id as string, {
              rewards: rewards?.length! + 1 ?? 0,
            })
            showNotification({
              title: 'Вознаграждение',
              message: 'Вознаграждение успешно создано!',
              color: 'green',
              autoClose: 3000
            })
          })
          .finally(() => {
            handleLoading(false)
            handleRewardLoading(false)
          })
        handleLoading(false)
        handleRewardLoading(false)
      })
      .catch((err) => {
        yupErrorToErrorObject(err)
        handleLoading(false)
        handleRewardLoading(false)
      })
  }

  return (
    <div className='wrapper'>
      <LoadingOverlay visible={loading} />
      <div className='mb-4'>
        <h2 className='text-lg md:text-xl mb-2'>Добавьте вознаграждения в проект</h2>
        <p>Определяясь с типом вознаграждений, отталкивайтесь от того, что было бы приятно получить лично вам. Кроме того, среди
          бонусов должен быть и сам результат проекта - то, на что собираются денежные средства. И помните:
          большинство людей поддерживают проекты именно из желания получить интересные бонусы.</p>
      </div>
      <CreateLabel label='Название вознаграждения'>
        <TextInput
          value={reward.title}
          onChange={handleInput}
          name="title"
          classNames={{
            error: styles.error,
          }}
          py={6}
          px={16}
          size='md'
          placeholder="Не более 50 символов"
          required
          variant="unstyled"
          maxLength={70}
          error={errors.title?.[0]}
        />
        <div className={styles.restInfo}>
          Осталось {70 - (reward?.title?.length! ?? 0)} символов
        </div>
      </CreateLabel>
      <CreateLabel label='Картинка'>
        <div className='p-4'>
          <FileInput
            label='Загрузить изображение'
            onChange={handleImage}
            accept='image/*'
            name="image"
            buttonProps={{
              variant: 'light',
              compact: true,
            }}
          />
        </div>
      </CreateLabel>
      <CreateLabel label='Описание вознаграждения'>
        <Textarea
          value={reward.description}
          onChange={handleInput}
          name='description'
          style={{ border: 'none' }}
          classNames={{
            input: 'h-48'
          }}
          size='md'
          placeholder='Описание вознаграждение'
          required
          variant='unstyled'
          py={6}
          px={16}
          maxLength={500}
          error={errors.description?.[0]}
        />
        <div className={styles.restInfo}>
          Осталось {500 - (reward?.description.length! ?? 0)} символов
        </div>
      </CreateLabel>
      <CreateLabel label='Способы получения'>
        <Textarea
          classNames={{
            error: styles.error,
            input: 'h-24'
          }}
          value={reward.how_to_get}
          onChange={handleInput}
          name='how_to_get'
          py={6}
          px={16}
          size='md'
          placeholder='Как получить вашего вознаграждение'
          required
          variant='unstyled'
          maxLength={240}
        />
        <div className={styles.restInfo}>
          Осталось {240 - (reward?.how_to_get.length! ?? 0)} символов
        </div>
      </CreateLabel>
      <CreateLabel label='Цена вознаграждения'>
        <TextInput
          value={reward.cost}
          onChange={handleInput}
          name='cost'
          classNames={{
            error: styles.error,
          }}
          py={6}
          px={16}
          size='md'
          placeholder=""
          required
          variant="unstyled"
          error={errors.cost?.[0]}
        />
      </CreateLabel>
      <CreateLabel label='Количество'>
        <div className='flex justify-between'>
          <div className='relative flex-1'>
            <TextInput
              value={reward.count}
              onChange={handleInput}
              name='count'
              classNames={{
                error: styles.error,
              }}
              py={6}
              px={16}
              size='md'
              placeholder="Не более 50 символов"
              required
              variant="unstyled"
              error={errors.count?.[0]}
            />
            {infinite && (
              <Overlay />
            )}
          </div>
          <Checkbox
            py={6}
            px={16}
            label='Не ограничено'
            classNames={{ label: 'font-semibold' }}
            className='flex-1 border-l border-slate-200'
            onChange={handleInfinite}
          />
        </div>
      </CreateLabel>
      <CreateLabel label='Примерная дата доставки'
        className='border-b'
      >
        <DatePicker
          value={reward.sending}
          onChange={(e) => setReward({ ...reward, sending: e! })}
          name='sending'
          classNames={{
            error: styles.error,
          }}
          py={6}
          px={16}
          size='md'
          placeholder="Не более 50 символов"
          required
          variant="unstyled"
          locale="ru"
        />
      </CreateLabel>
      <div className='flex justify-center mt-4'>
        <Button
          size='md'
          onClick={createReward}
        >
          Добавить вознаграждение
        </Button>
      </div>
    </div>
  )
}

export default CreateReward