import { Button, Menu } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../Header'


function ExploreMenu() {
  return (
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
  )
}

export default ExploreMenu