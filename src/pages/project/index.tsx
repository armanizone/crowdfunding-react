import React from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import { Load } from '../../components'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../utils/firebase'
import ProjectFee from './ProjectFee'
import ProjectHead from './ProjectHead'
import ProjectMain from './ProjectMain'

const styles = {
  project: 'w-full my-6',
  projectInner: 'px-0 bg-border rounded-none',
  projectBody: 'flex flex-col',
  projectMain: 'flex gap-x-4 mt-16',
}

function Project() {

  const [value, loadjng] = useDocumentData(doc(db, 'projects', '1663083353437'))
  const [values] = useCollectionData(query(collection(db, 'rewards'), where('project_id', '==', value?.id ?? ' ')))

  if (loadjng) return <Load/>

  return (
    <div className={styles.project}>
      <div className={styles.projectInner}>
        <div className="container">
          <div className={styles.projectBody}>
            <ProjectHead
              project={value}
              // state={state}
              // donation={donation}
              // getProject={getProject}
            />
              <div className={styles.projectMain}>
                <ProjectMain project={value} />
                <ProjectFee rewards={values}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project