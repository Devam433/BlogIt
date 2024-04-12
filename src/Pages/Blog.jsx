import React from 'react'
import { useParams } from 'react-router-dom'

export const Blog = () => {
  const { blogid } = useParams();
  return (
    <div>
        <h1>This is Blog{blogid}</h1>
    </div>
  )
}
