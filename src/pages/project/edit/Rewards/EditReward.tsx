import React from 'react'
import { Button, Checkbox, Modal, Overlay, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { CreateLabel, FileInput } from '../../../../components'
import { EditProjectContext, styles } from '../../../../pages/project/edit'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../utils/firebase'
import { uploadAndGetImage } from '../../../../service/StorageService'

import 'dayjs/locale/ru';

function EditReward({editReward, editModal, setEditModal}: any) {
  
  const { id } = React.useContext(EditProjectContext)

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
      await uploadAndGetImage(`projects/${id}/main-img`, image)
      .then(async e => {
        await updateDoc(doc(db, 'rewards', reward.id), {
          ...reward,
          image: e,
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
      title='???????????????????????????? ????????????????????????????'
      opened={editModal}
      onClose={() => setEditModal(false)}
      centered
      size='xl'
    >
      <CreateLabel label='???????????????? ????????????????????????????'>
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
          placeholder="???? ?????????? 50 ????????????????"
          required
          variant="unstyled"
          maxLength={120}
        />
        <div className={styles.restInfo}>
          ???????????????? {120 - (reward?.title?.length! ?? 0)} ????????????????
        </div>
      </CreateLabel>
      <CreateLabel label='????????????????'>
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
                label='?????????????????? ??????????????????????'
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
                ??????????????
              </Button>
            )}
          </div>
        </div>
      </CreateLabel>
      <CreateLabel label='???????????????? ????????????????????????????'>
        <Textarea
          value={reward?.description}
          onChange={handleInputChange}
          name='description'
          style={{ border: 'none' }}
          classNames={{
            input: 'h-48'
          }}
          size='md'
          placeholder='???????????????? ????????????????????????????'
          required
          variant='unstyled'
          py={6}
          px={16}
          maxLength={500}
        />
        <div className={styles.restInfo}>
          ???????????????? {500 - (reward?.description.length! ?? 0)} ????????????????
        </div>
      </CreateLabel>
      <CreateLabel label='?????????????? ??????????????????'>
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
          placeholder='?????? ???????????????? ???????????? ????????????????????????????'
          required
          variant='unstyled'
          maxLength={240}
        />
        <div className={styles.restInfo}>
          ???????????????? {240 - (reward?.how_to_get.length! ?? 0)} ????????????????
        </div>
      </CreateLabel>
      <CreateLabel label='???????? ????????????????????????????'>
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
          placeholder="???? ?????????? 50 ????????????????"
          required
          variant="unstyled"
        />
      </CreateLabel>
      <CreateLabel label='????????????????????'>
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
              placeholder="???? ?????????? 50 ????????????????"
              required
              variant="unstyled"
            />
            {infinite && <Overlay />}
          </div>
          <Checkbox
            py={6}
            px={16}
            label='???? ????????????????????'
            classNames={{ label: 'font-semibold' }}
            className='flex-1 border-l border-slate-200'
            onChange={handleInfinite}
          />
        </div>
      </CreateLabel>
      <CreateLabel
        label='?????????????????? ???????? ????????????????'
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
          placeholder="???? ?????????? 50 ????????????????"
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
          ????????????
        </Button>
        <Button 
          onClick={updateReward}
          loading={loading}
        >
          ??????????????????
        </Button>
      </div>
    </Modal>
  )
}

export default EditReward