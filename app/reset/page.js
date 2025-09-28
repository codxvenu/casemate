"use client"
import {React,useState} from 'react'
import { Key, Lock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [code,setCode] = useState("");

  const handleLogin = async()=>{
    
    if(!email,!password || !code) return alert("Please fill all the fields");
    console.log(password,code);
    const res = await fetch('/api/auth/reset',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password,code})
    })
    const data = await res.json();
    if(!res.ok){
      console.log(data.error);
    }else{
      router.push("/login")
    }
    // router.push('/dashboard');
  }
  return (
    <div className='overflow-hidden h-screen flex items-center'>
    <div className='grid grid-rows-[1fr_1.2fr_1fr] justify-center justify-items-center gap-4 w-[300px] h-[80vh] mx-auto mt-20'>
    <span className='text-center block w-[321px] relative'>
        <img src="/welcome.png" alt="" className='absolute w-[170px] top-[-77px] left-[46px]' />
        <h1 className='mt-8'>Reset password</h1>
        <p>reset password to new password</p>
        </span>   
        <div className='flex flex-col'>
       <label htmlFor="email" className='relative flex mb-4 w-[300px]'>

        <input type="email" name="email" id="email" placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}} className='rounded w-full h-[50px] outline-0 bg-[var(--inputbg)]  px-3 py-2'/>
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
         <label htmlFor="password" className='relative flex w-[300px]'>

        <input type="password" name="password" id="password" placeholder='New password' onChange={(e)=>{setPassword(e.target.value)}} className='rounded w-full h-[50px]  outline-0 bg-[var(--inputbg)] px-3 py-2'  />
        <Lock className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
         <label htmlFor="code" className='relative flex w-[300px] mt-4'>

        <input type="code" name="code" id="code" placeholder='code' onChange={(e)=>{setCode(e.target.value)}} className='rounded w-full h-[50px]  outline-0 bg-[var(--inputbg)] px-3 py-2'  />
       <Key className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
            </div> 
        <span className='flex flex-col justify-center h-min gap-3'>
        <button className='flex w-[300px] h-[50px]  items-center justify-center bg-[var(--purple)] rounded text-[var(--background)]' type="button" onClick={()=>handleLogin()}>Next <ChevronRight /></button>
        <small className='text-center font-medium'>Back to Login? <Link href="/login" className='text-[var(--purple)] font-bold'>Login now</Link></small>
            </span>
    </div>
    </div>
  )
}

export default page
