import React from 'react'

import { EditProjectProps, styles } from '../../../../pages/project/edit'
import { CreateLabel, Reward, CreateButtons, FileInput } from '../../../../components'
import { Button, Checkbox, LoadingOverlay, Modal, Overlay, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates';
import RewardService from '../../../../service/RewardService'
import { getImage, uploadImage } from '../../../../service/StorageService'
import EditReward from './EditReward';


function Rewards({project, id, rewards}: EditProjectProps) {
  
  const [image, setImage] = React.useState<File | null>(null)

  const [loading, setLoading] = React.useState({
    create: false,
  })

  const handleLoading = (name: string, value: boolean) => {
    setLoading({ ...loading, [name]: value })
  }
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return
    setImage(e?.target?.files[0])
    setReward({ ...reward, image: URL.createObjectURL(e?.target?.files[0]) })
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

  const [infinite, setInfinite] = React.useState(false)

  const handleInfinite = () => setInfinite(q => !q)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name?: any, val?: string) => {
    if (e.target) {
      const { name, value } = e.target
      if (parseInt(value)) return setReward({ ...reward, [name]: parseInt(value) })
      setReward({...reward, [name]: value })
      return
    }
    setReward({...reward, [name]: val })
  }

  const createReward = async () => {
    handleLoading('create', true)
    const rewardId = (new Date().getTime() / 1000).toString().split('.').join('')
    if (image) {
      await uploadImage(`/rewards/r-${rewardId}/main-img`, image!)
      .then(() => {
        getImage(`/rewards/r-${rewardId}/main-img`)
        .then(async e => {
          RewardService.createReward(id as string, {
            ...reward, 
            uid: project?.uid,
            project_id: id,
            image: e
          })
          .then(e => {
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
          })
        })
      })
      .finally(() => {
          handleLoading('create', false)
      })
      return
    }
    RewardService.createReward(id as string, {
      ...reward,
      uid: project?.uid,
      project_id: id,
      image: null
    })
    .then(e => {
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
    })
  }

  const [editReward, setEditReward] = React.useState<any>({
    title: '',
    description: '',
    how_to_get: '',
    image: '',
    cost: 0,
    count: 0,
    bought: 0,
    sending: new Date(),
  })

  const [editModal, setEditModal] = React.useState(false)

  const handleRewardEdit = (reward: any) => {
    setEditReward(reward)
    setEditModal(true)
  }

  return (
    <>
      <div>
        <div className={styles.row}>
          <div className='wrapper'>
            <LoadingOverlay visible={loading.create} />
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
                maxLength={120}
              />
              <div className={styles.restInfo}>
                Осталось {120 - (reward?.title?.length! ?? 0)} символов
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
                style={{border: 'none'}}
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
                placeholder="Не более 50 символов"
                required
                variant="unstyled"
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
                  />
                  {infinite && (
                    <Overlay />
                  )}
                </div>
                <Checkbox
                  py={6}
                  px={16}
                  label='Не ограничено'
                  classNames={{label: 'font-semibold'}}
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
                onChange={(e) => setReward({...reward, sending: e!})}
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
          <div className='wrapper'>
            <div className='p-4 border border-slate-200 mb-4'>
              <span className='inline-block mb-4 text-lg font-medium'>
                Поддержать на любую сумму
              </span> 
              <p>
                Спасибо, мне не нужно вознаграждение, я просто хочу поддержать проект.
              </p>
            </div>
            <div className='flex flex-col gap-y-4'>
              <Reward reward={reward}/>
              {rewards?.map((item, i) => {
                return (
                  <div className='relative group' key={i}>
                    <Reward reward={item} className=''/>
                    <div className='flex justify-end gap-x-4 border border-t-0 py-2 px-4 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                      <Button compact size='sm' variant='subtle' onClick={() => handleRewardEdit(item)}>
                        Редактировать
                      </Button>
                      <Button compact size='sm' variant='subtle' color='red'>
                        Удалить
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <CreateButtons 
          loading={loading.create} 
          back='/edit/details' 
          forward='/edit/verification' 
        />
      </div>
      {/* <EditReward 
        editReward={editReward} 
        editModal={editModal} 
        setEditModal={setEditModal} 
      /> */}
    </>
  ) 
}

export default Rewards 