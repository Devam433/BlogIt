import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoutBtn } from './LogoutBtn'
export const Footer = () => {

  const currentUserStatus = useSelector(state=>state.auth.status)

  return (
    <footer className='w-full h-[484px] bg-[#232536] flex justify-center  bottom-0'>
      <div className='w-[1210px] flex flex-col py-[18px] justify-between'>
        <header className=' w-full h-11 flex items-center justify-between  bg-[#232536] text-white'>
          <div className='flex gap-1 items-center'>
            <div className=' h-11 rounded-full border border-red-400 w-11 bg-red-300'><img src="" alt="" /></div>
            <p>BlogIt</p>
          </div>
          <nav className=' w-[360px]'>
            <ul className='flex justify-between font-bold text-base items-center'>
                <li><NavLink to='/' className={({isActive})=>isActive ? 'text-red-900' : ''}>Home</NavLink></li>
                <li><NavLink to='/blogs' className={({isActive})=>isActive ? 'text-red-900' : ''}>Blogs</NavLink></li>
                <li><NavLink to='/about' className={({isActive})=>isActive ? 'text-red-900' : ''}>About</NavLink></li>
                <li>{currentUserStatus ? <LogoutBtn/> :<NavLink to={`/login`}className={({isActive})=>isActive ? 'text-red-900' : ''}>{`Login`}</NavLink> }</li>
            </ul>
          </nav>
        </header>
        <div className="w-full flex flex-col items-center py-8  text-white">
    <h2 className="text-3xl font-bold mb-4">Discover More</h2>
    <p className="text-center max-w-md">
        Explore our blog to find interesting articles, insights, and tips.
    </p>
</div>


        <div className=''>
            <div className='flex flex-col font-semibold text-base text-[#ffffffba]'>
              <p>Deveoper Contact</p>
              <p>devam433@gmail.com</p>
            </div>
            <div>

            </div>
        </div>
      </div>
    </footer>
  )
}