import React from 'react'
import { LoadingOverlay } from '@mantine/core'
import { EditProjectProps, styles } from '../../../pages/project/edit'

import CreateLabel from '../../../components/CreateLabel'
import CreateButtons from '../../../components/CreateButtons'
import ProjectService from '../../../service/ProjectService'

import { RichTextEditor } from '@mantine/rte';

function Details({project, id}: EditProjectProps) {

  const [loading, setLoading] = React.useState({
    layout: false,
    save: false,
  })

  const handleLoading = (name: string, value: boolean) => {
    setLoading({ ...loading, [name]: value })
  }

  const initialValue = project?.detail_description 
    ? project?.detail_description 
    : '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';

  const [value, setValue] = React.useState(initialValue);

  const handleImageUpload = React.useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch('https://api.imgbb.com/1/upload?key=api_key', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => resolve(result.data.url))
          .catch(() => reject(new Error('Upload failed')));
      }),
    []
  );

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
    <div>
      <div className={styles.bgWrapper}>
        <LoadingOverlay visible={loading.save} /> 
        <CreateLabel
          label='Детальное описание'
          description={`Начните с представления себя, своей команды, а также с предыстории проекта. Далее опишите суть и цель проекта, объясните, в чем его уникальность и почему он должен заинтересовать людей. Распишите, на что будут потрачены вложенные пользователями средства. Избегайте монотонности изложения, разбивайте текст на абзацы с привлекательными заголовками, фото- и видеоматериалами, графическими изображениями и т.п. Совет: по объему текст-описание должен быть примерно наравне с колонкой вознаграждений – идеально, если они заканчиваются на одном уровне.`}
          className='border-b'
        >
          <RichTextEditor
            value={value} 
            onChange={setValue} 
            style={{border: 'none'}}
            className='max-w-[700px] mx-auto'
          />
        </CreateLabel>
      </div>
      <CreateButtons back='/edit' forward='/edit/rewards' callback={updateProject} />
    </div>
  )
}

export default Details