import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Reward } from '../../components'
import cn from 'classnames'

function Fee({rewards, projectId}: any) {

  const { id } = useParams()

  const location = useLocation().pathname
  const navigate = useNavigate()

  const handleRewards = () => {
    if (projectId) return
    navigate(`/project/${id}/fee`)
  }

  return (
    <div className="w-full relative">
      <div className="mb-5">
        <p 
          className={cn('py-2.5 px-4 border-b-2 text-center text-base md:text-lg cursor-pointer', {
          'border-b-blue-500': location.includes('/fee')
          })}
          onClick={handleRewards}
        >
          Вознаграждения
        </p>
      </div>
      <div className="flex flex-col gap-y-8">
        {!location.includes('/fee') && rewards?.map((item: any, index: number) => {
          return (
            <Reward
              key={index}
              reward={item}
              style={{ animationDelay: `${((index + 1) * 150)}ms` }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Fee