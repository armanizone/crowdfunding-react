import React from 'react'

function Description({project}: any): JSX.Element {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: project?.detail_description }}></div>
    </div>
  )
}

export default Description