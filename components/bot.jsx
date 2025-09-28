import React from 'react'
import { Share2 } from 'lucide-react'
const Bot = ({text}) => {
  return (
    <div className='flex flex-col  justify-between w-[100%] gap-3 p-5 bg-[#F7F7F8]'>
        <span className='flex items-center justify-between'>

        <img src="bot.png" width={37} height={37} alt="" className="icon" />
        <Share2  className="text-[#BDBDBD] w-[14px] h-[14px]" />
        </span>
        <h3 className='!text-[13px] !font-medium text-justify'>{text}</h3>
      </div>
  )
}

export default Bot
