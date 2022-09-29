import React from 'react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

const allowedCategories = [
  'Музыка',
  'Литература',
  'Кино',
  'Театр',
  'Экология',
  'Спорт',
  'Наука',
  'Обучение',
  'Журналистика',
  'Благотворительность',
  'События',
]

const categories = [
  'Политика',
  'Религия',
  'Реклама',
  'Оскорбления',
  'Долги',
  'Ипотека',
  'Ставки',
  'Казино',
  'ЛГБТ', 
]

const rules = [
  'Если вам исполнилось 18 лет',
  'Вы реализуете творческую и/или общественно-полезную идею',
  'Вы сформулировали основную и финансовую цели проекта и обозначили его сроки',
  'У вас есть действующий счёт в банке',

  'Вам меньше 18 лет',
  'Вы преследуете личную цель',
  'Ваш проект связан с политической или религиозной деятельностью',
  'Проект противоречит действующему законодательству РК'

]


const styles = {
  wrapper: 'w-full py-10 sm:py-20 bg-white border-y border-slate-200',
  inner: 'flex flex-col lg:flex-row',
  block: 'w-full flex flex-col gap-y-6 sm:gap-y-10 items-center py-6 sm:py-14 border border-green-400 bg-emerald-50 rounded-md px-3',
  block2: 'w-full flex flex-col gap-y-6 sm:gap-y-10 items-center py-6 sm:py-14 px-3',
  heading: 'text-lg md:text-xl lg:text-2xl font-semibold tracking-wide',
  tag: 'inline-block px-4 py-1 bg-emerald-300 rounded-full font-semibold text-slate-600 text-sm',
  tag2: 'inline-block px-4 py-1 rounded-full border border-gray-500 text-gray-500 text-sm font-semibold'
}


function Condition() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.inner}>  
          <div className={styles.block}>
            <div className='text-3xl'>
              <FiThumbsUp className='text-emerald-500'/>
            </div>
            <h3 className={styles.heading}>
              Вы можете создать проект
            </h3>
            <div className='flex flex-wrap justify-center gap-6 max-w-lg mx-auto'>
              {allowedCategories.map(item => {
                return (
                  <div 
                    className={styles.tag}
                    key={item}
                  >
                      {item}
                  </div>
                )
              })}
            </div>
            <div>
              <p>в этих и других категориях</p>
            </div>
            <div className='max-w-sm'>
              <ul className='flex flex-col gap-6'>
                {rules.slice(0, 4).map(item => {
                  return (
                    <li className='flex gap-3' key={item}>
                      <span>
                        <AiOutlineCheckCircle className='fill-emerald-400 text-2xl'/>  
                      </span>  
                      <span>
                        {item}
                      </span>  
                    </li>  
                  )
                })}
              </ul>                  
            </div>
          </div>
          <div className={styles.block2}>
            <div className='text-3xl'>
              <FiThumbsDown className='text-red-500' />
            </div>
            <h3 className={styles.heading}>
              Проект будет отклонен
            </h3>
            <div className='flex flex-wrap justify-center gap-6 max-w-md mx-auto'>
              {categories.map(item => {
                return (
                  <div 
                    className={styles.tag2}
                    key={item}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
            <div>
              <p>Подробнее в правилах сервиса</p>
            </div>
            <div className='max-w-sm'>
              <ul className='flex flex-col gap-6'>
                {rules.slice(4).map(item => {
                  return (
                    <li className='flex gap-3' key={item}>
                      <span>
                        <AiOutlineCloseCircle className='fill-red-500 text-2xl' />  
                      </span>  
                      <span>{item}</span>  
                    </li>  
                  )
                })}
              </ul>                    
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Condition