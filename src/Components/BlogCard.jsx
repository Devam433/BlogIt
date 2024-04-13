import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/Howtocode.jpg'
export const BlogCard = () => {
  return (
    <div className='h-[310px] w-full flex gap-7 items-center mb-3'>
        <div className='w-[480px]'>
            <img src={img} alt="Blog Image" className='h-[310px] w-[480px] object-cover rounded-[2px]'/>
        </div>
        <div className='flex flex-col gap-[21px] w-[660px]'>
            <div><h1 className=' font-bold text-3xl'>How to code for complete beginners</h1></div>
            <div className='flex gap-2 items-center'>
                <div className=''><img src={img} alt="" className='w-[30px] h-[30px] object-cover rounded-[50%]'/></div>
                <div className='flex flex-col'>
                    <div><h1 className='font-bold text-[#2B2C34] text-[13px]'>Devam</h1></div>
                    <div><p>Jan 10,2024 : 3 Min Read</p></div>
                </div>
            </div>
            <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse soluta nisi saepe alias vitae quisquam nulla ex labore quos rerum! Possimus sint sit saepe perspiciatis aperiam ipsam debitis hic nostrum accusantium deserunt sapiente quam atque, ullam illo quia adipisci. Ratione.</p>
            </div>
            <Link to=":blogid">
                <button className='w-[192px] h-[33px] bg-[#FF5959] text-white font-bold text-sm rounded-lg'>Read full article</button>
            </Link>
        </div>
    </div>
  )
}