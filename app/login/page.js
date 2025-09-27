import React from 'react'
import { Mail, Lock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='overflow-hidden h-screen flex items-center'>
    <form action="" className='grid grid-rows-[1fr_1.2fr_1fr] justify-center justify-items-center gap-4 w-[300px] h-[80vh] mx-auto mt-20'>
    <span className='text-center block w-[321px] relative'>
        <img src="/welcome.png" alt="" className='absolute w-[170px] top-[-77px] left-[46px]' />
        <h1 className='mt-8'>Welcome back</h1>
        <p>sign in to access your account</p>
        </span>   
        <div className='flex flex-col'>
        <label htmlFor="email" className='relative flex mb-4 w-[300px]'>

        <input type="email" name="email" id="email" placeholder='Enter your email' className='rounded w-full h-[50px] outline-0 bg-[var(--inputbg)]  px-3 py-2' />
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
         <label htmlFor="email" className='relative flex w-[300px]'>

        <input type="password" name="password" id="password" placeholder='Password' className='rounded w-full h-[50px]  outline-0 bg-[var(--inputbg)] px-3 py-2'  />
        <Lock className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
        <span className='flex justify-between mt-3 w-[300px]'>
        <label htmlFor="remember" className='flex gap-2'><input type="checkbox" name="remember" id="remember" /><p>Remember Me</p></label>
        <small className='text-[var(--purple)]'>Forgot Password ?</small>
        </span>
            </div> 
        <span className='flex flex-col justify-center h-min gap-3'>
        <button className='flex w-[300px] h-[50px]  items-center justify-center bg-[var(--purple)] rounded text-[var(--background)]'>Next <ChevronRight /></button>
        <small className='text-center font-medium'>New Member? <Link href="/register" className='text-[var(--purple)] font-bold'>Register now</Link></small>
            </span>
    </form>
    </div>
  )
}

export default page
