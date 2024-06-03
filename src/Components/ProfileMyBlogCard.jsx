import React, { useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import {} from '../appwrite/auth'
import parse from 'html-react-parser'
import {renderToString} from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export const ProfileMyBlogCard= (
    {
        $id,
        title,
        featuredimage,
        content,
        $createdAt,
        readtime,
        writer,
        likes 
    }
) => {

    const [date,setDate] = useState(null);
    const [featuredContent,setFeaturedContent] = useState(null);

function date_content_Format(){
    //format date
    const dateString = $createdAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    setDate(formattedDate);
    //format content
    const parsedContent = parse(content);
    const formattedContent = renderToString(parsedContent).substring(0,400).replace(/<[^>]+>/g, '');
    setFeaturedContent(formattedContent);
}


useEffect(()=>{
    date_content_Format();
},[content,$createdAt])

  return (
    <div className='h-[310px] w-full flex gap-7 items-center mb-12 border-b'>
        <div className='flex flex-col gap-[21px] w-[660px]'>
            <div><h1 className=' font-bold text-3xl'>{title}</h1></div>
            <div className='flex gap-0 items-center'>
                <div className=''></div> {/**profile pic */}
                <div className='flex flex-col'>
                    <div><h1 className='font-bold text-[#2B2C34] text-base'>{writer}</h1></div>
                    <div><p>{date} : {readtime} Min Read</p></div>
                </div>
            </div>
            <div>
                <p className=' overflow-hidden'>{featuredContent}</p>
            </div>
            <div className='flex justify-between'>
                <NavLink to={`/blogs/${$id}`} className=' w-fit '>
                <button className='w-[192px] h-[33px] bg-[#FF5959] text-white font-bold text-sm rounded-lg' >Read full article</button>
                </NavLink>
                <NavLink to={`/editpost/${$id}`} className=' w-fit '>
                <button className='w-[192px] h-[33px] bg-[#FF5959] text-white font-bold text-sm rounded-lg' >Edit Blog</button>
                </NavLink>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faHeart} className=' text-lg  text-gray-500'/>
                    <p>{likes}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
