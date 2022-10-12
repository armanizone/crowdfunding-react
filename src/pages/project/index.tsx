import React from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import { Load } from '../../components'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../utils/firebase'
import ProjectFee from './Fee'
import Head from './Head'
import Body from './Body'
import Description from './Description'
import Rating from './Rating'
import Faq from './Faq'
import Comments from './Comments'
import { useParams } from 'react-router-dom'

const styles = {
  project: 'w-full my-6',
  projectInner: 'px-0 bg-border rounded-none',
  projectBody: 'flex flex-col',
  projectMain: 'flex gap-x-4 mt-16',
}

function Project() {


  const { id } = useParams()

  const [value, loadjng] = useDocumentData(doc(db, 'projects', id!))
  const [rewards] = useCollectionData(query(collection(db, 'rewards'), where('project_id', '==', value?.id ?? ' ')))

  if (loadjng) return <Load/>

  return (
    <div className={styles.project}>
      <div className={styles.projectInner}>
        <div className="container">
          <div className={styles.projectBody}>
            <Head
              project={value}
              // state={state}
              // donation={donation}
              // getProject={getProject}
            />
            <div className='grid grid-cols-[1fr_297px] mt-8'>
              <Body project={value} rewards={rewards} />
              <ProjectFee rewards={rewards}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project