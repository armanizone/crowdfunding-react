import React from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import { Load, Reward } from '../../components'
import { useCollectionData, useDocumentData, useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { db } from '../../utils/firebase'
import Fee from './Fee'
import Head from './Head'
import Body from './Body'
import { useLocation, useParams } from 'react-router-dom'


function Project({projectId}: any) {

  const { id } = useParams()

  const location = useLocation().pathname

  const [value, loadjng] = useDocumentDataOnce(doc(db, 'projects', id ?? projectId!))
  const [rewards] = useCollectionData(query(collection(db, 'rewards'), where('project_id', '==', value?.id ?? ' ')))

  React.useEffect(() => {
    document.body.style.backgroundColor = 'white'
    return () => {
      document.body.style.backgroundColor = 'rgb(248 250 252)'
    }
  }, [])

  if (loadjng) return <Load/>

  return (
    <div className='w-full my-6'>
      <div className='px-0 bg-border rounded-none'>
        <div className="container">
          <div className='flex flex-col'>
            <Head
              project={value}
              // state={state}
              // donation={donation}
              // getProject={getProject}
            />
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_357px] gap-4 mt-8'>
              <Body project={value} rewards={rewards} projectId={projectId} />
              <Fee rewards={rewards} projectId={projectId} />
            </div>
            {location.includes('/fee') && (
              <div className='grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {rewards?.map((item: any, i: number) => {
                  return (
                    <Reward reward={item} key={i} />
                  )
                })} 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project