import React from 'react';
import { createEmotionCache, MantineProvider, Modal } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './components/Authform';
import { Footer, Header } from './layout';
import About from './pages/about';
import EarlyAccess from './pages/about/early-access';
import Programs from './pages/about/programs';
import Projects from './pages/about/projects';
import Create from './pages/create';
import Explore from './pages/explore';
import Collection from './pages/explore/collection';
import Home from './pages/home';
import Profile from './pages/profile';
import Bill from './pages/profile/Bill';
import Investions from './pages/profile/Investions';
import MyProjects from './pages/profile/MyProjects';
import Supports from './pages/profile/Supports';
import Project from './pages/project';
import EditProject from './pages/project/edit';
import Details from './pages/project/edit/Details';
import Incubator from './pages/project/edit/Incubator';
import Main from './pages/project/edit/Main';
import Rewards from './pages/project/edit/Rewards';
import Verification from './pages/project/edit/Verification';
import { useDispatch, useSelector } from './redux/store';
import { Close } from './redux/slices/authModalSlice';

function App() {

  const {opened} = useSelector(state => state.authModalReducer)
  const dispath = useDispatch()

  const onClose = () => {
    dispath(Close())
  }
  const cache = createEmotionCache({ key: 'mantine' })

  return (
    <MantineProvider
      emotionCache={cache}
    >
      <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>  
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/about'>
            <Route index element={<About/>} />
            <Route path='early-acces' element={<EarlyAccess/>}/>
            <Route path='programs' element={<Programs/>} />
            <Route path='projects' element={<Projects/>} />
          </Route>
          <Route path='/explore'>
            <Route index element={<Explore/>} />
            <Route path='collection/:name' element={<Collection/>} />
          </Route>
          <Route path='/profile'>
            <Route index element={<Profile/>} />
            <Route path='bill' element={<Bill/>} />
            <Route path='investions' element={<Investions/>} />
            <Route path='projects' element={<MyProjects/>} />
            <Route path='supports' element={<Supports/>} />
          </Route>
          <Route path='/project/:id'>
            <Route index element={<Project/>}/>
            <Route path='edit' element={<EditProject/>}>
              <Route index element={<Main/>} />
              <Route path='details' element={<Details/>}/>
              <Route path='rewards' element={<Rewards/>}/>
              <Route path='verification' element={<Verification/>}/>
              <Route path='incubator' element={<Incubator/>}/>
            </Route>
          </Route>
        </Routes>
        <Footer/>
      </div>
      <Modal
        opened={opened}
        onClose={onClose}
        title='Авторизация'
        size='sm'
        centered
        closeOnClickOutside={false}
        closeOnEscape
        lockScroll
      >
        <AuthForm/>
      </Modal>
    </MantineProvider>
  );
}

export default App;
