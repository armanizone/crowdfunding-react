import { Button, Menu } from '@mantine/core'
import React from 'react'
import { categories, cities } from '../../utils/db'

function FilterCategory({matches}: {matches?: boolean}) {


  return (
    <div className='grid grid-cols-1 gap-y-4 gap-x-2 md:gap-y-8'>
      {matches ? 
        <div className='space-y-2'>
          <p className='font-semibold'>Категория:</p>
          <div className='space-y-3 text-[15px]'>
            <p>Все</p>
            {categories.map((e: string, i: number) => {
              return (
                <p className='cursor-pointer' key={e}>{e}</p>
              )
            })}
          </div>
        </div>
        :
        <Menu 
          position='bottom-start'
        >
          <Menu.Target>
            <Button 
              className='w-min text-[15px] -ml-2'
              compact
              variant='subtle'
            >
              Категория: Музыка
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Все</Menu.Item>
            {categories.map((e: string, i: number) => {
              return (
                <Menu.Item key={e}>{e}</Menu.Item>
              )
            })}
          </Menu.Dropdown>
        </Menu>
      }
      {matches ?
        <div className='space-y-2'>
          <p className='font-semibold'>Срок реализации: Новые</p>
          <div className='space-y-3 text-[15px]'>
            <p>Все</p>
            <p>Новые</p>
            <p>Близкие к завершения</p>
          </div>
        </div>
        :
        <Menu
          position='bottom-start'
        >
          <Menu.Target>
            <Button 
              className='w-min text-[15px] -ml-2'
              compact
              variant='subtle'
            >
              Срок реализации: Новые
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Все</Menu.Item>
            <Menu.Item>Новые</Menu.Item>
            <Menu.Item>Близкие к завершения</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      }
      {matches ?
        <div className='space-y-2'>
          <p className='font-semibold'>Город: Павлодар</p>
          <div className='text-[15px] space-y-3'>
            <p>Все</p>
            {cities.map((e: string, i: number) => {
              return (
                <p className='cursor-pointer' key={e}>{e}</p>
                )
              })}
          </div>
        </div>
        :
        <Menu
          position='bottom-start'
        >
          <Menu.Target>
            <Button 
              className='w-min text-[15px] -ml-2'
              compact
              variant='subtle'
            >
              Город: Павлодар
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Все</Menu.Item>
            {cities.map((e: string, i: number) => {
              return (
                <Menu.Item key={e}>{e}</Menu.Item>
              )
            })}
          </Menu.Dropdown>
        </Menu>
      }
    </div>
  )
}

export default FilterCategory