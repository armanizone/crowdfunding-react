import React from 'react'
import { Tabs } from '@mantine/core'
import { collection, query, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { db } from '../../../utils/firebase'

import { FaDraftingCompass, FaRocket, FaCalendarAlt } from 'react-icons/fa'
import Active from './Active'
import Closed from './Closed'
import Draft from './Draft'
import { IProject } from '../../../types/types'

import { useMediaQuery } from '@mantine/hooks';

function MyProjects() {

  const {user} = useAuth()

  const [values, loading] = useCollectionData(query(collection(db, 'projects'), where('uid', '==', user?.uid ?? ' ')))

  const items = values as IProject[]

  const drafted = items?.filter((item) => {
    return item.status === 'created'
  })

  const active = items?.filter((item) => {
    return item.status === 'active'
  })

  const closed = items?.filter((item) => {
    return item.status === 'closed'
  })

  const location = useLocation().pathname
  const navigate = useNavigate()

  const tabValue =
    (location.includes('projects/active') && 'projects/active') ||
    (location.includes('projects/closed') && 'projects/closed') || 'projects'

  const handleTabChange = (value: string | null) => {
    navigate(`/profile/${value}`)
  }

  const matches = useMediaQuery('(min-width: 978px)');

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-y-4'>
        <Tabs
          orientation={matches ? 'vertical' : 'horizontal'}
          classNames={{
            tabIcon: 'text-2xl p-2 md:p-4',
            tabsList: 'bg-white',
            root: 'border',
          }}
          value={tabValue}
          onTabChange={value => handleTabChange(value)}
        >
          <Tabs.List
            position={matches ? 'left' : 'center'}
          >
            <Tabs.Tab value='projects' icon={<FaDraftingCompass/>}></Tabs.Tab>
            <Tabs.Tab value='projects/active' icon={<FaRocket/>} ></Tabs.Tab>
            <Tabs.Tab value='projects/closed' icon={<FaCalendarAlt/>}></Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='projects' className='bg-white p-3 md:p-6'>
            <Draft values={drafted} loading={loading} />
          </Tabs.Panel>
          <Tabs.Panel value='projects/active' className='bg-white p-3 md:p-6'>
            <Active values={active} loading={loading} />
          </Tabs.Panel>
          <Tabs.Panel value='projects/closed' className='bg-white p-3 md:p-6'>
            <Closed values={closed} loading={loading} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default MyProjects