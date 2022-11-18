import React from 'react'
import { Avatar, Button, Progress } from '@mantine/core'

function Head({project}: any) {

  const author = project?.user

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-[grid-cols-[auto_450px]] 2xl:grid-cols-[auto_550px] lg:grid-cols-[auto_450px] gap-4 rounded-lg'>
      <div className='w-full'>
        {project?.image ? (
          <img src={project?.image} className='aspect-video  w-full shadow-lg object-cover overflow-hidden' alt=''/>
        ) 
          : <div className='aspect-video  w-full shadow-lg object-cover rounded-tl-lg lg:rounded-br-lg rounded-tr-lg lg:rounded-tr-none overflow-hidden bg-slate-200'></div>
        }
        <div className='flex justify-between items-center lg:-mx-3'>
          <span className='p-3 text-lg font-head font-medium'>{project?.category}</span>
          <span className='p-3 text-lg font-head font-medium'>{project?.city}</span>
        </div>
      </div>
      <div className='flex flex-col h-full px-3 md:px-4 bg-white rounded-lg'>
        <div className='mb-2'>
          <span className='uppercase text-green-600 text-xs md:text-sm font-semibold tracking-wide'>
            Идет сбор
          </span>
        </div>
        <div className='text-2xl md:text-3xl font-semibold font-head'>
          <h3>
            {project?.title ?? "Название проекта"}
          </h3>
        </div>
        <div className='text-base md:text-lg mt-2 mb-7'>
          <p>
            {project?.description ?? "Описание проекта"}
          </p>
        </div>
        <div className='flex pl-3 mb-7'>
          <Avatar src={author?.photoURL} alt="" radius="xl" size={50} />
          <div className='ml-3'>
            <p className='font-head font-medium'>{author?.displayName ?? 'Имя автора проекта'}</p>
            <p className='text-slate-600'>
              Автор проекта
            </p>
          </div>
        </div>
        <div className="progress mb-7">
          <div className="flex justify-between">
            <div className="collected">
              <span className="text-xl font-medium mr-2 ">{project?.earned}</span>
              <span className="text-slate-500">ед.</span>
            </div>
            <div className="backers">
              <span className="text-slate-500">{project?.backed} раз </span>
              <span className="text-slate-500">поддержали</span>
            </div>
          </div>
          <Progress
            value={Math.round(Math.random() * 100)}
            size="lg"
            className="my-2"
          />
          <div className="flex justify-between ">
            <div className="goal">
              <span className="text-slate-500">{isNaN(50) ? 0 : 50}% из <span className="link text-black text-lg font-medium">{project?.goal}</span> </span>
              <span className="text-slate-500">ед.</span>
            </div>
            <div className="lasted">
              <span className="">{project?.duration ?? 0}</span>
              <span className=""> д. осталось</span>
            </div>
          </div>
        </div>
        <div className="action">
          <Button className="red text-sm uppercase" size="lg" fullWidth>
            Пожертвовать
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Head