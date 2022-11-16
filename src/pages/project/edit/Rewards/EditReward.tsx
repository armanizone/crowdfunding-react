import React from 'react'
import { Button, Checkbox, Modal, Overlay, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { CreateLabel, FileInput } from '../../../../components'
import { styles } from '../../../../pages/project/edit'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../utils/firebase'
import { getImage, uploadImage } from '../../../../service/StorageService'
import { useParams } from 'react-router-dom'

import 'dayjs/locale/ru';

function EditReward({editReward, editModal, setEditModal}: any) {

  const { id } = useParams()

  React.useEffect(() => {
    setReward(editReward)
  }, [editReward])

  const [reward, setReward] = React.useState<any>(editReward)

  const [loading, setLoading] = React.useState(false)

  const [infinite, setInfinite] = React.useState(false)

  const handleInfinite = () => setInfinite(q => !q)

  const [image, setImage] = React.useState<File | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return
    setImage(e?.target?.files[0])
    setReward({ ...reward, image: URL.createObjectURL(e?.target?.files[0]) })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name?: any, val?: string) => {
    if (e.target) {
      const { name, value } = e.target
      if (parseInt(value)) return setReward({ ...reward, [name]: parseInt(value) })
      setReward({ ...reward, [name]: value })
      return
    }
    setReward({ ...reward, [name]: val })
  }

  const updateReward = async () => {
    setLoading(true)
    if (image) {
      const url = `projects/${id}/main-img`
      await uploadImage(url, image)
      .then(() => {
        getImage(url)
        .then(async e => {
          await updateDoc(doc(db, 'rewards', reward.id), {
            ...reward,
            image: e,
            
          })
        })
      })
      .finally(() => {
        setLoading(false)
        setEditModal(false)
      })
      return
    }
    await updateDoc(doc(db, 'rewards', reward.id), {
      ...reward
    }) 
    .finally(() => {
      setLoading(false)
      setEditModal(false)
    })
  }

  return (
    <Modal
      title='Редактирование вознаграждения'
      opened={editModal}
      onClose={() => setEditModal(false)}
      centered
      size='xl'
    >
      <CreateLabel label='Название вознаграждения'>
        <TextInput
          value={reward?.title}
          onChange={handleInputChange}
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
        <div className='p-4 flex gap-4'>
          {reward?.image && (
            <img
              src={reward?.image}
              alt=""
              className='w-40 object-contain'
            />
          )}
          <div className='flex flex-col items-start gap-4'>
            {!reward?.image && (
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
            {reward?.image && (
              <Button
                compact
                color={'red'}
                variant='subtle'
                classNames={{
                  label: 'text-sm underline'
                }}
                onClick={() => {
                  setImage(null)
                  setReward({ ...reward, image: null })
                }}
              >
                Удалить
              </Button>
            )}
          </div>
        </div>
      </CreateLabel>
      <CreateLabel label='Описание вознаграждения'>
        <Textarea
          value={reward?.description}
          onChange={handleInputChange}
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
          value={reward?.how_to_get}
          onChange={handleInputChange}
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
          value={reward?.cost}
          onChange={handleInputChange}
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
              value={reward?.count}
              onChange={handleInputChange}
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
            {infinite && <Overlay />}
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
      <CreateLabel
        label='Примерная дата доставки'
        className='border-b'
      >
        <DatePicker
          value={reward?.sending}
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
          locale='ru'
        />
      </CreateLabel>
      <div className='flex items-center justify-between gap-x-4 mt-4'>
        <Button
          variant='outline'
          loading={loading}
          onClick={() => setEditModal(false)}
        >
          Отмена
        </Button>
        <Button 
          onClick={updateReward}
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  )
}

export default EditReward