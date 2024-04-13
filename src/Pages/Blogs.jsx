import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BlogCard } from '../Components/BlogCard'
import { SearchBlog } from '../Components/SearchBlog'

export const Blogs = () => {
  return (
    // <div className=''>
    // <div className='flex flex-col gap-2'>
    //   {blogs.map(blog=><NavLink key={crypto.randomUUID()} to={`/blogs/${blog}`} className={({isActive})=>
    //     isActive ? `text-red-500` : ''
    //   }>Blog {blog}</NavLink>)}
    // </div>      
    // <Outlet />
    // </div>

    <div className='w-[full] flex justify-center'>
      <div className='w-[1210px]'>
        <main className=' py-3'>
          <SearchBlog />
          <section className='py-8'>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </section>
        </main>
        
      </div>
    </div>
  )
}