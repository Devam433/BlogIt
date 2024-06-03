import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root.jsx";
import { Home } from './Pages/Home.jsx';
import { Blogs } from './Pages/Blogs.jsx';
import  {Login}  from './Pages/Login.jsx';
import  SignUp  from './Pages/SignUp.jsx';
import  AddPost from './Pages/AddPost.jsx';
import { ErrorPage } from './Pages/ErrorPage.jsx';
import { Blog } from './Pages/Blog.jsx';
import { Provider } from "react-redux";
import { store } from './store/store.js';
import Library from './Pages/Library.jsx';
import MyProfile from './Pages/MyProfile.jsx';
import EditPost from './Components/EditPost.jsx';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Root />,
      errorElement:<ErrorPage />,
      children:[
        {
          path:'',
          element:<Home/>,
        },
        {
          path:"blogs",
          element:<Blogs/>,
        },
        {
          path:"/blogs/:id",
          element:<Blog/>,
        },
        {
          path:'/login',
          element:<Login/>,
        },
        {
          path:'/signup',
          element:<SignUp/>,
        },
        {
          path:'/addpost',
          element:<AddPost/>,
        },
        {
          path: '/editpost/:id',
          element:<EditPost/>,
        },
        {
          path:'/library',
          element:<Library/>,
        },
        {
          path:'/profile',
          element:<MyProfile/>,
        }
      ]      
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
      <RouterProvider router={router}/>
    </Provider>
)