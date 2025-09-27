import React from 'react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='overflow-hidden h-[80vh] px-4 pt-20'>
      <h1 className='mb-2'>Forgot password</h1>
      <p>Please enter your email to change password</p>
      <form action="" className='my-14 flex flex-col items-center'>
        <label htmlFor="email" className='relative flex w-[80%]'>
        <input type="email" name="email" id="email" className='px-3 py-2 rounded bg-[var(--inputbg)] w-full h-[40px]' placeholder='Email address' />
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
        <button className='bg-[var(--purple)] px-2 py-2 text-[var(--background)] w-[80%] mt-8'>Change password</button>
      </form>
      <span className='font-medium w-full flex gap-2 justify-center text-[13px]'>Back to <Link className='text-[var(--purple)] font-bold' href="/login">Login</Link></span>
    </div>
  )
}

export default page
