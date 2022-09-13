import React from 'react'
import { Accordion as Acc } from '@mantine/core'

function Accordion() {
  return (
    <div>
      <Acc defaultValue='acc'>
        <Acc.Item value='acc'>
          <Acc.Control>Вопрос</Acc.Control>
          <Acc.Panel>Ответ на вопрос</Acc.Panel>
        </Acc.Item>
      </Acc>
    </div>
  )
}

export default Accordion
