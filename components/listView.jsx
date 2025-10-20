import React from 'react'
import {TextAlignJustify,House,ChevronRight,Search,Grid,List,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload} from 'lucide-react'
const ListView = ({allFiles,handleFileType,actions,handleSize,formatDate}) => {
  return (
  <div className="store p-6 grid gap-4 justify-items-center">
{allFiles && allFiles.map((i,index)=>(
        <div key={index} className=' bg-white flex items-center justify-between gap-3 px-3 py-3 rounded-[5px] min-[850px]:max-w-[100%]  w-[100%] hover:shadow-md transition-all duration-150 ease-in-out border-[1px] border-gray-100 relative'>
          <div className='flex items-center gap-3'>
          {handleFileType(i.type)}
         
          <span className='grid gap-1'>
            <span className='flex items-center gap-2'>
            <h1 className='!text-[16px] text-gray-700'>{i.filename}</h1>
            <small className='bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-2xl w-fit text-[12px]'>{i.type}</small>
            </span>
            <ul className='flex gap-2 !text-[14px]'>
              <li className='flex justify-start gap-2 '>
                <h2 className='text-gray-400 font-medium'>Size:</h2>
                <h2 className='text-gray-400'>{handleSize(i.size)}</h2>
              </li>
              <li className='flex justify-start gap-2'>
                <h2 className='text-gray-400 font-medium'>Modified:</h2>
                <h2 className='text-gray-400'>{formatDate(i.created_at)}</h2>
              </li>
            </ul>
          </span>
          </div>
          <span className='flex justify-between items-center'>
        
         <button className={`${i.type==="folder" && "hidden"} p-4 -mr-4 group/more relative z-[1000]`}>
          <EllipsisVertical className='w-4 h-4' />
         <div className='absolute top-2 right-8 bg-white drop-shadow-xl  group-hover/more:block hidden  transition-all duration-150 ease-in-out'>
         <ul className=' p-3 w-fit h-fit flex flex-col gap-2 relative z-[1000]'>
          {actions.map((m,index)=>(
          <li onClick={()=>m.fn(i)} key={index} className={`${m.name === "Delete" && "text-red-600"} flex items-center gap-2 text-gray-600 font-medium cursor-pointer`}>
             <m.icon className='w-4 h-4'/> 
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
