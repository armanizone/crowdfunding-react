import { Tabs } from '@mantine/core'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'
import Description from './Description'
import Faq from './Faq'
import Incubator from './Incubator'
import Rating from './Rating'

function Body({project, projectId}: any) {

  const location = useLocation().pathname

  const navigate = useNavigate()

  const { id } = useParams()

  const tabValue =
    (location.includes(`/project/${id}/comments`) && `/project/${id}/comments`) ||
    (location.includes(`/project/${id}/faq`) && `/project/${id}/faq`) ||
    (location.includes(`/project/${id}/fee`) && `/project/${id}/fee`) ||
    (location.includes(`/project/${id}/incubator`) && `/project/${id}/incubator`) ||
    (location.includes(`/project/${id}/rating`) && `/project/${id}/rating`) || `/project/${id}`

  const handleTab = (value: string) => {
    navigate(value)
  }
  
  return (
    <div className='rounded-md w-full'>
      <Tabs
        classNames={{
          tabLabel: 'text-base md:text-lg',
          panel: 'bg-white mt-5 rounded-md p-3 md:p-4'
        }}
        className='w-full'
        value={tabValue}
        onTabChange={(value) => handleTab(value as string)}
      >
        <Tabs.List
          grow
        >
          <Tabs.Tab disabled={projectId} value={`/project/${id}`}>Описание</Tabs.Tab>
          <Tabs.Tab disabled={projectId} value={`/project/${id}/faq`}>FAQ</Tabs.Tab>
          <Tabs.Tab disabled={projectId} value={`/project/${id}/comments`}>Коментарии</Tabs.Tab>
          <Tabs.Tab disabled={projectId} value={`/project/${id}/rating`}>Экспертное мнение</Tabs.Tab>
          <Tabs.Tab disabled={projectId} value={`/project/${id}/incubator`}>Бизнес-Инкубатор</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={`/project/${id}`}>
          <Description project={project}/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/faq`}>
          <Faq/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/comments`}>
          <Comments/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/rating`}>
          <Rating/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/incubator`}>
          <Incubator/>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Body