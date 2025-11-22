import React from 'react'
import { Plus } from 'lucide-react'
import { ConvertMDY } from '@/utility/lib/date'
const QuickReminder = ({notices,setReminder}) => {
    const filtered =  notices?.filter((i)=>i.action === "reminder")
  return (
   <div className=" shadow-md bg-[var(--foreground)] p-4 rounded-md min-h-[170px] ">
        <h2 className="font-medium flex items-center justify-between">Quick Reminder <Plus className="w-5 h-5 text-blue-600" onClick={()=>setReminder("reminder")}/></h2>
        <ul className="flex flex-col gap-4 items-center justify-start mt-2.5">
            {!!filtered?.length && filtered?.map((q,index)=>(
          <li key={index} className="flex gap-2 items-center relative w-full"><input type="checkbox" name="reminder" id="" /><h3>{q.Title}</h3> <small className="absolute top-[2.5px] right-1 text-[var(--fileText)]">{ConvertMDY(q.fortime)}</small></li>
            ))}
            {!filtered?.length && <li className='flex h-full items-center justify-center '><small>No reminder</small></li>}
        </ul>
        </div>
  )
}

export default QuickReminder
