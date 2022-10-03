import React from 'react'
import useAuth from '../hooks/useAuth'
import UserService from '../service/UserService'

import { Button, Menu } from '@mantine/core'

import { GrPowerShutdown } from 'react-icons/gr'
import { MdSupport, MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { BiData } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { RiTableAltLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import next from '../assets/images/next.png'
import { useDispatch } from '../redux/store'
import { Open } from '../redux/slices/authModalSlice'

const styles = {
  nav: 'flex items-center gap-x-4 lg:gap-x-8',
  divider: 'border-l border-slate-100 h-8',
  menu: 'flex flex-col px-4 text-sm whitespace-nowrap divide-y divide-solid',
  menuLink: 'light-link',
  profileMenuLink: 'flex items-center gap-x-6 cursor-pointer',
  icon: 'text-xl text-pink-500 hover:text-black transition-all duration-200'
}

function Header() {

  const {user} = useAuth()

  const dispatch = useDispatch()

  const signout = () => UserService.signout()

  return (
    <div className='w-full bg-white border border-slate-200 z-50 mb-8'>
      <div className='container'>
        
        <div className='flex items-center justify-between py-4'>
          <nav className={styles.nav}>
            <Menu 
              trigger='hover' 
              position='bottom-start' 
              transition='fade' 
              transitionDuration={200}
              zIndex={9999}
            >
              <Menu.Target>
                <Button 
                  unstyled 
                  className='light-link' 
                  component={Link} 
                  to='/explore'
                >
                  Проекты 
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item 
                  component={Link} 
                  to='/explore/collection/recent'
                >
                  <span className={styles.menuLink}>
                    Последние обновленные
                  </span>
                </Menu.Item>
                <Menu.Item 
                  component={Link} 
                  to='/explore/collection/new'
                >
                  <span className={styles.menuLink} >
                    Новые
                  </span>
                </Menu.Item>
                <Menu.Item 
                  component={Link} 
                  to='/explore/collection/active'
                >
                  <span className={styles.menuLink}>
                    Активные
                  </span>
                </Menu.Item>
                <Menu.Item 
                  component={Link} 
                  to='/explore/collection/discussed'
                >
                  <span className={styles.menuLink}>
                    Обсуждаемые
                  </span>
                </Menu.Item>
                <Menu.Item 
                  component={Link} 
                  to='/explore/collection/soonend'
                >
                  <span className={styles.menuLink}>
                    Близкие к завершению
                  </span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <span className='light-link'>
              <Link to='/'>
                Бизнес-инкубатор
              </Link>
            </span>
          </nav>
            <Link to={'/'}>
              <div className='relative w-8 cursor-pointer'>
                <img
                  src={next}
                  alt='logo'
                  width={35}
                  height={35}
                />
              </div>
            </Link>
          <nav className={styles.nav}>
            <Button
              compact
              size='sm'
              variant='subtle'
              component={Link}
              to='/create'
            >
              Создать проект
            </Button>
            <div className={styles.divider}></div>
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
                      <RiTableAltLine className={`${styles.icon} text-pink-500`}/>
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
                      <MdSupport className={styles.icon}/>
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
                      <BiData className={styles.icon}/>
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
                      <FiSettings className={styles.icon}/>
                      <span>
                        Настройки
                      </span>
                    </p>
                  </Menu.Item>
                  <Menu.Item 
                    onClick={signout}
                  >
                    <p className={styles.profileMenuLink}>
                      <GrPowerShutdown className={styles.icon}/>
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
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header