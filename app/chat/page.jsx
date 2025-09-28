"use client"
import React, { useState } from 'react'
import { Phone,Video } from 'lucide-react'
import Person from '@/components/person'
const page = () => {
    const [empty,setEmpty] = useState(false);
  return (
    <div className='flex items-center flex-col py-4'>
      <div className='flex w-[90%] justify-between border-b-[1px] border-[#DBDBDB] py-3'>
        <span className='flex'>
        <img src="boticon.png" className='w-[40px] h-[40px]' alt="" />
<span className='flex flex-col justify-start ml-3'>
    <h1 className='!text-[18px] !font-bold'>Helpy</h1>
    <small className='!text-[12px] !font-medium text-[#616161]'>Online</small>
</span>
        </span>
<span className='flex gap-3'>
<button className='bg-[#F3F5F6] rounded-full w-[40px] h-[40px] flex justify-center items-center'>
    <img src="phone.svg" alt="" />
</button>
<button className='bg-[#F3F5F6] rounded-full w-[40px] h-[40px] flex justify-center items-center'>
  <img src="camera.svg" alt="" />

</button>
</span>
      </div>
      <div className='chatroom mt-8 px-5'>

      <Person person={1} time={"10:52"} text={"Hi, I just wanna know that how much time you’ll be updated."} />
      <Person person={2} time={"10:52"} text={"Maybe, Nearly July, 2022"} />
      <Person person={1} time={"10:52"} text={"OKay, I”m Waiting...."} />
      </div>
      <div className='w-[90%] flex items-end justify-center gap-3 fixed bottom-2'>
        <button className='w-[45px] h-[45px] bg-black text-white shrink-0 flex items-center justify-center rounded-2xl'>
        <img src="mic.svg" alt="" />
</button>
<label htmlFor="message" className='flex items-end p-4 shadow-2xl rounded-2xl w-full relative'>
    <div contentEditable="true" onInput={(e)=>e.target.value === "" ? setEmpty(false) : setEmpty(true)} className='w-full outline-none peer'></div><small className={`absolute ${empty ? "hidden" : "peer-focus:hidden" }  pointer-events-none`}>Write now...</small>
{/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
<img src="send.svg" alt="" />

</label>

      </div>
    </div>
  )
}

export default page
