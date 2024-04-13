import React from 'react'
import img from '../assets/Howtocode.jpg'
export const CategoryCard = () => {
  return (
    <div className='w-[250px] h-[270px] flex flex-col gap-7 justify-center items-center bg-[#F4F0F8] rounded-md'>
        <div className='h-[60px] w-[60px]'><img src={img} alt="Blog Image" className='h-[60px] w-[60px] object-cover rounded-full'/></div>
        <div><h1 className='font-bold text-xl'>How To Code</h1></div>
        <div className='w-[230px]'><p className='text-[#a0a0a0] text-center'>Lorem ipsum dolor sit amet consectetur. Urna dignissim ac egeendrerit in.</p></div>
    </div>
  )
}