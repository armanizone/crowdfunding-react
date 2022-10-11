import React from 'react'
import cn from 'classnames'

interface TagProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string,
  type?: 'draft' | 'active' | 'closed',
}


function Tag({title = 'Черновик', type, className, ...props}: TagProps):JSX.Element {

  const isDraft = type === 'draft'
  const isActive = type === 'active'
  const isClosed = type === 'closed'

  return (
    <div 
      className={cn(className, 'h-min border-l-8 rounded inline-block', {
        'bg-sky-100 border-l-sky-500': isDraft ,
        'bg-green-100 border-l-green-500': isActive ,
        'bg-gray-100 border-l-gray-400': isClosed
      })}
      {...props}
    >
      <span className={cn('italic px-3 py-1 block text-sm font-semibold tracking-tight break-normal', {
        'text-sky-500': isDraft,
        'text-green-500': isActive,
        'text-gray-400': isClosed
      })}>
        {title}
      </span>
    </div>
  )
}

export default Tag