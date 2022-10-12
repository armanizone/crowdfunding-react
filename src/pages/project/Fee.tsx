import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reward } from '../../components'

function Fee({rewards}: any) {

  const { id } = useParams()


  return (
    <div className="w-full p-4 relative">
      <div className="text-base md:text-lg mb-5 font-head">
        <Link to={`/project/${id}/fee`}>
          <p className='py-2.5 px-4 border-b-2 border-b-blue-500'>Вознаграждения</p>
        </Link>
      </div>
      <div className="flex flex-col gap-y-8">
        {rewards?.map((item: any, index: number) => {
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