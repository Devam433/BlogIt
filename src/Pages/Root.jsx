import {Outlet} from "react-router-dom"
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'
import { useEffect } from "react"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { login,logout, setAvatar } from "../features/authSlice"

function Root() {  
  const dispatch = useDispatch();

  useEffect(()=>{   //every time the component mounts check if the user is authenticated
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
      .catch((error)=>{console.log('UnerNotLoggedIn',error)})
      // .finally(()=>{setLoading(false)}); // this will always execute even an exception and was thrown and was caught by the .catch()
  },[])

  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )

}
export default Root