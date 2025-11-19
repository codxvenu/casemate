"use client"
import {React,useState} from 'react'
import { Mail, Lock, ChevronRight,User,Smartphone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { toast } from 'react-toastify'
import { authService, useApi } from '@/hook/apifetch'
import { Validator } from '@/utility/lib/validator'
import { RegisterSchema } from '@/schemas/authSchema'
const page = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState(0);
  const [FormError,setFormError] = useState([]);
  const handleRegister = async()=>{
    const valid = await Validator(RegisterSchema,{email,password,name,phone})
    if(!valid.success) return setFormError(valid.error)
    setLoading(true)
    const data = await authService.register({email,password,name,phone})
    toast.success(data?.message ?? "Registered SuccessFuly")
    setLoading(false)
    router.push("/login");
  }

  return (
    <div className='overflow-hidden h-screen'>
    <div className='grid grid-rows-[.8fr_1.8fr_1.5fr] justify-center justify-items-center gap-4 w-[300px] h-[100vh] mx-auto mt-25'>
    <span className='text-center block w-[321px] relative'>
        <img src="/welcome.png" alt="" className='absolute w-[200px] top-[-88px] left-[39px]' />
        <h1 className='mt-8 !text-[36px]'>Get Started</h1>
        <p>by creating a free account</p>
        </span>   
        <div className='flex flex-col'>
        <label htmlFor="name" className='relative flex w-[300px]'>

        <input type="name" name="name" id="name" placeholder='Full name' className='rounded w-full h-[50px] outline-0 bg-[var(--foreground)]  px-3 py-2' onChange={(e)=>setName(e.target.value)} />

        <User className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
        <small className="text-red-400 p-1.5 my-1">{FormError.find((i)=>i.field === "name")?.message || ""}</small>
        <label htmlFor="email" className='relative flex w-[300px]'>

        <input type="email" name="email" id="email" placeholder='Enter your email' className='rounded w-full h-[50px] outline-0 bg-[var(--foreground)]  px-3 py-2'  onChange={(e)=>setEmail(e.target.value)} />
        <Mail className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]' />
        </label>
        <small className="text-red-400 p-1.5 my-1">{FormError.find((i)=>i.field === "email")?.message || ""}</small>

         <label htmlFor="phone" className='relative flex  w-[300px]'>
        <input type="number" name="phone" id="phone" placeholder='Phone number' className='rounded w-full h-[50px]  outline-0 bg-[var(--foreground)] px-3 py-2'  onChange={(e)=>setPhone(Number(e.target.value))}  />
        <Smartphone className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
         <small className="text-red-400 p-1.5 my-1">{FormError.find((i)=>i.field === "phone")?.message || ""}</small>
         <label htmlFor="password" className='relative flex w-[300px]'>
        <input type="password" name="password" id="password" placeholder='Password' className='rounded w-full h-[50px]  outline-0 bg-[var(--foreground)] px-3 py-2'  onChange={(e)=>setPassword(e.target.value)} />
        <Lock className='absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 text-[#A8A9A8]'  />
         </label>
         <small className="text-red-400 p-1.5 my-1">{FormError.find((i)=>i.field === "password")?.message || ""}</small>

        <span className='flex justify-between mt-3 w-[300px]'>
        <label htmlFor="remember" className='flex gap-2 text-[10px]'><input type="checkbox" name="remember" id="remember" />By checking the box you agree to our Terms and Conditions.</label>
        
        </span>
            </div> 
        <span className='flex flex-col justify-center h-min gap-3'>
        <button className='flex w-[300px] h-[50px]  items-center justify-center bg-[var(--purple)] rounded text-[var(--background)]' onClick={()=>handleRegister()}>{loading ? <Loader/> :  <span className="flex"> Next <ChevronRight /></span>}</button>
        <small className='text-center font-medium'>Already a Member? <Link href="/login" className='text-[var(--purple)] font-bold'>Log in</Link></small>
            </span>
    </div>
    </div>
  )
}

export default page
