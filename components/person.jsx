import React from 'react'

const Person = ({text,time,person,timeShow}) => {
  return (
    (person === 1 ? <div>
      <span className='flex flex-col justify-end items-start gap-3 my-1'>
        <p className='px-4 py-3 bg-[var(--fileBox)] max-w-[70%] w-fit  rounded-[10px]'>{text}</p>
        {timeShow && <small className='text-[#918FB7] !text-[12px]'>{time}</small>}
      </span>
    </div> :

    <div className='my-3'>
      <span className='flex flex-col justify-end items-end gap-3'>
        <p className='px-4 py-3 bg-[var(--purple)] max-w-[70%] w-fit text-[#F5F6FA] rounded-[10px]'>{text}</p>
        {timeShow && <small className='text-[#918FB7] !text-[12px]'>{time}</small>}
      </span>
    </div>
    )
  )
}

export default Person
