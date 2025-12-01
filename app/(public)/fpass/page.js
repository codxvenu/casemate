"use client"
import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
const page = () => {
  const [email , setEmail] = useState("")
  const handleFpass = async()=>{
    const data = await apiFetch('/api/auth/fpass',{
      method : "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email})
    })
    toast.success(data.message ?? "Email Sent on mail")
    }
    return (
    <div className='overflow-hidden h-[80vh] px-4 pt-20'>
      <h1 className='mb-2'>Forgot password</h1>
      <p>Please enter your email to change password</p>
      <div className='my-14 flex flex-col items-center'>
        <label htmlFor="email" className='relative flex w-[80%]'>
        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className='px-3 py-2 outline-0 rounded bg-[var(--inputbg)] w-full h-[40px]' placeholder='Email address' />
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
        <button className='bg-[var(--purple)] px-2 py-2 text-[var(--background)] w-[80%] mt-8' onClick={()=>handleFpass()}>Change password</button>
      </div>
      <span className='font-medium w-full flex gap-2 justify-center text-[13px]'>Back to <Link className='text-[var(--purple)] font-bold' href="/login">Login</Link></span>
    </div>
  )
}

export default page
