import React from 'react'
import {TextAlignJustify,House,ChevronRight,Search,Grid,List,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload} from 'lucide-react'
const GridView = ({allFiles,handleFileType,actions,handleSize,formatDate,DownloadFile,setClose}) => {
  return (
  <div className="store p-6 grid min-[850px]:grid-cols-3 min-[1200px]:grid-cols-4 max-[850px]:grid-cols-2 max-[550px]:grid-cols-1 gap-4 justify-items-center">
{allFiles && allFiles.map((i,index)=>(
        <div key={index} className='bg-white px-3 py-3 rounded-2xl min-[850px]:max-w-[350px]  w-[100%] hover:shadow-2xl hover:translate-y-1 transition-all duration-150 ease-in-out'>
          <span className='flex justify-between items-center '>
         {handleFileType(i.type)}
         <button className={`${i.type==="folder" && "hidden"} p-4 -mr-4 group/more relative`}>
          <EllipsisVertical className='w-6 h-6' />
         <div className='absolute top-2 right-8 bg-white drop-shadow-xl  group-hover/more:block hidden  transition-all duration-150 ease-in-out'>
         <ul className=' p-3 w-fit h-fit flex flex-col gap-2 relative'>
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
          <span className='grid gap-3 mt-3'>
            <h1 className='!text-[18px] text-gray-700'>{i.filename}</h1>
            <small className='bg-gray-200 text-gray-600 font-medium px-2 py-1 rounded w-fit'>{i.type}</small>
            <ul className='flex flex-col gap-2 !text-[14px]'>
              <li className='flex justify-between '>
                <h2 className='text-gray-400 font-medium'>Size</h2>
                <h2 className='text-gray-700'>{handleSize(i.size)}</h2>
              </li>
              <li className='flex justify-between'>
                <h2 className='text-gray-400 font-medium'>Modified</h2>
                <h2 className='text-gray-700'>{formatDate(i.created_at)}</h2>
              </li>
            </ul>
          </span>
          <ul className='border-t-[1px] border-gray-300 grid grid-cols-2 mt-3 p-3 items-center gap-2'>
            <li className='flex items-center gap-2 justify-start' onClick={()=>setClose(i)}>
              <Info className='w-4 h-4' /> Details
              </li> 
            <li className='flex items-center gap-2 justify-end' onClick={()=>DownloadFile(i)}>
              <Download className='w-4 h-4 shrink-0' /> Download
              </li> 
          </ul>
        </div>
        ))}
      
    </div>
  )
}

export default GridView
