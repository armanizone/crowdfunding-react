import React from 'react';
import { createEmotionCache, MantineProvider, Modal } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
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
import MyProjects from './pages/profile/projects';
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
import Settings from './pages/profile/settings';
import Draft from './pages/profile/projects/Draft';
import Active from './pages/profile/projects/Active';
import Closed from './pages/profile/projects/Closed';
import UserData from './pages/profile/settings/UserData';
import ChangePassword from './pages/profile/settings/ChangePassword';
import { theme } from './utils/theme';

function App() {

  const {opened} = useSelector(state => state.authModalReducer)
  const dispath = useDispatch()

  const onClose = () => {
    dispath(Close())
  }

  return ( 
    <MantineProvider>
      <ModalsProvider>
        <NotificationsProvider position='top-right'>
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
              <Route path='/profile' element={<Profile/>} >
                <Route path='bill' element={<Bill/>} />
                <Route path='investions' element={<Investions/>} />
                <Route path='projects' element={<MyProjects/>} >
                  <Route index element={<Draft/>}/>
                  <Route path='active' element={<Active/>}/>
                  <Route path='closed' element={<Closed/>}/>
                </Route>
                <Route path='supports' element={<Supports/>} />
                <Route path='settings' element={<Settings/>} >
                  <Route index element={<UserData/>} />
                  <Route path='change-password' element={<ChangePassword/>} />
                </Route>
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
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
