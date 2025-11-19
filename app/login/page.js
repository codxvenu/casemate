"use client"
import {React,useState} from 'react'
import { Mail, Lock, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { toast } from 'react-toastify'
import { authService, useApi } from '@/hook/apifetch'
import { Validator } from '@/utility/lib/validator'
import { LoginSchema } from '@/schemas/authSchema'
const page = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [FormError,setFormError] = useState([]);
  const handleLogin = async()=>{
    const valid = await Validator(LoginSchema,{email,password})
    if(!valid.success) return setFormError(valid.error)
    setLoading(true)
    const result = await authService.login({email,password})
    if(!result.message) return 
    setLoading(false)
    router.push('/dashboard');
  }
  return (
    <div className='overflow-hidden h-screen flex items-center'>
    <div className='grid grid-rows-[1fr_1.2fr_1fr] justify-center justify-items-center gap-4 w-[300px] h-[80vh] mx-auto mt-20'>
    <span className='text-center block w-[321px] relative'>
        <img src="/welcome.png" alt="" className='absolute w-[170px] top-[-77px] left-[46px]' />
        <h1 className='mt-8'>Welcome back</h1>
        <p>sign in to access your account</p>
        </span>   
        <div className='flex flex-col'>
        <label htmlFor="email" className='relative flex  w-[300px] '>
        <input type="email" name="email" id="email" placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}} className='rounded w-full h-[50px] outline-0 bg-[var(--foreground)]  px-3 py-2'/>
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
        <small className="text-red-400 p-1.5 my-1">{FormError.find((i)=>i.field === "email")?.message || ""}</small>
         <label htmlFor="email" className='relative flex w-[300px]'>

        <input type="password" name="password" id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} className='rounded w-full h-[50px]  outline-0 bg-[var(--foreground)] px-3 py-2'  />
        <Lock className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
        <small className="text-red-400 p-1.5 my-1">{FormError?.find((i)=>i.field == "password")?.message || ""}</small>
        <span className='flex justify-between mt-3 w-[300px]'>
        <label htmlFor="remember" className='flex gap-2'><input type="checkbox" name="remember" id="remember" /><p>Remember Me</p></label>
        <small className='text-[var(--purple)]'><Link href="/fpass">Forgot Password ?</Link> </small>
        </span>
            </div> 
        <span className='flex flex-col justify-center h-min gap-3'>
        <button className='flex w-[300px] h-[50px]  items-center justify-center bg-[var(--purple)] rounded text-white' type="button" onClick={()=>handleLogin()}> {loading ? <Loader/>:<span className="flex"> Next <ChevronRight /></span>}</button>
        <small className='text-center font-medium'>New Member? <Link href="/register" className='text-[var(--purple)] font-bold'>Register now</Link></small>
            </span>
    </div>
    </div>
  )
}

export default page
