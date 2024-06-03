import React, { useCallback, useEffect } from 'react'
import Button from './Button'
import Input from './Input'
import RTE from '../Components/RTE'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dbService from '../appwrite/dbConfig'
import { useForm } from 'react-hook-form'

/* This is a post form component, that the users can utilize to post their blog or also edit an already existing blog. 

Now as this component can also be used to update the blog so it becomes obvious that we need the already exixting blog data(here we name it as 'post') from the appwriteStorage. So where will this 'post' object come from? It will be passsed to this component from where it is used. 
*/

function PostForm({post}) {

    const {register, handleSubmit, watch, getValues, setValue, control, reset, formState: { errors }} = useForm({
        defaultValues: { //These are the default values that will be displayed initially. Now, we know that the user might come to this post to either post a new Blog or to update a Blog. And if the user comes here to update the blog then the default values should be according to the blog that the user wants to update, And therefore values are gives as follows.
            title: post?.title || '',
            slug: post?.slug || null, // this is the post id
            status: post?.status || '',
            content: post?.content || '',
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state=>state.auth.userData);

    const Submit = async(data) =>{
        if(post) //we make this check to know whether the user want to update or not. If 'post' exists that means that update needs to be made
        {   
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;
            if(file) {
                dbService.deleteFile(post.featuredimage);
            }

            const dbPost = dbService.updatePost(post.$id,
                {
                    ...data,
                    featuredimage: file ? file.$id : null,
                })
        }
        else{
            const file = await dbService.uploadFile(data.image[0]); //here we did not bother to check whether the file exist or not because the file(featuredImage) is a *required field.

            if(file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await dbService.createPost({
                    ...data,
                    userid: userData.userData.$id,
                })
                if(dbPost){
                    navigate('/blogs')
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string')
            {
                // Replace invalid characters with hyphen
                const slug = value.trim().replace(/[^a-zA-Z0-9.\-_]/g, '-');
                
                // Remove leading special characters
                const trimmedSlug = slug.replace(/^[^a-zA-Z0-9]+/, '');

                // Convert spaces to hyphens
                return trimmedSlug.replace(/\s/g, '-').toLowerCase();
            }
        return '';
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title') {
                setValue('slug',slugTransform(value.title))
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
        
    },[watch,slugTransform,setValue])
  return (
    <div className="container mt-20 mb-20">
    <form onSubmit={handleSubmit(Submit)} className="flex p-3 justify-between">
        <div className="rte-container w-2/3">
            <RTE label="" name="content" control={control} defaultValue={getValues("content")} />
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>
        <div className="w-.8/3">
            <Input
                label="Title :  "
                placeholder="Title"
                className="mb-2"
                {...register("title", {
                    required: "Title is required",
                })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            <Input
                label="Slug : "
                placeholder="Slug"
                className="mb-2"
                {...register("slug", {
                    required: "Slug is required",
                })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
            <Input
                label="Read Time: "
                className="mb-2"
                placeholder="Read time in minutes"
                {...register('readtime', {
                    required: "Read time is required",
                })}
            />
            {errors.readtime && <p className="text-red-500 text-sm">{errors.readtime.message}</p>}
            <Input
                label="Writer: "
                className="mb-2"
                placeholder="Author's name"
                {...register("writer", {
                    required: "Writer is required",
                })}
            />
            {errors.writer && <p className="text-red-500 text-sm">{errors.writer.message}</p>}
            <Input
                label="Featured Image : "
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                    required: !post ? "Featured image is required" : false,
                })}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>     
</div>
  )
}

export default PostForm