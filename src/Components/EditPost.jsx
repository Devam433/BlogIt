import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dbService from '../appwrite/dbConfig';
import PostForm from './PostForm';
import ClipLoader from 'react-spinners/ClipLoader';

function EditPost() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { id } = useParams(); // id is also the slug (which is the documentid of the document)

    useEffect(() => {
        setLoading(true); // Set loading to true when the component mounts
        if (id) {
            dbService.getPost(id)
                .then((post) => {
                    if (post) {
                        setPost(post);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching post:', error);
                })
                .finally(() => {
                    setLoading(false); // Set loading to false once the data has been fetched
                });
        } else {
            setLoading(false); // Set loading to false if no id is provided
        }
    }, [id]);

    return (
        <div className='flex flex-wrap mt-24'>
            {loading ? (
                <div className='flex justify-center items-center  w-full h-screen'>
                    <ClipLoader
                        size={100} // size of the loader
                        color={"#123abc"} // color of the loader
                        loading={loading}
                    />
                </div>
            ) : (
                post ? (
                    <PostForm post={post} />
                ) : (
                    <div className='flex justify-center items-center  w-full h-screen'>
                        <p>No post found.</p>
                    </div>
                )
            )}
        </div>
    );
}

export default EditPost;
