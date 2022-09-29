import React from 'react'
import cn from 'classnames'
import { Progress } from '@mantine/core'
import { IProject } from '../interfaces/project.interface'

import { IoTime } from 'react-icons/io5'
import { Link } from 'react-router-dom'
interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project?: IProject,
  type?: 'active' | 'ended' | 'preview',
  recomended?: boolean
}

const styles = {
  wrapper: 'rounded-md border border-slate-200 relative overflow-hidden w-[297px] bg-white'
}

function Card({project, type, recomended, className, ...props}: CardProps): JSX.Element {

  return (
  <div 
    className={cn(className, styles.wrapper)}
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
    <div className='flex flex-col p-4 gap-y-3'>
      <h2 className='text-base font-semibold'>{project?.title}</h2>
      <p className='text-slate-500 text-[15px]'>{project?.description}</p>
    </div>
    <div className='p-5'>
      <div className="success_form">
        <div className="text-xs text-blue-400 mb-4">
          {project?.category}
        </div>
        <div className="flex justify-between items-end mb1">
          <div className="">
            <span className="text-sm mr-1.5">1375</span>
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
          <span className="text-xl text-slate-500 mr-1.5">
            <IoTime />
          </span>
          <span className="text-xs text-slate-500">
            {isNaN(23) ? project?.duration : 23} день/дней осталось
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}
  
export default Card