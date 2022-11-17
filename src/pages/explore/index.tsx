import React from 'react'
import { collection, query, where } from 'firebase/firestore'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { Card } from '../../components'
import { IProject } from '../../types/types'
import { db } from '../../utils/firebase'
import Search from './Search'
import FilterCategory from './FilterCategory'

import { useMediaQuery } from '@mantine/hooks';

function Explore() {

  const [values] = useCollectionDataOnce(query(collection(db, 'projects'), 
  // where('status', '!=', 'created')
  ))

  const items = values as IProject[]

  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <div className='w-full'>
      <div className="container">

        <div className='grid md:grid-cols-[200px_auto] xl:grid-cols-[250px_auto] gap-4'>
          {matches && 
            <div className='bg-white rounded-md border p-4'>
              <FilterCategory matches/>
            </div>
          }
          <div>
            <Search matches={matches} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
              {items?.map((item: IProject, i: number) => {
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
      </div>
    </div>
  )
}

export default Explore