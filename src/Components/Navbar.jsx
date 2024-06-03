import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileMenu from './ProfileMenu';
export const Navbar = () => {

  const currentUserStatus=useSelector(state=>state.auth.status);
  const navItems = [
    {
      name:'Home',
      url:'/',
      isActive:true
    },
    {
      name:'Blogs',
      url:'/blogs',
      isActive:true
    },
    {
      name:'Login',
      url:'/login',
      isActive: !currentUserStatus
    },
    {
      name:'SignUp',
      url:'/signup',
      isActive: !currentUserStatus
    },
    {
      name:'Add Post',
      url:'/addpost',
      isActive: currentUserStatus
    },
  ]

  return (
    <header className='w-full h-20 border border-black flex items-center px-[50px] py-[15px] justify-between  bg-[#160738] text-white fixed top-0 z-10'>
        <div className='flex gap-1 items-center'>
            <div className=' h-12 rounded-full border border-red-400 w-12 bg-red-300'><img src="" alt="" /></div>
            <p>BlogIt</p>
        </div>
        <nav className=' w-[500px] mr-5 top-0'>
            <ul className='flex justify-between font-bold text-base items-center'>
              {
                navItems.map((item)=>{
                  if(item.isActive === true) {
                    return <li key={crypto.randomUUID()}><NavLink to={item.url} className={({isActive})=>isActive ? 'text-red-600' : ''}>{item.name}</NavLink></li>
                  }
                })
              }
              {
                currentUserStatus && <ProfileMenu />
              }
              {/* {currentUserStatus && <LogoutBtn/>} */}
            </ul>
        </nav>
    </header>
  )
}