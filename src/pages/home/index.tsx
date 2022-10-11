import React from 'react'
import Courses from './Courses'
import Cover from './Cover'
import Hero from './Hero'
import Sidebar from './Sidebar'
import Stats from './Stats'

function Home (): JSX.Element {
  return (
    <>
      <div>
        <Hero/>
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
