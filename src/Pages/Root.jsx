import {Outlet } from "react-router-dom"
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'
import { useEffect } from "react"
import authService from "../appwrite/auth"
import { useDispatch, useSelector } from "react-redux"
import { login,logout, setAvatar } from "../features/authSlice"

function Root() {  
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData)
  console.log(userData);

  useEffect(()=>{   //every time the component mounts check if the user is authenticated
    console.log('getUser from root');
      authService.getCurrentUser()
        .then((userData)=>{
          if(userData){
            dispatch(login({userData})); // if userData is availabe update the store
            const initials = authService.generateInitials(userData.name)
            const avaratUrl = authService.getAvatarUrl(initials)
            dispatch(setAvatar(avaratUrl));
          }
          else{
            dispatch(logout());
          }
        })
        .catch((error)=>{console.log('User NotLoggedIn',error)})
  },[dispatch])

  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )

}
export default Root