import React, { useRef } from 'react'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../features/authSlice';
import Input from './Input';
import Button from './Button';
import { useForm } from 'react-hook-form';

export const SignUpForm = () => {

    const {register,handleSubmit} = useForm();

    const createAccount = async (data) => {
        console.log('SignUp start')
        try {
            const userAccount = await authService.createAccount({...data});
            if(userAccount) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    useDispatch(authLogin());
                }
            }

        } catch (error) {
            console.log('Failed SignUp')
        }
    }

    return (
    <div className='mt-40 mb-40'>
        <div>
            <form onSubmit={handleSubmit(createAccount)}>
                <div className='flex flex-col gap-10 px-8 py-10 bg-gray-300'>

            <div className='flex flex-col gap-7'> 
            <Input 
            type="text"
            placeholder='Full name'
            {...register("Name",{
                required:true
            })}
            />
            <Input 
            type="email"
            placeholder='E-mail'
            {...register("Email",{
                required:true,
                validate:{
                    matchPattern:(value) => /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value) || "Email not valid"
                }
            })}
            />
            <Input 
            type="password"
            placeholder='Password'
            {...register("Password",{
                required:true,
            })}
            />
            </div>  
            <Button
                type='submit'
            >Sign Up
            </Button>
            <>Have an account? Login here!</>
            </div>
            </form>
        </div>
    </div>
  )
}
