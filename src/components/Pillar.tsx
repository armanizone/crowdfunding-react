import { Button } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { IProject } from '../interfaces/project.interface'
import cn from 'classnames'
import Tag from './Tag'
import { openConfirmModal } from '@mantine/modals'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../utils/firebase'



interface PillarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject,
  type?: 'draft' | 'active' | 'closed',
}

function Pillar({ project, type, className, ...props }: PillarProps):JSX.Element {

  const createdAt = dayjs(new Date(project?.created_at?.seconds * 1000)).locale('ru').format('DD/MM/YYYY, hh:mm')

  const isDraft = type === 'draft'
  const isActive = type === 'active'
  const isClosed = type === 'closed'

  const deleteTrack = async () => await deleteDoc(doc(db, 'projects', project?.id as string))
  


  const confirmDeleteModal = () => openConfirmModal({
    title: 'Подтверждение действия',
    children: (
      <p>Вы действительно хотите удалить проект?</p>
    ),
    centered: true,
    labels: {confirm: 'Да', cancel: 'Отменить'},
    onConfirm: () => deleteTrack()
  }) 

  return (
    <div
      key={project?.id}
      className={(cn(className, 'flex bg-white border border-slate-200'))}
      {...props}
    >
      <div className=''>
        {project?.image
          ? <img src={project?.image} className='aspect-video w-[370px] h-full object-cover' alt="" />
          : <div className='aspect-video w-[370px] h-full object-cover bg-slate-200'></div>
        }
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between gap-y-4'>
        <div className='flex gap-x-4'>
          {isDraft && (
            <Tag title='Черновик' type='draft' />
          )}
          {isActive && (
            <Tag title='Идет сбор' type='active' />
          )}
          {isClosed && (
            <Tag title='Завершен' type='closed' />
          )}
          <Button
            variant='subtle'
            compact
            classNames={{
              label: 'underline',
              leftIcon: 'text-lg'
            }}
            leftIcon={<FiEdit />}
            component={Link}
            to={`/project/${project?.id}/edit`}
          >
            Редактировать
          </Button>
          {project?.status !== 'confirmed' ?
            <Button
              color={'red'}
              variant='subtle'
              compact
              classNames={{
                label: 'underline',
                leftIcon: 'text-lg'
              }}
              leftIcon={<RiDeleteBin6Fill />}
              onClick={confirmDeleteModal}
            >
              Удалить
            </Button>
            :
            <Button
              disabled={project?.status !== 'confirmed'}
              compact
            >
              Запустить
            </Button>
          }
        </div>
        <div className='flex gap-x-4 justify-between'>
          <div className='flex flex-col gap-y-2'>
            <b className='text-xl'>
              {project?.title
                ? project?.title
                : <Link to={`/project/${project?.id}/edit`} className='link'>Добавить название</Link>}
            </b>
            <p className='text-slate-500'>
              {project?.description
                ? project?.description
                : <Link to={`/project/${project?.id}/edit`} className='link'>Добавить описание</Link>}
            </p>
            <time className='text-sm'>
              {createdAt}
            </time>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <p className='font-light text-sm uppercase tracking-wide'>Вознаграждений</p>
            <p className='font-bold text-xl text-center'>{project?.backed}</p>
          </div>
          <div>
            <p className='font-light text-sm uppercase tracking-wide'>Собрано</p>
            <p className='font-bold text-xl text-center'>{project?.backed}</p>
          </div>
          <div>
            <p className='font-light text-sm uppercase tracking-wide'>Приобретено</p>
            <p className='font-bold text-xl text-center'>{project?.backed}</p>
          </div>
          <div>
            <p className='font-light text-sm uppercase tracking-wide'>Комментариев</p>
            <p className='font-bold text-xl text-center'>{project?.backed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pillar