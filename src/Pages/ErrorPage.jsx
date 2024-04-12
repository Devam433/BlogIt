import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from './Home'

export const ErrorPage = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div><h1>404 Page Not Found</h1></div>
        <Link to="/">Home</Link>
        {/* <a href="/">Home from a</a> Native <a> tag refrehes the page */}
    </div>
  )
}
