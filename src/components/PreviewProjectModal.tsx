import { Modal } from '@mantine/core'
import React from 'react'
import Project from '../pages/project'
import { IProject } from '../types/types'

interface PreviewProjectModalProps {
  preview: boolean, 
  project: IProject, 
  setPreview: (preview: boolean) => void
}

function PreviewProjectModal({ preview, project, setPreview }: PreviewProjectModalProps ) {
  return (
    <Modal
      opened={preview}
      onClose={() => setPreview(false)}
      fullScreen
      overflow='inside'
      padding={0}
      classNames={{
        header: 'mr-2 p-4 mb-0',
      }}
    >
      <Project projectId={project?.id} projectData={project} />
    </Modal>
  )
}

export default PreviewProjectModal