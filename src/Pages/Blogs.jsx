import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export const Blogs = () => {
  const blogs =[1,2,3,4,5,6];
  return (
    <div className=''>
    <div className='flex flex-col gap-2'>
      {blogs.map(blog=><NavLink key={crypto.randomUUID()} to={`/blogs/${blog}`} className={({isActive})=>
        isActive ? `text-red-500` : ''
      }>Blog {blog}</NavLink>)}
    </div>      
    <Outlet />
    </div>

    
  )
}
