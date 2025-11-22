import React from 'react'
import { inter } from '@/app/layout'
import { ConvertTime } from '@/utility/lib/date'
import { Plus } from 'lucide-react'
const Notices = ({notices,setReminder}) => {
  return (
      <div className="col-span-4 p-2 m-2  h-full">
          <h2 className="font-semibold mb-3 flex items-center justify-between">Notices & Reminder <Plus className="w-5 h-5 text-blue-600" onClick={()=>setReminder("reminder")}/></h2>
          <div className="overflow-x-scroll max-[768px]:w-screen w-full" style={{scrollbarWidth : "none"}}>
          <ul className="grid grid-cols-4 gap-2 w-max pr-9">
            {!!notices?.length && notices?.map((n,index)=>(
            <li key={index} className="relative max-[768px]:w-[210px] min-w-[218px] flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">{n.title}</h3>
            <small className="text-[var(--fileText)]">{n.created_at}</small>
            <h4 className="font-normal text-[12px]">{n.description}</h4>
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
