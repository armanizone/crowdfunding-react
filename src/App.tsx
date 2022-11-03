import React from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { Route, Routes } from 'react-router-dom';
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
import Rewards from './pages/project/edit/Rewards/Rewards';
import Verification from './pages/project/edit/Verification';
import Settings from './pages/profile/settings';
import Draft from './pages/profile/projects/Draft';
import Active from './pages/profile/projects/Active';
import Closed from './pages/profile/projects/Closed';
import UserData from './pages/profile/settings/UserData';
import ChangePassword from './pages/profile/settings/ChangePassword';

import Incubator1 from './pages/project/Incubator';

import Comments from './pages/project/Comments';
import Faq from './pages/project/Faq';
import Rating from './pages/project/Rating';
import Description from './pages/project/Description';
import Fee from './pages/project/Fee';
import AuthModal from './components/AuthModal';

function App() {

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
                <Route element={<Project/>}>
                  <Route index element={<Description/>} />
                  <Route path='comments' element={<Comments/>} />
                  <Route path='faq' element={<Faq/>} />
                  <Route path='rating' element={<Rating/>} />
                  <Route path='incubator' element={<Incubator1/>} />
                  <Route path='fee' element={<Fee/>} />
                </Route>

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
          <AuthModal/>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
