import React from 'react'
import { SquarePen } from 'lucide-react'
const Message = ({img,text}) => {
  return (
    <div className='flex items-center justify-between w-[100%] gap-3 p-5'>
        <img src={img} width={37} height={37} alt="" className="icon" />
        <span className='flex justify-start w-full'>
            <h3 className='!text-[13px] !font-medium text-start'>{text}</h3>
            </span>
        <SquarePen className="text-[#BDBDBD] w-[14px] h-[14px]" />
      </div>
  )
}

export default Message
