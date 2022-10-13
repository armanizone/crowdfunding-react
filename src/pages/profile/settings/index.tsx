import { Tabs } from '@mantine/core'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdSettings, MdLock } from 'react-icons/md'
import UserData from './UserData'
import ChangePassword from './ChangePassword'
import { useMediaQuery } from '@mantine/hooks'

function Settings() {

  const location = useLocation().pathname
  const navigate = useNavigate()

  const tabValue =
    (location.includes('settings/change-password') && 'settings/change-password') || 'settings'

  const handleTabChange = (value: string | null) => {
    navigate(`/profile/${value}`)

  }

  const matches = useMediaQuery('(min-width: 978px)');

  return (
    <div className='w-full h-full bg-white mt-6'>
      <Tabs
        orientation={matches ? 'vertical' : 'horizontal'}
        classNames={{
          tabIcon: 'text-2xl p-4',
          tabsList: 'bg-white',
          root: 'border'
        }}
        value={tabValue}
        onTabChange={value => handleTabChange(value)}
      >
        <Tabs.List
          position={matches ? 'left' : 'center'}
        >
          <Tabs.Tab value='settings' icon={<MdSettings />}></Tabs.Tab>
          <Tabs.Tab value='settings/change-password' icon={<MdLock />} ></Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='settings' className='p-3 md:p-6'>
          <UserData />
        </Tabs.Panel>
        <Tabs.Panel value='settings/change-password' className='p-3 md:p-6'>
          <ChangePassword />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Settings