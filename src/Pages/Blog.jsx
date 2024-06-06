import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dbService from '../appwrite/dbConfig';
import parse from 'html-react-parser';
import ContentLoader from 'react-content-loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { decrementLike, incrementLike, setTotalLikes } from '../features/likeSlice';
import fetchPost from '../thunks/postThunk';

export const Blog = () => {
  const { id } = useParams();
  const userData = useSelector(state => state.auth.userData);

  const [date, setDate] = useState(null);
  const [isDateLoading, setIsDateLoading] = useState(true);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [currentLikeId, setCurrentLikeId] = useState(null);

  const totalLikes = useSelector(state => state.likes.totalLikes);
  const allPosts = useSelector(state => state.posts.allPosts);
  const post = allPosts.find((post) => post.$id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      date_content_Format();
      dispatch(setTotalLikes({ articleid: post.$id, likes: post.likes }));

      if (userData?.userData?.$id) {
        dbService.getLikes(post.$id).then((data) => {
          if (data) {
            const userLike = data.documents.find((like) => like.userid === userData.userData.$id);
            if (userLike) {
              setCurrentLikeId(userLike.$id);
              setIsLikedByUser(true);
            }
          }
        });
      }
    }
  }, [id, post, userData]);

  const handleLikeClick = () => {
    if (isLikedByUser) {
      dispatch(decrementLike({ articleid: post.$id }));
      setIsLikedByUser(false);
      dbService.deleteLike({ documentId: currentLikeId, articleid: post.$id }).then(() => {
        dispatch(fetchPost());
      });
    } else {
      dispatch(incrementLike({ articleid: post.$id }));
      setIsLikedByUser(true);
      dbService.createLike({ articleid: post.$id, userid: userData.userData.$id }).then((data) => {
        setCurrentLikeId(data.$id);
        dispatch(fetchPost());
      });
    }
  };

  function date_content_Format() {
    setIsDateLoading(true);
    const dateString = post?.$createdAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setDate(formattedDate);
    setIsDateLoading(false);
  }

  return  !isDateLoading ? (
    <div className='w-[full] flex justify-center pt-[90px] mb-28'>
          <div className='w-[1210px] flex justify-center'>
            <main className=' '>
              <div className='w-[1040px] flex justify-center flex-col'>
                <article className=' antialiased'>
                  <header className='flex flex-col gap-y-5 mb-4'>
                    <section className=' border-b'>
                      <h1 className=' text-[4rem] font-bold'>{post?.title}</h1>
                      <p className=' font-semibold text-base'>{date}</p>
                    </section>
                    <section className='flex gap-0 items-center'>
                      <div></div> {/** profile pic */}
                      <p className=' text-xl font-semibold'>{post?.writer}</p> {/**writer's name */}
                    </section>
                  </header>
                  <figure>
                    <picture></picture> {/** Blog Featured Image */}
                  </figure>
                  <section className=' font-sans text-2xl'>
                    {post ? parse(post.content) : null}
                  </section>
                </article> 

                <section className=' h-28  mt-12 flex justify-between px-4 pt-4 border-t'>
                  <div className='flex gap-6'>
                    <div className='flex flex-col items-center'>
                      <FontAwesomeIcon icon={faHeart} className={`text-2xl  hover:cursor-pointer 
                     ${isLikedByUser ? `text-green-300` : `text-gray-400` }`} onClick={()=>{handleLikeClick();
                    }}/>
                    <p>{totalLikes[id]}</p>
                    </div>

                    <FontAwesomeIcon icon={faBookmark} className=' text-2xl text-gray-400 hover:cursor-pointer hover:text-gray-800' />
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faShareFromSquare} className=' text-2xl text-gray-400 hover:cursor-pointer hover:text-gray-800' onClick={()=>{}}/>
                  </div>
                </section>
              </div>
            </main>
          </div>
    </div>
  )
  :
  (
  <div className='flex justify-center mt-28'>
    <ContentLoader 
          speed={2}
          width={1040}
          height={1000}
          viewBox="0 0 1040 1000"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="3" ry="3" width="1040" height="50" />
          <rect x="0" y="70" rx="3" ry="3" width="150" height="20" />
          <rect x="0" y="100" rx="3" ry="3" width="60" height="60" />
          <rect x="0" y="170" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="190" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="210" rx="3" ry="3" width="500" height="10" />
          <rect x="0" y="230" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="250" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="270" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="290" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="310" rx="3" ry="3" width="500" height="10" />
          <rect x="0" y="330" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="350" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="370" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="390" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="410" rx="3" ry="3" width="500" height="10" />
          <rect x="0" y="430" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="450" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="470" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="490" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="510" rx="3" ry="3" width="500" height="10" />
          <rect x="0" y="530" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="550" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="570" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="590" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="610" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="630" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="650" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="670" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="690" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="710" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="730" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="750" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="770" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="790" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="810" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="830" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="850" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="870" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="890" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="910" rx="3" ry="3" width="1040" height="10" />
          <rect x="0" y="930" rx="3" ry="3" width="1040" height="10" />
    </ContentLoader>
  </div>
  )
} 