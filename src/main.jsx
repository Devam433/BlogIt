import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root.jsx"
import { Home } from './Pages/Home.jsx';
import { Blogs } from './Pages/Blogs.jsx';
import { About } from './Pages/About.jsx';
import { Contact } from './Pages/Contact.jsx';
import { ErrorPage } from './Pages/ErrorPage.jsx';
import { Blog } from './Pages/Blog.jsx';
import { Navbar } from './Components/Navbar.jsx';

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
          children:[{
            path:":blogid",
            element:<Blog/>
          }]
        },
        {
          path:'about',
          element:<About/>,
        },
        {
          path:'contact',
          element:<Contact/>,
        }
      ]      
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
