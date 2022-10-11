import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function UserBar() {

  const {user} = useAuth()

  return (
    <div className='flex justify-between mb-3 bg-white border p-3 md:p-4'>
      <div className='flex items-center gap-3 md:gap-4'>
        <img
          src={user?.photoURL ?? 'https://s7.planeta.ru/p?url=https%3A%2F%2Fstatic.planeta.ru%2Fimages%2Favatars%2Fava-u-03.jpg&width=150&height=150&crop=true&pad=false&disableAnimatedGif=true'}
          alt=""
          className='w-12 shadow-lg shadow-sky-300'
        />
        <div>
          <b className='text-sm md:text-base'>{user?.displayName ?? 'sasageyo'}</b>
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
  )
}

export default UserBar