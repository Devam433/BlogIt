import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'
import authService from '../appwrite/auth'

export const LogoutBtn = () => {
    const dispatch = useDispatch();
    function handleLogout() {
      authService.login({email,password})
        .then((sessionData)=>{
          dispatch(login());
        });
    }
  return (
    <button >Logout</button>
  )
}