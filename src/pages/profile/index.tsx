import React from 'react'
import { Tabs } from '@mantine/core'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Investions from './Investions'
import MyProjects from '../profile/projects'
import Supports from './Supports'
import Settings from '../profile/settings'
import Bill from './Bill'

function Profile() {
  
  const {user} = useAuth()

  const location = useLocation().pathname
  const navigate = useNavigate()

  const tabValue =
    (location.includes('/profile/projects') ? '/profile/projects' : '') ||
    (location.includes('/profile/supports') ? '/profile/supports' : '') ||
    (location.includes('/profile/investions') ? '/profile/investions' : '') || '/profile'

  const handleTabChange = (value: string | null) => {
    navigate(value!)
  }

  return (
    <div className='w-full'>
      <div className="container">
        <div className='flex justify-between mb-3 bg-white border p-4'>
          <div className='flex items-center gap-4'>
            <img 
              src={user?.photoURL ?? 'https://s7.planeta.ru/p?url=https%3A%2F%2Fstatic.planeta.ru%2Fimages%2Favatars%2Fava-u-03.jpg&width=150&height=150&crop=true&pad=false&disableAnimatedGif=true'} 
              alt=""
              className='w-12 shadow-lg shadow-sky-300' 
            />
            <div>
              <b>{user?.displayName ?? 'sasageyo'}</b>
              <p>
                <Link to={'/profile/settings'} className='link underline text-xs'>
                  Настройки
                </Link>
              </p>
            </div>
          </div>
          <div>
            <div>
              <span className='mr-2 text-sm'>Ваш баланс</span>
              <span className='italic font-medium'>0 T</span>
            </div>
            <p>
              <Link to={'/profile/bill'} className='link underline text-xs'>
                Управление балансом
              </Link>
            </p>
          </div>
        </div>
        <div>
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
    </div>
  )
}

export default Profile 