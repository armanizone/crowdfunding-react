import React from 'react'
import { CreateButtons } from '../../../components'

import cn from 'classnames'
import { Button, Textarea } from '@mantine/core'

const string = 
  `Lorem ipsum dolor sit amet consectetur 
  adipisicing elit.Quo sunt ea laborum, laboriosam repellendus, similique quisquam sapiente aliquid voluptas esse id odit autem accusamus porro corporis optio.Omnis, ad cupiditate`


function Incubator() {

  const [selected, setSelected] = React.useState<number | undefined>(undefined)

  const handleCell = (index: number) => {
    setSelected(index)
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='grid grid-cols-[70%_30%] gap-x-4'>
          <div>
            <div className='grid grid-cols-6'>
              {Array(24).fill(1).map((item, i) => {
                return (
                  <div 
                    key={i}
                    className={cn(
                      'incubator-child p-4 border border-slate-200 h-24 cursor-pointer flex justify-center items-center transition-all duration-200', {
                      'bg-blue-400 text-white': selected === i + 1
                    })}
                    onClick={() => handleCell(i + 1)}
                  >
                    День {i +1 } 
                  </div>
                )
              })}
            </div>
            <div className='w-full mt-4'>
              <Textarea
                label='Ваш комментарий'
                placeholder='Комментарий'
              />
              <div className='flex justify-end mt-4'>
                <Button
                onClick={() => {
                  alert('Данные сохранены')
                }}
                >
                  Отправить
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className='text-xl '>Задание которое хранится внутри ячейки {selected && selected}:</p>
            <p className='mt-4'>
              {string.slice(Math.round(Math.random()), Math.round(Math.random() * 219))}
            </p>
          </div>
        </div>
      </div>
      <CreateButtons 
        incubator 
      />
    </div>
  )
}

export default Incubator