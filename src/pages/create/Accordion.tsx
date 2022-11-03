import React from 'react'
import { Accordion as Acc } from '@mantine/core'

function Accordion() {
  return (
    <div className='w-full'>
      <h2 className='text-center text-2xl font-medium mb-8'>Часто-задаваемые вопросы</h2>
      <div className='rounded-md overflow-hidden'>
        <Acc defaultValue='acc' variant='separated' radius={'md'}>
          {Array(10).fill(1).map((e, i: number) => {
            return (
              <Acc.Item value={String(i)} key={i} className='bg-white'>
                <Acc.Control>
                  Lorem ipsum dolor sit amet.
                </Acc.Control>
                <Acc.Panel>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eaque officiis aliquid veritatis obcaecati unde vero reiciendis autem vel, architecto dolore ipsum magnam voluptatem voluptatibus modi ad, labore inventore facilis!
                </Acc.Panel>
              </Acc.Item>
            )
          })}
        </Acc>
      </div>
    </div>
  )
}

export default Accordion
