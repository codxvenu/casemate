import { FilePen, X } from 'lucide-react'
import React, { useState } from 'react'
import Loader from '../loader'

const ShareD = ({handleRename,oldname,setRenameShow,loading}) => {
    const[newName,setNewName] = useState("")
  return (
     <>
       <div className='fixed backdrop-blur-[2px] bg-[rgba(0,0,0,.7)] inset-0  w-screen h-screen ' onClick={()=>setRenameShow(false)}></div> 
      <div className='fixed top-1/2 left-1/2 -translate-1/2 flex flex-col justify-between items-start z-[100000] aspect-auto w-[450px] bg-white text-text p-4 rounded-md gap-2 shadow-md'>
        <span className='flex items-center justify-start gap-2 pb-2 relative w-full border-b-2 border-gray-100'>
       <span className='flex p-2 shadow-sm rounded-md'>
        <FilePen className='w-5 h-5 text-blue-600'/>
        </span>
        <span className='flex flex-col '>
          <h2 className='font-medium'>Rename file</h2>
          <small className='text-[var(--fileText)]'>Rename file to a newer name</small>
        </span>
        <span className='p-1.5 hover:bg-[var(--fileBox)] rounded-sm absolute top-2 right-2 group' onClick={()=>setRenameShow(false)}>
          <X className='w-5 h-5 text-[var(--fileText)] group-hover:text-[var(--FileText)]'/>
        </span>
        </span>
        {/* <label htmlFor="oldname" className='flex flex-col gap-1.5 items-start w-full'><h3>Old Name</h3><input type="text" placeholder={oldname} name="" id="" className='p-2 px-3 outline-0 shadow-sm rounded-sm w-full' disabled/></label> */}
        <label htmlFor="oldname" className='flex flex-col gap-1.5 items-start w-full relative'><h3>Name</h3><h3 className='text-red-500 absolute top-0 left-10'>*</h3> 
        <span className='grid grid-cols-[1fr_.2fr] w-full shadow-sm border-2 border-gray-200 rounded-md'>
        <input type="text" value={newName} name="" id="" placeholder={oldname.split(".")[0]} onChange={(e)=>setNewName(e.target.value)} className='p-2 px-3 outline-0  w-full'/>
        <input type="text" disabled value={oldname.split(".")[1]} className='p-2 px-3 outline-0   w-full  border-l-2 border-gray-300'/>
        </span>
        </label>
      <span className='flex gap-2 items-center justify-end w-full mt-2.5'>
        <button className='p-2 shadow-sm rounded-md bg-white text-text text-sm border-2 border-gray-200 px-4 text-[var(--fileText)] hover:bg-gray-50' onClick={()=>setRenameShow(false)}>Cancel</button>
        <button className='p-2 shadow-sm rounded-md bg-blue-600 text-white text-sm flex gap-1 items-center h-full' disabled={loading} onClick={()=>handleRename(newName,oldname)}>
       {!loading ? 
      <>
          <FilePen className='w-4 h-4'/>
           Rename Item
         </> : 
<>
<Loader className="!w-4.5 aspect-square h-fit "/>
Processing...
</>
      }  
        </button>
      </span>
      </div>
       </>
  )
}

export default ShareD;

