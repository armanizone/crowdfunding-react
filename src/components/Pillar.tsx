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
      className={(cn(className, 'flex flex-col sm:flex-row bg-white border border-slate-200'))}
      {...props}
    >
      <div className=''>
        {project?.image
          ? <img src={project?.image} className='aspect-video sm:w-72 lg:w-[370px] h-full object-cover' alt="" />
          : <div className='aspect-video sm:w-72 lg:w-[370px] h-full object-cover bg-slate-200'></div>
        }
      </div>
      <div className='p-3 md:p-4 flex-1 flex flex-col justify-between gap-y-4'>
        <div className='flex flex-col md:flex-row gap-y-4 items-start gap-x-4'>
          {isDraft && (
            <Tag title='Черновик' type='draft'/>
          )}
          {isActive && (
            <Tag title='Идет сбор' type='active'/>
          )}
          {isClosed && (
            <Tag title='Завершен' type='closed'/>
          )}
          {!isClosed && (
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
              px={0}
            >
              Редактировать
            </Button>
          )}
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
              px={0}
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
        <div className='grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-4'>
          <div className='shadow p-2'>
            <p className='font-light text-xs md:text-sm uppercase tracking-wide text-center'>Вознаграждений</p>
            <p className='font-bold text-lg md:text-xl text-center'>{project?.backed}</p>
          </div>
          <div className='shadow p-2'>
            <p className='font-light text-xs md:text-sm uppercase tracking-wide text-center'>Собрано</p>
            <p className='font-bold text-lg md:text-xl text-center'>{project?.backed}</p>
          </div>
          <div className='shadow p-2'>
            <p className='font-light text-xs md:text-sm uppercase tracking-wide text-center'>Приобретено</p>
            <p className='font-bold text-lg md:text-xl text-center'>{project?.backed}</p>
          </div>
          <div className='shadow p-2'>
            <p className='font-light text-xs md:text-sm uppercase tracking-wide text-center'>Комментариев</p>
            <p className='font-bold text-lg md:text-xl text-center'>{project?.backed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pillar