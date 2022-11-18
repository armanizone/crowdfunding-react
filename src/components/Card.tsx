import React from 'react'
import cn from 'classnames'
import { Progress } from '@mantine/core'
import { IProject } from '../types/types'

import { IoTime } from 'react-icons/io5'
import { Link } from 'react-router-dom'
interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project?: IProject,
  type?: 'active' | 'ended' | 'preview',
  recomended?: boolean
}

function Card({project, type, recomended, className, ...props}: CardProps): JSX.Element {

  return (
  <div 
    className={cn(className, 'flex flex-col relative rounded-md border border-slate-200 overflow-hidden bg-white fadeup-animation transition-all duration-150')}
    {...props}
  >
    <div className='relative overflow-hidden'>
      {project?.image ? (
        <Link to={`/project/${project.id}`}>
          <img 
            src={project?.image}
            alt={project.image}
            className='aspect-video object-cover z-50'
          />
        </Link>
      ) : <div className='aspect-video object-cover z-50 bg-slate-200 border-b border-slate-200'></div>}
    </div>
      <div className='p-4 space-y-3 grow'>
        <h2 className='text-base font-semibold'>{project?.title ?? 'Название проекта'}</h2>
        <p className='text-slate-700 text-[15px]'>{project?.description ?? 'Описание проекта'}</p>
      </div>
      <div className='px-4 pb-4 shrink'>
        <div className="text-xs text-blue-400 mb-4">
          {project?.category}
        </div>
        <div className="flex justify-between items-end mb1">
          <div>
            <span className="text-sm mr-1.5">{project?.earned}</span>
            <span className="text-xs text-slate-500">ед.</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs" style={{ color: 50 > 100 ? 'rgb(0, 235, 31)' : '' }}>{String(50).substring(0, 4)}%</span>
          </div>
        </div>

        <div className='form_bar'>
          <Progress value={50} />
        </div>
      
        <div className="mt-7 flex items-center">
          <p className="text-xl text-slate-500 mr-1.5">
            <IoTime />
          </p>
          <p className="text-xs text-slate-500">
            <span>
              {project?.duration ?? 15}
            </span> день/дней осталось
          </p>
        </div>
      </div>
  </div>
  )
}
  
export default Card