import React from 'react'

const Person = ({text,time,person}) => {
  return (
    (person === 1 ? <div>
      <span className='flex flex-col justify-end items-end gap-3 my-1'>
        <p className='px-4 py-3 bg-[#F3F3F5] w-[70%]  rounded-[10px]'>{text}</p>
        <small className='text-[#918FB7] !text-[12px]'>{time}</small>
      </span>
    </div> :

    <div className='my-3'>
      <span className='flex flex-col justify-end items-start gap-3'>
        <p className='px-4 py-3 bg-[#141718] w-[70%] text-[#F5F6FA] rounded-[10px]'>{text}</p>
        <small className='text-[#918FB7] !text-[12px]'>{time}</small>
      </span>
    </div>
    )
  )
}

export default Person
