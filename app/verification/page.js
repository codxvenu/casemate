"use client"
import {React,useState} from 'react'

const page = () => {
    
  return (
    <div className="w-screen h-[80vh] px-4 pt-[15vh]" >
      <h1 className="text-start mb-4">Almost there</h1>
      <h3>Please enter the 6-digit code sent to your 
email <span className="font-medium">hemmyhtec@gmail.com
    </span>  for verification.</h3>
<form className='flex flex-col items-center my-16'>
    <label htmlFor="otp" className="grid grid-cols-5 gap-3 items-center justify-center w-[295px]">
    <input type="number" name="digit1" id="digit1" className='bg-[var(--inputbg)] w-full h-full outline-0 px-2 py-2 text-center otp' />
    <input type="number" name="digit1" id="digit2" className='bg-[var(--inputbg)] w-full h-full outline-0 text-center otp' />
    <input type="number" name="digit1" id="digit3" className='bg-[var(--inputbg)] w-full h-full outline-0 text-center otp' />
    <input type="number" name="digit1" id="digit4" className='bg-[var(--inputbg)] w-full h-full outline-0 text-center otp' />
    <input type="number" name="digit1" id="digit5" className='bg-[var(--inputbg)] w-full h-full outline-0 text-center otp' />
    </label>
    <button className="bg-[var(--purple)] text-[var(--background)] w-[295px] py-2 rounded-[8px] text-[18px] font-semibold mt-16">Verify</button>
</form>
<span className="flex text-[13px] font-bold justify-center ">Didn’t receive any code? <p className="ml-2 font-bold !text-[13px]"> Resend Again</p></span>
<span className="text-[#A8A9A8] font-normal text-center !text-[13px] w-[100%] block mt-2">Request New code in 00:30s</span>
    </div>
  )
}

export default page
