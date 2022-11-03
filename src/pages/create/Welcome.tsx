import React from 'react'
import ProjectService from '../../service/ProjectService';
import useAuth from '../../hooks/useAuth';
import { Button, Checkbox } from '@mantine/core';

import createWelcome from '../../assets/images/create-welcome.svg'
import { useDispatch } from '../../redux/store';
import { Open } from '../../redux/slices/authModalSlice';
import { useNavigate } from 'react-router-dom';

function Welcome() {

  const {user} = useAuth() 

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const onOpen = () => {
    dispatch(Open())
  }
  const [check, setCheck] = React.useState({
    service: false,
    data: false
  })
  
  const [loading, setLoading] = React.useState(false)

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCheck({ ...check, [name]: checked })
  }

  const createProject = () => {
    if (!user) return onOpen()
    setLoading(true)
    const id = (new Date().getTime() / 1000).toString().split('.').join('')
    ProjectService.createProject(id, {
      id: id,
      uid: user?.uid,
      user: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid, 
      },
      status: 'created',
      title: null,
      description: null,
      image: null,
      city: null,
      goal: null,
      duration: null,
      detail_description: null,
      backed: 0,
      started: null,
      category: null,
      earned: 0, 
      rewards: 0,
      comments: 0
    })
    .then((e) => {
      navigate(`/project/${id}/edit`)
    })
    .finally(() => setLoading(false))
  }

  return (
    <div className='w-full py-10 sm:py-20'>
      <div className="container">
        <div className='flex flex-col lg:flex-row justify-evenly gap-4 '>
          <div className='flex-1 max-w-lg flex flex-col justify-between gap-10'>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>
                Реализуй идею и найди единомышленников
              </h2>
            </div>
            {/* <TextInput
              className='w-full text-xl sm:text-2xl'
              placeholder='Ваш email'
              size='xl'
            /> */}
            <div >
              <div className='flex gap-2 items-center'>
                <Checkbox 
                  id='service' 
                  name='service'
                  onChange={handleCheck}
                  size='sm'
                />
                <label htmlFor='service' className='text-sm sm:textbase'>Я согласен с правила сервиса</label>
              </div>
              <div className='flex gap-2 items-center mt-2'>
                <Checkbox 
                  id='data' 
                  name='data'
                  onChange={handleCheck}
                  size='sm'
                />
                <label htmlFor='data' className='text-sm sm:textbase'>Я даю согласие на обработку своих персональных данных</label>
              </div>
            </div>
            <Button 
              className='w-full uppercase font-bold tracking-widest sm:text-xl'
              onClick={createProject}
              size='xl'
              disabled={!check.data || !check.service}
              loading={loading}
            >
              Создать проект
            </Button>
          </div>
          <div className='hidden lg:block flex-1 max-w-lg h-auto'>
            <img src={createWelcome} alt='welcome'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome