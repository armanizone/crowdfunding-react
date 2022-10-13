import { Button, Menu } from '@mantine/core'
import React from 'react'
import { BiData } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { GrPowerShutdown } from 'react-icons/gr'
import { MdOutlineAccountBalanceWallet, MdSupport } from 'react-icons/md'
import { RiTableAltLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useDispatch } from '../../redux/store'
import UserService from '../../service/UserService'

import { Open } from '../../redux/slices/authModalSlice'

import { styles } from '../Header'



function UserMenu({ mobile }: { mobile?: boolean }) {

  const { user } = useAuth()

  const dispatch = useDispatch()

  const signout = () => UserService.signout()

  if (mobile) return (

    <div className='flex flex-col gap-y-5 text-sm'>
      <Button
        component={Link}
        to='/profile'
        size='sm'
        variant='subtle'
        compact
      >
        Профиль
      </Button>
      <Link
        to='/profile/projects'
        className={`${styles.profileMenuLink} font-medium tracking-wide`}
      >
        <RiTableAltLine className={`${styles.icon} text-pink-500`} />
        <span>
          Созданные проекты
        </span>
      </Link>

      <Link
        to='/profile/supports'
        className={`${styles.profileMenuLink} font-medium tracking-wide`}
      >
        <MdSupport className={styles.icon} />
        <span>
          Поддержанные проекты
        </span>
      </Link>

      <Link
        to='/profile/investions'
        className={`${styles.profileMenuLink} font-medium tracking-wide`}
      >
        <BiData className={styles.icon} />
        <span>
          Мои заказы
        </span>
      </Link>

      <Link
        className={`${styles.profileMenuLink} font-medium tracking-wide`}
        to='/profile/bill'
      >
        <MdOutlineAccountBalanceWallet className={styles.icon} />
        <span>
          Баланс
        </span>
      </Link>
      <Link
        to='/profile/settings'
        className={`${styles.profileMenuLink} font-medium tracking-wide`}>
        <FiSettings className={styles.icon} />
        <span>
          Настройки
        </span>
      </Link>
      <p
        onClick={signout}
        className={`${styles.profileMenuLink} font-medium tracking-wide`}>
        <GrPowerShutdown className={styles.icon} />
        <span>
          Выход
        </span>
      </p>
    </div>
  )

  return (
    <>
      {user ?
        <Menu
          trigger='hover'
          position='bottom-end'
          transition='fade'
          transitionDuration={200}
        >
          <Menu.Target>
            <Button
              component={Link}
              to='/profile'
              size='sm'
              variant='subtle'
              compact
            >
              Профиль
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              to='/profile/projects'
            >
              <p className={styles.profileMenuLink}>
                <RiTableAltLine className={`${styles.icon} text-pink-500`} />
                <span>
                  Созданные проекты
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              component={Link}
              to='/profile/supports'
            >
              <p className={styles.profileMenuLink}>
                <MdSupport className={styles.icon} />
                <span>
                  Поддержанные проекты
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              component={Link}
              to='/profile/investions'
            >
              <p className={styles.profileMenuLink}>
                <BiData className={styles.icon} />
                <span>
                  Мои заказы
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              component={Link}
              to='/profile/bill'
            >
              <p className={styles.profileMenuLink}>
                <MdOutlineAccountBalanceWallet className={styles.icon} />
                <span>
                  Баланс
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              component={Link}
              to='/profile/settings'
            >
              <p className={styles.profileMenuLink}>
                <FiSettings className={styles.icon} />
                <span>
                  Настройки
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              onClick={signout}
            >
              <p className={styles.profileMenuLink}>
                <GrPowerShutdown className={styles.icon} />
                <span>
                  Выход
                </span>
              </p>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        :
        <Button
          compact
          size='sm'
          variant='subtle'
          onClick={() => {
            dispatch(Open())
          }}
        >
          Вход
        </Button>
      }
    </>
  )

}

export default UserMenu