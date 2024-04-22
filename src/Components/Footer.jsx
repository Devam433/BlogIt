import React from 'react'
import { NavLink } from 'react-router-dom'
export const Footer = () => {
  return (
    <footer className='w-full h-[484px] bg-[#232536] flex justify-center '>
      <div className='w-[1210px] flex flex-col py-[18px] justify-between'>
        <header className=' w-full h-11 flex items-center justify-between  bg-[#232536] text-white'>
          <div className='flex gap-1 items-center'>
            <div className=' h-11 rounded-full border border-red-400 w-11 bg-red-300'><img src="" alt="" /></div>
            <p>BlogIt</p>
          </div>
          <nav className=' w-[360px]'>
            <ul className='flex justify-between font-bold text-base'>
                <li><NavLink to='/' className={({isActive})=>isActive ? 'text-red-900' : ''}>Home</NavLink></li>
                <li><NavLink to='/blogs' className={({isActive})=>isActive ? 'text-red-900' : ''}>Blogs</NavLink></li>
                <li><NavLink to='/about' className={({isActive})=>isActive ? 'text-red-900' : ''}>About</NavLink></li>
                <li><NavLink to='/contact' className={({isActive})=>isActive ? 'text-red-900' : ''}>Contact</NavLink></li>
                <li><NavLink to='/login' className={({isActive})=>isActive ? 'text-red-900' : ''}>Login</NavLink></li>
            </ul>
          </nav>
        </header>
        <div className='w-full flex justify-center items-center px-[50px] h-[235px] bg-[#2A2B39]'>
          <h1 className='w-[502] font-bold text-3xl text-white'>Subscribe to our news letter to get latest updates and news</h1>
          <div className='flex gap-2'>
            <input type="text" placeholder='example@email.com' className='w-[380px] h-[60px] indent-3 placeholder-neutral-400 rounded-lg'/>
            <button className='w-[186px] h-[60px] bg-[#FF5959] rounded-lg'>Login</button>
          </div>
        </div>
        <div className=''>
            <div className='flex flex-col font-semibold text-base text-[#ffffffba]'>
              <p>Developer</p>
              <p>example@email.com  00001 10000</p>
            </div>
            <div>

            </div>
        </div>
      </div>
    </footer>
  )
}