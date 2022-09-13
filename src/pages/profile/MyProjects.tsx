import { Loader } from '@mantine/core'
import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom'
import { Card } from '../../components'
import useAuth from '../../hooks/useAuth'
import { db } from '../../utils/firebase'

function MyProjects() {

  const {user} = useAuth()
  const [values, loading, error] = useCollectionData(query(collection(db, 'projects'), where('uid', '==', user?.uid ?? ' ')))

  if (loading) return (
    <div className='w-full h-full flex justify-center items-center'>
      <Loader size='lg' />
    </div>
  )
 
  return (
    <div className='w-full'>
      <div className="container">
        <div className='flex flex-col'>
          {values?.map((item) => {
            return (
              <Link to={`/project/${item.id}/edit`}>
                <div 
                  key={item.id}
                  className='flex bg-white border border-slate-200 '
                >
                  <div className='border-r border-slate-200 p-4'>
                    <Card 
                      project={item}  
                    />
                  </div>
                  <div>
                    
                  </div>
                </div>
              </Link>
            )
          })} 
        </div>
      </div>
    </div>
  )
}

export default MyProjects