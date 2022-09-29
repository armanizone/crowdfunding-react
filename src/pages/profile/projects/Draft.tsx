import React from 'react'



import dayjs from 'dayjs'
import useAuth from '../../../hooks/useAuth'
import { Button } from '@mantine/core'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { Heading } from '../../../components'


function Draft({values = []}: any) {

  const { user } = useAuth()

  return (
    <div className='w-full h-full relative'>
      <Heading title='Черновики' description='Черновики ваших проектов' />
      <div className='flex flex-col gap-y-8 mt-4'>
        {values?.map((item: any) => {
          const createdAt = dayjs(new Date(item?.created_at?.seconds * 1000)).locale('ru').format('DD/MM/YYYY, hh:mm')
          return (
            <div
              key={item.id}
              className='flex bg-white border border-slate-200'
            >
              <div className=''>
                {item?.image 
                  ? <img src={item.image} className='aspect-video max-w-sm object-cover' alt="" />
                  : <div className='aspect-video max-w-sm bg-slate-200'></div>
                }
              </div>
              <div className='p-4 flex-1 flex flex-col justify-between'>
                <div className='flex gap-x-4 justify-between'>
                  <div className='flex flex-col gap-y-2'>
                    <b className='text-xl'>
                      {item.title 
                        ? item.title 
                        : <Link to={`/project/${item.id}/edit`} className='link'>Добавить название</Link>}
                    </b>
                    <p className='text-slate-500'>
                      {item.description 
                        ? item.description 
                        : <Link to={`/project/${item.id}/edit`} className='link'>Добавить описание</Link>}
                    </p>
                    <p className='text-sm'>
                      {createdAt}
                    </p>
                  </div>
                  <div className='flex gap-x-2'>
                    <div className='bg-sky-100 h-min border-l-8 border-l-sky-500'>
                      <span className='text-sky-500 italic px-3 py-1 block text-sm font-semibold tracking-tight'>
                        Черновик
                      </span>
                    </div>
                    <Button
                      variant='subtle'
                      compact
                      classNames={{
                        label: 'underline',
                        leftIcon: 'text-lg'
                      }}
                      leftIcon={<FiEdit />}
                      component={Link}
                      to={`/project/${item?.id}/edit`}
                    >
                      Редактировать
                    </Button>
                    {item.status !== 'confirmed' ?
                      <Button
                        color={'red'}
                        variant='subtle'
                        compact
                        classNames={{
                          label: 'underline',
                          leftIcon: 'text-lg'
                        }}
                        leftIcon={<RiDeleteBin6Fill />}
                      >
                        Удалить
                      </Button>
                      :
                      <Button
                        disabled={item.status !== 'confirmed'}
                        compact
                      >
                        Запустить
                      </Button>
                    }
                  </div>
                </div>
                {/* <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-light text-sm uppercase tracking-wide'>Собрано</p>
                    <p className='font-bold text-xl text-center'>{item.backed}</p>
                  </div>
                  <div>
                    <p className='font-light text-sm uppercase tracking-wide'>Просмотры</p>
                    <p className='font-bold text-xl text-center'>{item.backed}</p>
                  </div>
                  <div>
                    <p className='font-light text-sm uppercase tracking-wide'>Приобретено</p>
                    <p className='font-bold text-xl text-center'>{item.backed}</p>
                  </div>
                  <div>
                    <p className='font-light text-sm uppercase tracking-wide'>Комментариев</p>
                    <p className='font-bold text-xl text-center'>{item.backed}</p>
                  </div>
                </div> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Draft