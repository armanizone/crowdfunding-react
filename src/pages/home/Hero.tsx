import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/images/hero.png'
import { Open } from '../../redux/slices/authModalSlice'
import { useDispatch } from '../../redux/store'

function Hero() {


  const dispatch = useDispatch()
  const open = () => dispatch(Open())

  return (
    <div className="relative overflow-hidden bg-white mb-8 -mt-8">
      <div className="container">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <div className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            </div>
          </div>
          <main className="mx-auto mt-10 max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl">
                <span >Краудфандинговая </span>
                <span className="text-blue-600">платформа</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam ut tenetur pariatur provident nostrum recusandae asperiores placeat, corrupti nihil et.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/create" className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg">
                    Создать проект
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <span onClick={open} className="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-blue-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">
                    Войти
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-contain sm:h-72 md:h-96 lg:h-full lg:w-full" src={heroImg} alt='' />
        </div>
      </div>
    </div>

  )
}

export default Hero