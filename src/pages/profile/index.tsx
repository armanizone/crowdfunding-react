import React from 'react'
import { Tabs } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Investions from './Investions'
import MyProjects from '../profile/projects'
import Supports from './Supports'
import Settings from '../profile/settings'
import Bill from './Bill'
import { Load, UserBar } from '../../components'

function Profile() {
  
  const {loading} = useAuth()

  const location = useLocation().pathname
  const navigate = useNavigate()

  const tabValue =
    (location.includes('/profile/projects') ? '/profile/projects' : '') ||
    (location.includes('/profile/supports') ? '/profile/supports' : '') ||
    (location.includes('/profile/investions') ? '/profile/investions' : '') || '/profile'

  const handleTabChange = (value: string | null) => {
    navigate(value!)
  }

  if (loading) return <Load/>

  return (
    <div className='w-full'>
      <div className="container">
        <UserBar/>
          <Tabs
            value={tabValue}
            onTabChange={value => handleTabChange(value)}
            classNames={{
              tabLabel: 'text-base font-semibold',
            }}
            styles={{
              tabsList: {borderBottom: 'none'}
            }}
          >
            <Tabs.List
              position='center'
            >
              <Tabs.Tab value='/profile/projects'>Созданные проекты</Tabs.Tab>
              <Tabs.Tab value='/profile/supports'>Поддержанные проекты</Tabs.Tab>
              <Tabs.Tab value='/profile/investions'>Приобретения и вознаграждения</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='/profile/projects' pt='xl'>
              <MyProjects/>
            </Tabs.Panel>
            <Tabs.Panel value='/profile/supports' pt='xl'>
              <Supports/>
            </Tabs.Panel>
            <Tabs.Panel value='/profile/investions' pt='xl'>
              <Investions/>
            </Tabs.Panel>
          </Tabs>
          {location === '/profile' && (
            <p>profile</p>
          )}
          {location.includes('/settings') && (
            <Settings/>
          )}
          {location.includes('/bill') && (
            <Bill/>
          )}
      </div>
    </div>
  )
}

export default Profile 