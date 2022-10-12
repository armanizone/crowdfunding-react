import { Avatar, Button, Progress } from '@mantine/core'
import React from 'react'

const styles = {
  head: 'flex w-full grid grid-cols-1 md:grid-cols-[grid-cols-[auto_450px]] 2xl:grid-cols-[auto_550px] lg:grid-cols-[auto_450px] bg-white p-4 rounded-md border border-slate-200',
  right: 'pl-0 pt-4 lg:pt-0 lg:pl-8 flex flex-col h-full',
  left: 'w-full',
  img: 'aspect-video  w-full shadow-lg object-cover rounded-lg overflow-hidden',
  imgFill: 'aspect-video  w-full shadow-lg object-cover rounded-lg overflow-hidden bg-blue-400',
  categories: 'flex justify-between items-center -mx-2',
  categoryLabel: 'p-2 text-lg font-head font-medium',
  status: 'uppercase text-green-600 text-sm md:text-base mb-2 font-medium tracking-wide',
  title: 'text-2xl md:text-3xl font-semibold font-head',
  description: 'text-base md:text-lg mt-2 mb-7',
  author: 'flex pl-3 mb-7',
  authorAbout: 'ml-3',
  authorName: 'font-head font-medium',
  authorCity: 'text-slate-600',
  progress: '',
}

function Head({project}: any) {
  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <img src={project?.image} className={styles.img} alt=''/>
        <div className={styles.categories}>
          <span className={styles.categoryLabel}>{project?.category}</span>
          <span className={styles.categoryLabel}>{project?.city}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.status}>
          <span>
            Активен
          </span>
        </div>
        <div className={styles.title}>
          <h3>
            {project?.title ?? "Название проекта"}
          </h3>
        </div>
        <div className={styles.description}>
          <p>
            {project?.description ?? "Описание проекта"}
          </p>
        </div>
        <div className={styles.author}>
          <Avatar src={project?.image} alt="" radius="xl" size={50} />
          <div className={styles.authorAbout}>
            <p className={styles.authorName}>{project?.user?.name ?? 'Имя автора проекта'}</p>
            <p className={styles.authorCity}>
              Автор проекта
            </p>
          </div>
        </div>
        <div className="progress mb-7">
          <div className="flex justify-between">
            <div className="collected">
              <span className="text-xl font-medium mr-2 ">{project?.earned}</span>
              <span className="text-slate-500">ед.</span>
            </div>
            <div className="backers">
              <span className="text-slate-500">{project?.backed} раз </span>
              <span className="text-slate-500">поддержали</span>
            </div>
          </div>
          <Progress
            value={50}
            size="lg"
            className="my-2"
          />
          <div className="flex justify-between ">
            <div className="goal">
              <span className="text-slate-500">{isNaN(50) ? 0 : 50}% из <span className="link text-black text-lg font-medium">{project?.golad}</span> </span>
              <span className="text-slate-500">ед.</span>
            </div>
            <div className="lasted">
              <span className="">{project?.duration ?? 0}</span>
              <span className=""> д. осталось</span>
            </div>
          </div>
        </div>
        <div className="action">
          <Button className="red text-sm uppercase" size="lg" fullWidth>
            Пожертвовать
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Head