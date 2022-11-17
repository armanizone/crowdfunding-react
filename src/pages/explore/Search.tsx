import React from 'react'
import { Breadcrumbs, Menu, TextInput } from '@mantine/core'
import { BiSearchAlt } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
import FilterCategory from './FilterCategory'

const items = [
  {title: 'Проекты'},
  {title: 'Путешествия и отдых'},
]

function Search({ matches }: { matches: boolean}) {



  return (
    <div className='space-y-4 mb-8'>
      <TextInput
        className='w-full'
        icon={<BiSearchAlt />}
        classNames={{
          icon: 'text-3xl',
          rightSection: 'text-2xl'
        }}
        rightSection={<VscClose />}
        size='lg'
        placeholder='Поиск по проектам...'
      />
      {!matches && <FilterCategory/> }
      <div className='flex flex-col-reverse gap-y-4 sm:flex-row justify-between sm:items-center'>
        <div>
          <Breadcrumbs>
            {items.map((item: any, i: number) => {
              return <div className='text-sm text-blue-400 underline' key={i}>{item.title}</div>
            })}
          </Breadcrumbs>
        </div>
        <div className='max-w-min'>
          <Menu
            position='bottom-end'
          >
            <Menu.Target>
              <p className='text-[15px] whitespace-nowrap'>Сортировать по: <span className='text-blue-400 underline'>популярности</span> </p>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>популярности</Menu.Item>
              <Menu.Item>сумме сбора</Menu.Item>
              <Menu.Item>обновлениям</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Search