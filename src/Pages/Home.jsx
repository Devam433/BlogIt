import React from 'react'
import { Hero } from '../Components/Hero'
import { CategoryCard } from '../Components/CategoryCard'

export const Home = () => {
  return (
    <div className='w-[full] flex justify-center'>
      <div className='w-[1210px]'>
        <Hero />
        <CategoryCard />
      </div>
    </div>
  )
}
