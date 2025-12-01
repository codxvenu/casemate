import { Info, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import Loader from '../loader'

const DeleteD = ({handleDelete,setDeleteShow,loading,selectedFiles}) => {
    
  return (
     <>
       <div className='fixed backdrop-blur-[2px] bg-[rgba(0,0,0,.7)] inset-0  w-screen h-screen ' onClick={()=>setDeleteShow(false)}></div> 
      <div className='fixed top-1/2 left-1/2 -translate-1/2 flex flex-col justify-between items-start z-[100000] aspect-auto w-[450px] bg-white text-text p-4 rounded-md gap-2 shadow-md'>
        <span className='flex items-center justify-start gap-2 pb-2 relative w-full '>
       
        <Info className='w-5 h-5 text-yellow-600'/>
        <span className='flex flex-col '>
          <h2 className='font-medium text-[18px]'>Delete file</h2>
        </span>
        </span>
       <h2 className='text-[var(--fileText)] flex items-center gap-1'>Are you sure you want to delete <span className='font-medium '>{selectedFiles.length > 1 ? `all ${selectedFiles.length} items` : selectedFiles[0].filename}</span> ?</h2>
      <span className='flex gap-2 items-center justify-end w-full mt-2.5'>
        <button className='p-2 shadow-sm rounded-md bg-white text-text text-sm border-2 border-gray-200 px-4 text-[var(--fileText)] hover:bg-gray-50' onClick={()=>setDeleteShow(false)}>Cancel</button>
        <button className='p-2 shadow-sm rounded-md bg-yellow-600 text-white text-sm flex gap-1 items-center h-full' disabled={loading} onClick={()=>handleDelete()}>
       {!loading ? 
      <>
          <Trash2 className='w-4 h-4'/>
          Delete
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

export default DeleteD
