import React from 'react'
import { LoadingOverlay } from '@mantine/core'
import { EditProjectProps } from '../../../pages/project/edit'

import { CreateLabel, CreateButtons } from '../../../components'

import ProjectService from '../../../service/ProjectService'

import { RichTextEditor } from '@mantine/rte';
import { getImage, uploadImage } from '../../../service/StorageService'
import { randomId } from '@mantine/hooks'
import Compressor from 'compressorjs';

function Details({details, id}: EditProjectProps) {
  
  const [value, setValue] = React.useState(details ?? '<p></p>');

  React.useLayoutEffect(() => {
    setValue(details as string)
  }, [details])  

  const [loading, setLoading] = React.useState({ 
    layout: false, 
    save: false,
  }) 

  const handleLoading = (name: string, value: boolean) => {
    setLoading({ ...loading, [name]: value })
  }  

  const randomid = randomId()

  const handleImageUpload = React.useCallback((file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      handleLoading('save', true)
      const formData = new FormData();
      formData.append('image', file);
      new Compressor (file, {
        quality: 0.6,
        async success(file) {           
          await uploadImage(`/projects/${id}/details-img-${randomid}`, file)
          .then(async e => {
            console.log(e);
            await getImage(`/projects/${id}/details-img-${randomid}`)
            .then(e => {
              resolve(e)
              handleLoading('save', false)
            })
            .catch(() => reject(new Error('Upload failed')));
          })
        },
      })
      // eslint-disable-next-line
  }), [details]);

  const updateProject = async () => {
    handleLoading('save', true)
    ProjectService.updateProject(id as string, {
      detail_description: value
    })
    .then(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => handleLoading('save', false))
  }

  return ( 
    <div className=''>
      <LoadingOverlay visible={loading.save} />
      <div className='wrapper'>
        <CreateLabel
          label='Детальное описание'
          description={`Начните с представления себя, своей команды, а также с предыстории проекта. 
          Далее опишите суть и цель проекта, объясните, в чем его уникальность и почему он должен 
          заинтересовать людей. Распишите, на что будут потрачены вложенные пользователями средства.
          Избегайте монотонности изложения, разбивайте текст на абзацы с привлекательными заголовками,
          фото- и видеоматериалами, графическими изображениями и т.п. Совет: по объему текст-описание 
          должен быть примерно наравне с колонкой вознаграждений – идеально, если они заканчиваются на одном уровне.`
        }
          className='border-b'
        >
          <RichTextEditor
            value={value} 
            onChange={setValue} 
            style={{border: 'none'}}
            className='max-w-[700px] mx-auto'
            onImageUpload={handleImageUpload}
          />
        </CreateLabel>
      </div>
      <CreateButtons loading={loading.save} back='/edit' forward='/edit/rewards' callback={updateProject} />
    </div>
  )
}

export default Details