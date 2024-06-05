import React, { useState } from 'react';
import Input from './Input';
import authService from '../appwrite/auth';
import { login as storeLogin } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

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
                    dispatch(storeLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            console.log('LoginFormError');
            console.log(error);
            setError('Login Failed!')
        } finally {
            setLoggingIn(false); 
        }
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
                        <Button type='submit'>Log In</Button>
                        <p>Don't have an account? <Link to='/signup' className=' text-blue-400 hover:underline'>SignUp Here!</Link></p>
                    </div>
                </form>
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
