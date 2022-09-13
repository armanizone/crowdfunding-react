import React from 'react'
import Accordion from './Accordion'
import Condition from './Condition'
import Welcome from './Welcome'

function Create() {
  return (
    <div>
      <Welcome/>
      <Condition/>
      <div className='container my-10 lg:my-20'>
        <Accordion/>
      </div>
    </div>
  )
}

export default Create