import React, { useState } from 'react';
import Input from './Input';
import authService from '../appwrite/auth';
import { setAvatar, login as storeLogin } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import GoogleSvg from '../assets/GoogleSvg';

export const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error,setError] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);

    const login = async(data) => {
        try {
            setLoggingIn(true);
            const session = await authService.login(data);  //email,password
            if(session.code == 401) { //401 inalid credentials
                setError('Invalid Credentials.')
            }
            else {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(storeLogin({userData}));
                    const initials = authService.generateInitials(userData.name)
                    const avaratUrl = authService.getAvatarUrl(initials)
                    dispatch(setAvatar(avaratUrl));
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
            setError('Login Failed!')
        } finally {
            setLoggingIn(false); 
        }
    }

    async function handleGoogleLogin(e) {
        e.preventDefault()
        console.log('inside handleGoogleLoginFun')
        const res = await authService.googleLogin();
        console.log('after resssss')
        console.log(res)
    }

    return (
        <div className='mt-40 mb-40'>
            <div>
                <form onSubmit={handleSubmit(login)}>
                    <div className='flex flex-col gap-10 px-8 py-10 bg-gray-300'>
                        {error? <p className=' text-red-500'>{error}</p> : ''}
                        <div className='flex flex-col gap-7'>
                            <Input 
                                type="email"
                                placeholder="E-mail"
                                {...register("Email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value)=> /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
                                        .test(value) || "Email not valid"
                                    }
                                })}
                            /> 
                            <Input  
                                type="password"
                                placeholder='Password'
                                {...register("Password", {
                                    required: true
                                })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Button type='submit' className='w-[100%]'>Log In</Button>
                            <div className="flex items-center">
                            <button onClick={(e)=>handleGoogleLogin(e)} className="w-[100%] flex items-center bg-white dark:bg-gray-100 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-lg font-medium text-grey-900 hover:bg-gray-200 hover:text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <GoogleSvg/>
                            <span>Continue with Google</span>
                            </button>
                            </div>
                        </div>
                        <p>Don't have an account? <Link to='/signup' className=' text-blue-400 hover:underline'>SignUp Here!</Link></p>
                    </div>
                </form>
                {/* <button onClick={(e)=>handleGoogleLogin(e)}>LogIn with Google</button> */}
                
            </div>
            {loggingIn && ( // Conditionally render overlay and loading indicator
                <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
                    <div className="loader-container">
                        <ClipLoader color="#FF5959" loading={loggingIn} size={50} />
                    </div>
                </div>
            )}
        </div>
    );
};
