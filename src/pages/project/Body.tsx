import { Tabs } from '@mantine/core'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'
import Description from './Description'
import Faq from './Faq'
import Fee from './Fee'
import Rating from './Rating'

function Body({project, rewards}: any) {

  const location = useLocation().pathname

  const navigate = useNavigate()

  const { id } = useParams()

  const tabValue =
    (location.includes(`/project/${id}/comments`) && `/project/${id}/comments`) ||
    (location.includes(`/project/${id}/faq`) && `/project/${id}/faq`) ||
    (location.includes(`/project/${id}/fee`) && `/project/${id}/fee`) ||
    (location.includes(`/project/${id}/rating`) && `/project/${id}/rating`) || `/project/${id}`

  const handleTab = (value: string) => {
    navigate(value)
  }


  return (
    <div className='p-4 rounded-md w-full'>
      <Tabs
        classNames={{
          tabLabel: 'text-xl'
        }}
        className='w-full'
        value={tabValue}
        onTabChange={(value) => handleTab(value as string)}
      >
        <Tabs.List
          grow
        >
          <Tabs.Tab value={`/project/${id}`}>Описание</Tabs.Tab>
          <Tabs.Tab value={`/project/${id}/comments`}>Коментарии</Tabs.Tab>
          <Tabs.Tab value={`/project/${id}/faq`}>FAQ</Tabs.Tab>
          <Tabs.Tab value={`/project/${id}/rating`}>Экспертное мнение</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={`/project/${id}`} pt={'xl'}>
          <Description project={project}/>
          {/* <div dangerouslySetInnerHTML={{ __html: project?.detail_description }}></div> */}
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/comments`} pt={'xl'}>
          <Comments/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/faq`} pt={'xl'}>
          <Faq/>
        </Tabs.Panel>
        <Tabs.Panel value={`/project/${id}/rating`} pt={'xl'}>
          <Rating/>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Body