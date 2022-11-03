import { collection, query } from 'firebase/firestore'
import React from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { Card } from '../../components'
import { db } from '../../utils/firebase'

function Explore() {

  const [values] = useCollectionDataOnce(query(collection(db, 'projects')))

  return (
    <div className='w-full'>
      <div className="container">
        <div className='grid grid-cols-4 gap-4'>
          {values?.map((item: any, i: number) => {
            return (
              <Card 
                project={item} 
                key={i} 
                style={{ animationDelay: `${((i + 1) * 150)}ms` }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Explore