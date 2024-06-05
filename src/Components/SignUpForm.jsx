import React, { useRef, useState } from 'react'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../features/authSlice';
import Input from './Input';
import Button from './Button';
import { set, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

export const SignUpForm = () => {

    const [loggingIn,setLoggingIn] = useState(false);
    const [error,setError] = useState(null);

    const {register,handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createAccount = async (data) => {
        console.log('SignUp start')
        setLoggingIn(true);
        try {
            const result = await authService.createAccount({...data}); //creates Account
            if(result.code == 409) {
                setError('Email already exists!');
                setLoggingIn(false);
            }
            else {
                const loginRes = await authService.login({Email:data.Email,Password:data.Password}) //creates email session
                if(loginRes) {
                    const userData = await authService.getCurrentUser(); //if session creation success the get userData
                    if(userData) {
                        dispatch(authLogin(userData));
                        navigate('/');
                    }
                    else {
                        navigate('/login'); // if unable to get userData then navigate to /login
                    }
                }
                else {
                    setError('Failed to auto login. Try manually');
                    setLoggingIn(false);
                }
            }
        } catch (error) {
            console.log(error)
            console.log('Failed SignUp');
        } finally {
            setLoggingIn(false);
        }
    }

    return (
        <div className='mt-40 mb-40'>
            <div>
                <form onSubmit={handleSubmit(createAccount)} className=' bg-gray-300 flex flex-col gap-5 px-8 py-10'>
                {error ? <p className='text-red-500'>{error}</p> : ''}
                    <div className='flex flex-col gap-10 '>
                        <div className='flex flex-col gap-7'>
                            <div>
                                <Input
                                type="text"
                                placeholder='Full name'
                                {...register("Name", { required: "Username cannot be empty" })}
                            />
                            {errors.Name && <p className='text-red-500'>{errors.Name.message}</p>}
                            </div>
                          
                            <div>
                                {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
                                <Input
                                    type="email"
                                    placeholder='E-mail'
                                    {...register("Email", {
                                        required: "Email cannot be empty",
                                        validate: {
                                            matchPattern: (value) => /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value) || "Email not valid"
                                        }
                                    })}
                                />  
                            </div>

                            <div>
                                {errors.Password && <p className='text-red-500'>{errors.Password.message}</p>}
                                <Input
                                    type="password"
                                    placeholder='Password'
                                    {...register("Password", {
                                        required: "Password cannot be empty",
                                        minLength: { value: 8, message: "Password must be at least 8 characters" }
                                    })}
                                />
                            </div> 
                        </div>
                        
                        <Button type='submit'>Sign Up & LogIn</Button>
                        <p>Have an account? <Link to='/login' className='text-blue-400 hover:underline'>Login here!</Link></p>
                    </div>
                </form>
            </div>

            {loggingIn && (
                <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
                    <div className="loader-container">
                        <ClipLoader color="#FF5959" loading={loggingIn} size={50} />
                    </div>
                </div>
            )}
        </div>
    );
}
