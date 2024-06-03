import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { addPosts } from '../features/postSlice'

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        authService.logout()
          .then(()=>{
            dispatch(logout());
            dispatch(addPosts(null))
            navigate('/')
          });
    }
  return (
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleLogout}>LogOut</button>
  )
}
