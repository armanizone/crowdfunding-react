import React from 'react'
import { useParams } from 'react-router-dom'

function Collection() {

  const { name } = useParams()

  return (
    <div className='text-pink-500'>Collection
      <span>{name}</span>
    </div>
  )
}

export default Collection