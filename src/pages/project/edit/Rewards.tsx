import React from 'react'

import { EditProjectProps, styles } from '../../../pages/project/edit'
import { CreateLabel, Reward, CreateButtons } from '../../../components'
import { Button, Checkbox, LoadingOverlay, Overlay, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates';
import RewardService from '../../../service/RewardService'
import { getImage, uploadImage } from '../../../service/StorageService'


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


  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name?: any, val?: string | null) => {
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
        })
      })
      .finally(() => {
        handleLoading('create', false)
        // router.replace(router.asPath)
        }
      )
    }
  }

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.bgWrapper}>
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
            />
            <div className={styles.restInfo}>
              asdasd
            </div>
          </CreateLabel>
          <CreateLabel label='Картинка'>
            <div className="flex items-center relative overflow-hidden">
              <input
                type="file"
                accept="image/*"
                name="image"
                className={styles.fileInput}
                onChange={handleImage}
                required
              />
            </div>
          </CreateLabel>
          <CreateLabel label='Описание вознаграждения'>
            <TextInput
              value={reward.description}
              onChange={handleInput}
              name='description'
              style={{border: 'none'}}
              size='md'
              // placeholder="Не более 50 символов"
              required
              variant="unstyled"
              py={6}
              px={16}
            />
            <div className={styles.restInfo}>
              asdasd
            </div>
          </CreateLabel>
          <CreateLabel label='Способы получения'>
            <Textarea
              classNames={{
                error: styles.error,
                input: 'h-64'
              }}
              value={reward.how_to_get}
              onChange={handleInput}
              name='how_to_get'
              py={6}
              px={16}
              size='md'
              placeholder="Не более 50 символов"
              required
              variant="unstyled"
            />
            <div className={styles.restInfo}>
              asdasd
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
                {false && (
                  <Overlay />
                )}
              </div>
              <Checkbox
                py={6}
                px={16}
                label='Не ограничено'
                classNames={{label: 'font-semibold'}}
                className='flex-1 border-l border-slate-200'
              />
            </div>
          </CreateLabel>
          <CreateLabel 
            label='Примерная дата доставки'
            className='border-b'
          >
            <DatePicker
              // value={reward.sending}
              // onChange={handleInput}
              // name='sending'
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
        <div className={styles.bgWrapper}>
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
              return <Reward reward={item} key={i}/>
            })}
          </div>
        </div>
      </div>
      <CreateButtons back='/edit/details' forward='/edit/verification' />
    </div>
  ) 
}

export default Rewards 