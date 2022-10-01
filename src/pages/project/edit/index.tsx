import React from 'react'
import { Loader, Tabs } from '@mantine/core';
import { IProject } from '../../../interfaces/project.interface';
import useAuth from '../../../hooks/useAuth';
import { IReward } from '../../../interfaces/reward.interface';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Main from './Main';
import Details from './Details';
import Rewards from './Rewards/Rewards';
import Verification from './Verification';

import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, query, where } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import Incubator from './Incubator';
export interface EditProjectProps {
  project?: IProject,
  id?: string | null, 
  details?: string,
  loadin?: boolean,
  rewards?: IReward[],
  rewardsCount?: number 
}

export const styles = {
  row: 'grid grid-cols-1 sm:grid-cols-[75%_auto] relative gap-4',
  restInfo: 'absolute bottom-1 right-1 text-xs text-slate-400',
  textarea: 'max-h-[120px] overflow-hidden resize-y',
  addtionalField: 'p-4 grid-cols-1 sm:grid-cols-[275px_auto]',
  checkField: 'flex flex-col w-full',
  checkLabel: 'p-4',
  error: 'text-xs'
}
interface EditProjectContextProps {
  handleTabChange: (value: string | null) => void
}

const defaultValue: EditProjectContextProps = {
  handleTabChange: () => {}
}

export const EditProjectContext = React.createContext<EditProjectContextProps>(defaultValue)

function EditProject() {

  const { id } = useParams()

  const location = useLocation().pathname

  const navigate = useNavigate()

  const {user} = useAuth()

  const [pData, pLoading, pError  ]  = useDocument(doc(db, 'projects', id as string))
  const [rData, rLoading, rError] = useCollectionData(query(collection(db, 'rewards'), where('project_id', '==', id)))

  const [project, setProject] = React.useState<IProject | undefined>({})
  const [rewards, setRewards] = React.useState<any[] | undefined> ([])

  React.useEffect(() => {
    setProject(pData?.data())
  }, [pData, pLoading, pError])

  React.useEffect(() => {
    // getRewards()
    setRewards(rData)
  }, [rData, rLoading, rError])

  const tabValue = 
    (location.includes('/edit/details') ? '/edit/details' : '') ||
    (location.includes('/edit/rewards') ? '/edit/rewards' : '') ||
    (location.includes('/edit/verification') ? '/edit/verification' : '') ||
    (location.includes('/edit/incubator') ? '/edit/incubator' : '') || '/edit'

  const handleTabChange = (value: string | null) => {
    navigate(`/project/${id}${value}`)
  }

  const checkAuthor = () => {
    if (user?.uid === project?.uid) {
    }
    else if ((user && project?.uid) && (user?.uid !== project?.uid)) {
      console.log('not author');
      navigate('/')
    }
  }
    
  React.useEffect(() => {
    checkAuthor()
    // eslint-disable-next-line
  }, [project, user]) 

  if (pLoading || rLoading) return (
    <div className='w-full h-full flex justify-center items-center'>
      <Loader size='lg'/>
    </div>
  )

  return (
    <div className='w-full box-border'>
      <div className="container">
        <div className='w-full'>
          <EditProjectContext.Provider value={{handleTabChange}}>
            <Tabs
              value={tabValue}
              onTabChange={(value) => handleTabChange(value)}
              variant='pills'
              radius='md'
              classNames={{
                tabLabel: 'text-xl',
                tabsList: 'wrapper'
              }}
            >
              <Tabs.List>
                <Tabs.Tab value='/edit'>Осноные данные</Tabs.Tab>
                <Tabs.Tab value='/edit/details'>Детали</Tabs.Tab>
                <Tabs.Tab value='/edit/rewards'>Вознаграждения</Tabs.Tab>
                <Tabs.Tab value='/edit/verification'>Верификация</Tabs.Tab>
                <Tabs.Tab value='/edit/incubator'>Бизнес-инкубатор</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='/edit' pt='md'>
                <Main
                  project={project}
                  id={id as string}
                  rewardsCount={rewards?.length}
                />
              </Tabs.Panel>
              <Tabs.Panel value='/edit/details' pt='md'>
                <Details
                  details={pData?.data()?.detail_description}
                  id={id as string}
                  loadin={pLoading}
                />
              </Tabs.Panel>
              <Tabs.Panel value='/edit/rewards' pt='md'>
                <Rewards
                  project={project}
                  id={id as string}
                  rewards={rewards}
                />
              </Tabs.Panel>
              <Tabs.Panel value='/edit/verification' pt='md'>
                <Verification
                  project={project}
                  id={id as string}
                /> 
              </Tabs.Panel>
              <Tabs.Panel value='/edit/incubator' pt='md'>
                  <Incubator
                    // project={project}
                    // id={id as string}
                  />
              </Tabs.Panel>
            </Tabs>
          </EditProjectContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default EditProject