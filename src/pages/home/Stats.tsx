import React from 'react'

function Stats() {
  return (
    <div className='stats border border-slate-200 p-4 rounded-md bg-white'>
      <div className='w-full'>
        <h3 className='text-center text-3xl md:text-4xl'>Статистика</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-20'>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-2xl md:text-3xl'>387</span>
            <p className='text-xl'>Учеников бизнес инкубатора</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-2xl md:text-3xl'>228</span>
            <p className='text-xl'>Созданных проектов</p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='font-semibold text-2xl md:text-3xl'>200 000 000</span>
            <p className='text-xl'>Профинансировано</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats