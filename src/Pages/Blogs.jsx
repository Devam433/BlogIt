import React, { useEffect, useState } from 'react'
import { BlogCard } from '../Components/BlogCard'
import { SearchBlog } from '../Components/SearchBlog'
import ContentLoader from 'react-content-loader';
import fetchPost from '../thunks/postThunk';
import { useDispatch, useSelector } from 'react-redux';

export const Blogs = () => {
  const {allPosts,isLoading} = useSelector((state)=>state.posts);

  const dispatch = useDispatch()  

  useEffect(() => {
    if(allPosts.length === 0)
    dispatch(fetchPost());
  }, [allPosts.length]);


  return !isLoading ? (
    <div className='w-[full] flex justify-center mt-28'>
      <div className='w-[1210px]'>
        <main className=' py-3'>
          <SearchBlog />
          <section className='py-8'>
            {allPosts.map((post)=>{ 
              return  <div key={post.$id}>
                      <BlogCard {...post}/>
                    </div>
            })}
          </section>
        </main>
      </div>
    </div>
  )
  :
  (
    <div className='flex justify-center mt-44'>
    <ContentLoader 
          speed={1}
          width={1210}
          height={1000}
          viewBox="0 0 1210 1000"
          backgroundColor="#e9e9e9" 
          foregroundColor="#f3f3f3"
        >
    {/* First row */}
    <rect x="0" y="0" width="480" height="310"/>
    <rect x="530" y="0" width="720" height="310"/>
    {/* Second row */}
    <rect x="0" y="330" width="480" height="310"/>
    <rect x="530" y="330" width="720" height="310"/>
    {/* Third row */}
    <rect x="0" y="660" width="480" height="310"/>
    <rect x="530" y="660" width="720" height="310"/>
    {/* Fourth row */}
    <rect x="0" y="990" width="480" height="310"/>
    <rect x="530" y="990" width="720" height="310"/>
    {/* Fifth row */}
    <rect x="0" y="1320" width="480" height="310"/>
    <rect x="530" y="1320" width="720" height="310"/>
    {/* Sixth row */}
    <rect x="0" y="1650" width="480" height="310"/>
    <rect x="530" y="1650" width="720" height="310"/>
    {/* Seventh row */}
    <rect x="0" y="1980" width="480" height="310"/>
    <rect x="530" y="1980" width="720" height="310"/>
    {/* Eighth row */}
    <rect x="0" y="2310" width="480" height="310"/>
    <rect x="530" y="2310" width="720" height="310"/>
    {/* Ninth row */}
    <rect x="0" y="2640" width="480" height="310"/>
    <rect x="530" y="2640" width="720" height="310"/>
    {/* Tenth row */}
    <rect x="0" y="2970" width="480" height="310"/>
    <rect x="530" y="2970" width="720" height="310"/>
</ContentLoader>
</div>
  )
}