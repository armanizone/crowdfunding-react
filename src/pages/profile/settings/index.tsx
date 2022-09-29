import { Tabs } from '@mantine/core'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdSettings, MdLock } from 'react-icons/md'
import UserData from './UserData'
import ChangePassword from './ChangePassword'

function Settings() {

  const location = useLocation().pathname
  const navigate = useNavigate()

  const tabValue =
    (location.includes('settings/change-password') && 'settings/change-password') || 'settings'

  const handleTabChange = (value: string | null) => {
    navigate(`/profile/${value}`)
  }

  return (
    <div className='w-full h-full bg-white mt-6'>
      <Tabs
        orientation='vertical'
        classNames={{
          tabIcon: 'text-2xl p-4',
          tabsList: 'bg-white',
          root: 'border'
        }}
        value={tabValue}
        onTabChange={value => handleTabChange(value)}
      >
        <Tabs.List>
          <Tabs.Tab value='settings' icon={<MdSettings />}></Tabs.Tab>
          <Tabs.Tab value='settings/change-password' icon={<MdLock />} ></Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='settings' p='xl' className='bg-white'>
          <UserData />
        </Tabs.Panel>
        <Tabs.Panel value='settings/change-password' p='xl' className='bg-white'>
          <ChangePassword />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Settings