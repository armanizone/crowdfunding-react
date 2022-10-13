import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Reward } from '../../components'
import cn from 'classnames'

function Fee({rewards, projectId}: any) {

  const { id } = useParams()

  const location = useLocation().pathname

  return (
    <div className="w-full relative">
      <div className="mb-5">
        {projectId ?
            <p className={cn('py-2.5 px-4 border-b-2 text-center text-base md:text-lg', {
              'border-b-blue-500': location.includes('/fee')
            })}
            >
              Вознаграждения
            </p>
          :
            <Link to={`/project/${id}/fee`}>
              <p className={cn('py-2.5 px-4 border-b-2 text-center text-base md:text-lg', {
                'border-b-blue-500': location.includes('/fee')
              })}
              >
                Вознаграждения
              </p>
            </Link>
        }
      </div>
      <div className="flex flex-col gap-y-8">
        {!location.includes('/fee') && rewards?.map((item: any, index: number) => {
          return (
            <Reward
              key={index}
              reward={item}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Fee