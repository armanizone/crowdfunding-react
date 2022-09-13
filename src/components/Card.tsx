import React from 'react'
import cn from 'classnames'
import { Progress } from '@mantine/core'
import { IProject } from '../interfaces/project.interface'

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project?: IProject,
  type?: 'active' | 'ended' | 'preview',
  recomended?: boolean
}

const styles = {
  wrapper: 'rounded-md border border-slate-200 relative overflow-hidden min-w-[270px] max-w-[270px] md:max-w-[350px] bg-white'
}

function Card({project, type, recomended, className, ...props}: CardProps): JSX.Element {

  return (
  <div 
    className={cn(className, styles.wrapper, {
    })}
    {...props}
  >
    <div className='relative overflow-hidden '>
      {project?.image && (
        <img 
          src={project?.image}
          alt={project.image}
          className='aspect-video object-fill z-50'
        />
      )}
      <div className='absolute aspect-video top-0 left-0 bottom-0 right-0 bg-white border-b border-slate-200 -z-10'></div>
    </div>
    <div className='flex flex-col p-4 gap-y-3'>
      <h2 className='text-base font-semibold'>{project?.title}</h2>
      <p className='text-slate-500 text-[15px]'>{project?.description}</p>
    </div>
    <div className='p-5 mt-3'>
      <Progress
        size='sm'
        value={50}
      />
      <div className='flex justify-between mt-4'>
        <div>
          asd
        </div>
        <div>
          zxc
        </div>
      </div>
    </div>
  </div>
  )
}
  
export default Card