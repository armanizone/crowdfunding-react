import { Tabs } from '@mantine/core'
import React from 'react'

function ProjectMain({project}: any) {
  return (
    <div className='bg-white p-4 rounded-md border border-slate-200 w-full'>
      <Tabs
        variant='pills'
        classNames={{
          tabLabel: 'text-xl'
        }}
        className='w-full'
        defaultValue='Детали проекта'
      >
        <Tabs.List
          grow
        >
          <Tabs.Tab value='Детали проекта'>Детали проекта</Tabs.Tab>
          <Tabs.Tab value='История проекта'>История проекта</Tabs.Tab>
          <Tabs.Tab value='Дневник проекта'>Дневник проекта</Tabs.Tab>
          <Tabs.Tab value='Экспертное мнение'>Экспертное мнение</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='Детали проекта' pt={'xl'}>
          <div dangerouslySetInnerHTML={{ __html: project?.detail_description }}></div>
        </Tabs.Panel>
        <Tabs.Panel value='История проекта' pt={'xl'}>
          <h2 className='flex justify-center items-center text-xl'>В разработке</h2>
        </Tabs.Panel>
        <Tabs.Panel value='Дневник проекта' pt={'xl'}>
          <h2 className='flex justify-center items-center text-xl'>В разработке</h2>
        </Tabs.Panel>
        <Tabs.Panel value='Экспертное мнение' pt={'xl'}>
          <h2 className='flex justify-center items-center text-xl'>В разработке</h2>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default ProjectMain