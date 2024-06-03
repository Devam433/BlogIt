import React from 'react'
import {Link} from 'react-router-dom'
import HeroImg from "../assets/HeroImg.jpg"
import { useSelector } from 'react-redux';
export const Hero = () => {
const currentUserStatus = useSelector(state=>state.auth.status);
  return (
    <section className='w-full  h-[590px] bg-[#ffffff] flex justify-center'>
        <div className='w-[1210px] flex justify-between items-center'>
            <div className='w-[600px] flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className=' font-bold text-7xl' >Read Your Curiosity</h1>
                    <p>Embark on a journey to deepen your coding expertise with our curated collection of insightful blogs. Let your curiosity thrive as you explore the world of technology. Join us and unlock endless possibilities!</p>
                </div>
                <Link to="/blogs" className=' z-0'><button className='w-[189px] h-[60px] font-bold text-xl bg-[#FF5959] rounded-lg text-white outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] '>Explore</button>
                </Link>
            </div>
            <div className='w-[570px] relative flex justify-center items-center'>
                <img src={HeroImg} alt="" />
                <Link to={currentUserStatus ? `/blogs` : `/login`} className=' absolute'><button className='w-[189px] h-[60px] font-bold text-xl bg-[#FF5959] rounded-lg text-white outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>{currentUserStatus ? `Start Reading` : ` Login`}</button>
                </Link>
            </div>
        </div> 
    </section>
  )
}
