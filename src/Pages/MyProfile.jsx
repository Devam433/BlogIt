import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMyBlogCard } from '../Components/ProfileMyBlogCard';
import fetchPost from '../thunks/postThunk';

function MyProfile() {

  const userData = useSelector(state=>state.auth.userData);
  const allPosts = useSelector(state => state.posts.allPosts);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(allPosts.length == 0) {
      dispatch(fetchPost());
    }
  },[allPosts.length]);

  return (
    <div className='w-[full] flex justify-center mt-20'>
      <div className='w-[1210px]'>
        <main className=' py-3 bg-white'>
          <h1 className=' text-6xl font-extrabold border-b-2'>{userData?.userData?.name}'s Blogs</h1>
          <section className='mt-28'>
            {
              allPosts.map(blog=>{
                if(blog.userid == userData?.userData?.$id) {
                  return <div key={blog.$id}><ProfileMyBlogCard {...blog}/></div>
                }
              })
            }
          </section>
        </main>
      </div>
    </div>
  )
}

export default MyProfile