import React from 'react'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
  return (
    <header className='w-full h-20 border border-black flex items-center px-[50px] py-[15px] justify-between  bg-[#232536] text-white'>
        <div className='flex gap-1 items-center'>
            <div className=' h-12 rounded-full border border-red-400 w-12 bg-red-300'><img src="" alt="" /></div>
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
  )
}
