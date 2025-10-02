import React from 'react'
import { SquarePen } from 'lucide-react'
const Message = ({img,text}) => {
  return (
    <div className='flex items-center justify-between w-[100%] gap-3 p-5'>
        <img src={img} width={37} height={37} alt="" className="icon" />
        <span className='flex justify-start w-full'>
            <h3 className='!text-[13px] !font-medium text-start'>{text}</h3>
            </span>
            <span className='relative group/edit'>

        <SquarePen className="text-[#BDBDBD] w-[14px] h-[14px]" />
        <small className='absolute top-1/2 group-hover/edit:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-white -translate-x-1/2 translate-y-1/2'>Edit</small>    
            </span>
      </div>
  )
}

export default Message
