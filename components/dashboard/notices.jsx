import React from 'react'
import { inter } from '@/app/layout'
import { ConvertTime } from '@/utility/lib/date'
import { Plus } from 'lucide-react'
const Notices = ({notice,currentNote,setShownote,shownote}) => {
  return (
    <div className="relative shadow-sm max-[600px]:bg-[var(--fileBox)] bg-[var(--fileBox)]  max-[600px]:gap-2.5 min-h-[130px] h-[100%] rounded max-[600px]:flex flex-col grid grid-cols-2">
              <div className="overflow-y-scroll max-[600px]:h-[138px] max-[768px]:h-[274px] h-[150px] scrollbtn" style={{scrollbarWidth : "none"}}>
             {notice?.length !==0 && 
             <ul className={`${inter.className} bg-[var(--foreground)] flex flex-col gap-2  h-full `} >
            {notice
            ?.map((n,index)=>(
            <li key={index} className="border-b-[var(--border-color)] border-b-[1px] text-[13px] bg-[var(--foreground)] px-2 py-3 capitalize" onClick={()=>setCurrentNote(n)}>• {ConvertTime(n.fortime.split('T')[1])} — {n.Title}</li>
            ))}
               </ul>
             } 
            {notice?.length ===0 && <h3 className="flex items-center justify-center p-12 text-[14px]">no notes </h3>}
              </div>
             <div className={`bg-[var(--foreground)] text-center align-middle flex items-center justify-start p-3 `}>
              {currentNote?.length !== 0 &&
              <ul className="flex flex-col items-start justify-start text-start text-[14px] capitalize">
                <li className="flex font-semibold gap-1">Title : <h3 className="font-normal text-[13px]"> {currentNote?.Title} </h3>  </li>
                <li  className="flex font-semibold gap-1">Time : <h3 className="font-normal text-[13px]">{ConvertTime(currentNote?.fortime.split('T')[1])}</h3></li>
                <li className=" font-semibold gap-1">Description : <p className="font-normal text-[13px]">{currentNote?.Description}</p></li>
              </ul>
              }
              </div>
           <span className="flex items-center bg-[var(--fileBox)] absolute right-0 p-2" onClick={()=>setShownote(!shownote)}>
            <Plus className="w-4 h-4"/>
            </span>  
            </div>
  )
}

export default Notices
