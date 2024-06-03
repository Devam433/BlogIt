import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import authService from '../appwrite/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function ProfileMenu() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);

    function handleOnClick(item) {
        if(item.id == 4) {
            handleLogout();
        }
        else {
            navigate(item.url);
            setOpen(prev=>!prev);
        }
    }

    function handleLogout() {
        authService.logout()
          .then(()=>{
            dispatch(logout());
            navigate('/');
          });
    }

    const DropdownItems = [
        {
            icon:faUser,
            name: 'My Profile',
            url:'/profile',
            id:1
        },
        {
            icon:faBook,
            name: 'Library',
            url:'/library',
            id:2
        },
        {
            icon:faQuestionCircle,
            name: 'Help',
            url:'/',
            id:3
        },
        {
            icon:faSignOutAlt,
            name: 'Log out',
            url:'/',
            id:4
        },
    ]


  return (
    <div className='flex flex-col items-center '> {/** Menu Container */}
        <div className='border-red-400 hover: cursor-pointer' onClick={()=>{setOpen(prev=>!prev)}}> {/** Menu Trigger */}
            <img src="" alt="" className=' h-12 rounded-full border w-12 bg-purple-300'/>
        </div>
        
        { open ?  
        <div className='flex justify-center'> {/**Dropdown Menu */}
            <ul className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-3 list-none absolute top-16 mt-3 bg-white border px-5 py-4 rounded-sm'>
                {
                    DropdownItems.map((item)=>(
                        <li key={crypto.randomUUID()} className=' py-1 flex gap-y-10 items-center gap-x-6 text-gray-500 hover:text-gray-700 hover:cursor-pointer' onClick={()=>{handleOnClick(item)}}>
                            <FontAwesomeIcon icon={item.icon}/>
                            <p className=''>{item.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        :
        null
        }
    </div>
  )
}

export default ProfileMenu