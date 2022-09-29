import React from 'react'
import useAuth from '../../hooks/useAuth'
import Courses from './Courses'
import Cover from './Cover'
import Sidebar from './Sidebar'
import Stats from './Stats'


const Home = () => {

  const {user} = useAuth()

  return (
    <>
      <div>

        <div className="container">
          <div className='main-grid'>
            <Cover/> 
            <Sidebar/>
            <Stats/>
            <Courses/>
          </div>
        </div>
      </div>
    </>
  )
} 


export default Home
 