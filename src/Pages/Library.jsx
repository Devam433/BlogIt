import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../appwrite/dbConfig';
import { setLikedBlogs } from '../features/likeSlice';
import { LikedBlogCard } from '../Components/LikedBlogCard';

function Library() {
  const userData = useSelector(state=>state.auth.userData);
  const allPosts = useSelector(state => state.posts.allPosts);
  const likedBlogs = useSelector(state => state.likes.likedBlogs);

  const dispatch = useDispatch();

  useEffect(()=>{
    dbService.getLikes(null,userData?.userData?.$id).then((res)=>{
      dispatch(setLikedBlogs(res))
    })
  },[userData,dispatch])

  return (
    <div className='w-[full] flex justify-center mt-20'>
      <div className='w-[1210px]'>
        <main className=' py-3 bg-white'>
          <h1 className=' text-6xl font-extrabold border-b-2'>Your Liked Blogs</h1>
          <section className='mt-28'>
            {
             allPosts.map((blog)=>{
              const isLiked = likedBlogs?.some(likedBlog => likedBlog.articleid === blog.$id);
                if (isLiked) {
                  return <div key={blog.$id}>
                            <LikedBlogCard {...blog}/>
                        </div>;
                }
                return null;
              }
            )
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default Library