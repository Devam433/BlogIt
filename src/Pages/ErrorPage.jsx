import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center h-[100vh]'>
        <div><h1 className=' font-semibold text-4xl'>404 Page Not Found</h1></div>
        <Link to="/" className=''>Go back to Home</Link>
        {/* <a href="/">Home from a</a> Native <a> tag refrehes the page */}
    </div>
  )
}
