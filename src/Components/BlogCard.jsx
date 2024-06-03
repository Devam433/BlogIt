import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {} from '../appwrite/auth'
import parse from 'html-react-parser'
import dbService from '../appwrite/dbConfig'
import {renderToString} from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export const BlogCard = (
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

    const [filePreview, setFilePreview] = useState(null);
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

//TODO :: Fix Image Preview!

useEffect(() => {  
    const fetchFilePreview = async () => {
        try {
            const file = dbService.getFilePreview(featuredimage);
            setFilePreview(file.href);
        } catch (error) {
            console.error('Error fetching file preview:', error);
        }
    };
    fetchFilePreview();
}, [featuredimage]);

useEffect(()=>{
    date_content_Format();
},[content,$createdAt])

  return (
    <div className='h-[310px] w-full flex gap-7 items-center mb-12 pb-3 border-b-2 border-gray-300'>
    <div className='w-[480px]'>
        {filePreview && (
            <img src={filePreview} alt="Blog Image" className='h-[310px] w-[480px] object-cover rounded-[2px]'/>
        )}
    </div>
    <div className='flex flex-col gap-[21px] w-[660px]'>
        <div><h1 className=' font-bold text-3xl'>{title}</h1></div>
        <div className='flex gap-2 items-center'>
            <div className=''><img src='' alt="" className='w-[30px] h-[30px] object-cover rounded-[50%]'/></div>
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
            <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faHeart} className=' text-lg  text-gray-500'/>
                <p>{likes}</p>
            </div>
        </div>
    </div>
</div>
  )
}
