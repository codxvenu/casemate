import React from 'react'
import {Columns2, PersonStandingIcon, TrendingUp} from "lucide-react"
const Stat = ({title,fn,description,iconTrue}) => {
  return (
     <div className='px-4 max-[680px]:py-2 min-[680px]:py-3 bg-[var(--foreground)] max-[600px]:col-span-2 min-[680px]:min-h-[130px] h-[100%] rounded flex min-[680px]:gap-2 max-[680px]:gap-1 flex-col'>
  {/* <span className='bg-[var(--fileBox)]  p-2 text-2xl w-fit'>
    <PersonStandingIcon />
  </span> */}
    <h3 className='font-medium flex items-center gap-3'>{title}
     {iconTrue && 
     <small className='max-[768px]:hidden flex items-center justify-center w-fit py-1 gap-1 px-1 !text-[11px] bg-green-100 text-green-700 rounded-[12px]'><TrendingUp className='w-3 h-3' />  10.0%</small>
     } 
      </h3>
    <h1 className='font-extrabold'>{fn}</h1>
    <h3 className='text-[var(--fileText)]'>{description}</h3>
      <span>

      </span>
    </div>
  )
}

export default Stat
