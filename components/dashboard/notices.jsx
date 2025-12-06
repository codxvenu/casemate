import React from 'react'
import { inter } from '@/app/layout'
import { ConvertMDY, ConvertTime } from '@/utility/lib/date'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
const Notices = ({notices,setReminder}) => {
  return (
      <div className="col-span-4 p-2 m-2  h-full">
        <span className='flex items-center justify-between w-full'>
 <h2 className="font-semibold mb-3 flex items-center justify-start gap-6">All Reminder 
            <button className='px-2 py-1 bg-blue-600 flex items-center text-white font-normal text-xs rounded-md shadow-sm' onClick={()=>setReminder("reminder")}>  <Plus className="w-4 h-4 text-white" /> Add Reminder</button>
            

            </h2>
       <span className="flex items-center gap-2">
                <button className="p-1 rounded-md shadow-sm bg-[var(--foreground)] group hover:bg-blue-600 transition-all duration-200 ease-in-out"><ChevronLeft className="w-4 h-4 group-hover:text-white"/></button>
                <button className="p-1 rounded-md shadow-sm bg-[var(--foreground)] group hover:bg-blue-600 transition-all duration-200 ease-in-out"><ChevronRight className="w-4 h-4 group-hover:text-white" /></button>
                
                </span>
        </span>
         
          <div className="overflow-x-scroll max-[768px]:w-screen w-full" style={{scrollbarWidth : "none"}}>
          <ul className="flex gap-2 w-max pr-9">
            {!!notices?.length && notices?.map((n,index)=>(
            <li key={index} className="relative max-[768px]:w-[210px] min-w-[218px] flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">{n.Title}</h3>
            <small className="text-[var(--fileText)]">{ConvertMDY(n.fortime)}</small>
            <h4 className="font-normal text-[12px]">{n.Description}</h4>
             <span className='absolute top-0 right-0 w-1 rounded-md h-full block bg-blue-500'></span>
            </li>
            ))}
            {!notices?.length && 
            <li  className="relative max-[768px]:w-[210px] min-w-[218px] flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)] min-h-[80px]"><h3 className="font-semibold">  </h3>
            <small className="text-[var(--fileText)]"></small>
            <h4 className="font-normal text-[12px] text-center">no notice</h4>
             <span className='absolute top-0 right-0 w-1 rounded-md h-full block bg-blue-500'></span>
            </li>
            }
           
          </ul>
          </div>
        </div>
  )
}

export default Notices
