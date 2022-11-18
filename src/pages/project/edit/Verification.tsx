import React from 'react'
import { Button, Modal, TextInput, LoadingOverlay } from '@mantine/core'
import { EditProjectContext, styles } from '../../../pages/project/edit'
import { CreateButtons, CreateLabel, FileInput } from '../../../components'
import { uploadAndGetImage } from '../../../service/StorageService'
import ProjectService from '../../../service/ProjectService'
// import { useParams } from 'react-router-dom'

function Verification() {

  const {project, id} = React.useContext(EditProjectContext)

  const [verification, setVerification] = React.useState({
    name: '',
    phone: '',
    iin: '',
    front: null, 
    back: null
  })

  const [docs, setDocs] = React.useState({
    front: null,
    back: null
  })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setVerification({
      name: project?.author?.name,
      phone: project?.author?.phone,
      iin: project?.author?.iin,
      front: project?.author?.front,
      back: project?.author?.back,
    })
  }, [project])

  const saveVerification = async () => {
    setLoading(true)
    if (docs.front) {
      await uploadAndGetImage(`projects/${id}/docs/front`, docs.front)
      .then(async e => {
        await ProjectService.updateProject(id, {
          "author.name": verification.name ?? null,
          "author.phone": verification.phone ?? null,
          "author.iin": verification.iin ?? null,
          "author.front": e
        })
        setLoading(false)
      })
    }
    if (docs.back) {
      await uploadAndGetImage(`projects/${id}/docs/back`, docs.back)
      .then(async e => {
        await ProjectService.updateProject(id, {
          "author.name": verification.name ?? null,
          "author.phone": verification.phone ?? null,
          "author.iin": verification.iin ?? null,
          "author.back": e
        })
        setLoading(false)
      })
    }
    if (!docs.front && !docs.back) {
      await ProjectService.updateProject(id, {
        ...project, 
        "author.name": verification.name ?? null,
        "author.phone": verification.phone ?? null,
        "author.iin": verification.iin ?? null,
      })
      .finally(() => {
        setLoading(false)
      })
    }
  } 

 
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setVerification({...verification, [name]: value})
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target
    setDocs({...docs, [name]: files?.[0]})
  }

  const toModeration = () => {

  }

  const [view, setView] = React.useState({
    name: '',
    modal: false,
  })

  return (
    <>
      <LoadingOverlay visible={loading} />
      <div>
        <div className='wrapper'>
          <div className='mb-4'>
            <p>Нам нужно верифицировать лицо, которое будет выступать организатором проекта.</p>
          </div>
          <CreateLabel label='Автор проекта'>
            <TextInput
              classNames={{
                error: styles.error,
              }}
              py={6}
              px={16}
              size='md'
              placeholder='Инициалы автора'
              required
              variant="unstyled"
              value={verification.name ?? ''}
              onChange={handleInput}
              name='name'
            />
          </CreateLabel>
          <CreateLabel label='Номер'>
            <TextInput
              classNames={{
                error: styles.error,
              }}
              py={6}
              px={16}
              size='md'
              placeholder="Введите номер"
              required
              variant="unstyled"
              value={verification.phone ?? ''}
              onChange={handleInput}
              name='phone'
            />
          </CreateLabel>
          <CreateLabel label='ИИН' >
            <TextInput
              classNames={{
                error: styles.error,
              }}
              py={6}
              px={16}
              size='md'
              placeholder="Введите номер"
              required
              variant="unstyled"
              value={verification.iin ?? ''}
              onChange={handleInput}
              name='iin'
            />
          </CreateLabel>
          <CreateLabel label='Удостоверение личности' className='border-b'>
            <div className='space-y-4 p-4'>
              <div className='flex gap-4'>
                <FileInput 
                  label='Лицевая сторона'
                  buttonProps={{
                    compact: true, 
                    variant: 'light',
                  }}
                  inputProps={{
                  }}
                  name='front'
                  onChange={handleFiles}
                />
                {docs.front && (
                  <>
                    <img src={URL.createObjectURL(docs?.front)} alt="" className='w-24' onClick={() => setView({ ...view, modal: true, name: URL.createObjectURL(docs?.front!)})} />
                    <Button 
                      color={'red'} 
                      compact onClick={() => setDocs({...docs, front: null})} 
                      variant='subtle'>у
                      далить
                    </Button>
                  </>
                )}
                {!docs.front && (
                  <img src={project?.author?.front} alt="" className='w-24' onClick={() => setView({ ...view, modal: true, name: project?.author?.front })} />
                )}
              </div>
              <div className='flex gap-4'>
                <FileInput 
                  label='Обратная сторона'
                  buttonProps={{
                    compact: true, 
                    variant: 'light',
                  }}
                  inputProps={{
                  }}
                  name='back'
                  onChange={handleFiles}
                />
                {docs.back && (
                  <>
                    <img 
                      src={URL.createObjectURL(docs?.back)} 
                      alt="" 
                      className='w-24' 
                      onClick={() => setView({ ...view, modal: true, name: URL.createObjectURL(docs?.back!)})} 
                    />
                    <Button 
                      color={'red'} 
                      compact onClick={() => setDocs({ ...docs, back: null })} 
                      variant='subtle'
                    >
                      удалить
                    </Button>
                  </>
                )}
                {!docs.back && (
                  <img 
                    src={project?.author?.back} 
                    alt=""  
                    className='w-24' 
                    onClick={() => setView({ ...view, modal: true, name: project?.author?.back })}
                  />
                )}
              </div>
            </div>
          </CreateLabel>
        </div>
        <CreateButtons 
          back='/edit/rewards'
          toModeration={toModeration}
          callback={saveVerification}
          loading={loading}
        />
      </div>
      <Modal
        opened={view.modal}
        onClose={() => setView({...view, modal: false})}
        centered
        withCloseButton={false}
      >
        <img src={view.name} alt="" />
        <img src={view.name} alt="" />
      </Modal>
    </>
  )
}

export default Verification 