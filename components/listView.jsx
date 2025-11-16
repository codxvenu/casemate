import React from 'react'
import {TextAlignJustify,House,ChevronRight,Search,Grid,List,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload} from 'lucide-react'
const ListView = ({allFiles,handleFileType,actions,handleSize,formatDate}) => {
  return (
  <div className="store p-6 flex flex-col gap-4 justify-items-center overflow-scroll bg-[var(--fileBox)] h-full" style={{scrollbarWidth : "none"}}  >
{allFiles && allFiles.map((i,index)=>(
          <div key={index} className=' justify-between bg-[var(--foreground)]  flex items-center gap-1 px-3 py-3 rounded-[5px] min-[850px]:max-w-[100%]  w-[100%] hover:shadow-md transition-all duration-150 ease-in-out shadow relative max-[768px]:h-[60px] h-[80px]'>
          <div className='flex items-center gap-3'>
          {handleFileType(i.type)}
         
          <span className='grid'>
            <span className='flex items-center gap-2'>
            <h1 className='!text-[14px] text-[var(--text)] capitalize'>{i.filename}</h1>
            <small className='text-[var(--fileText)] bg-[var(--fileBox)] uppercase font-medium px-3 py-1 rounded-2xl w-fit text-[12px]'>{i.type}</small>
            </span>
            <ul className='flex gap-2 !text-[12px] text-[var(--fileText)] max-[640px]:hidden'>
              <li className='flex justify-start gap-2 '>
                <h2 className=''>Size:</h2>
                <h2 className='font-medium'>{handleSize(i.size)}</h2>
              </li> 
              <li className='flex justify-start gap-2'>
                <h2 >Modified:</h2>
                <h2 className='font-medium'>{formatDate(i.created_at)}</h2>
              </li>
            </ul>
          </span>
          </div>
          <span className='flex justify-between items-center'>
        
         <button className={`${i.type==="folder" && "hidden"} p-4 -mr-4 group/more relative z-[1000]`}>
          <EllipsisVertical className='w-4 h-4' />
         <div className='absolute top-2 right-8 bg-[var(--foreground)] drop-shadow-xl  group-hover/more:block hidden  transition-all duration-150 ease-in-out'>
         <ul className=' p-3 w-fit h-fit flex flex-col gap-2 relative z-[1000]'>
          {actions.map((m,index)=>(
          <li onClick={()=>m.fn(i)} key={index} className={`${m.name === "Delete" && "text-red-600 hover:!text-red-600"} flex items-center gap-2 text-[var(--text)] cursor-pointer`}>
             <m.icon className='w-4 h-4 text-[var(--text)]'/> 
             {m.name}
          </li>
          ))}
         </ul>
         </div>
          </button>
          </span>
        </div>
        ))}
      
    </div>
  )
}

export default ListView
