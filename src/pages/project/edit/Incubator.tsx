import React from 'react'
import { EditProjectProps } from '../../../pages/project/edit'
import { CreateButtons } from '../../../components'

function Incubator({project}: EditProjectProps) {
  return (
    <div>
      <CreateButtons />
    </div>
  )
}

export default Incubator