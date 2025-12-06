import { FileService } from '@/hook/apifetch';
import { EllipsisVertical, FileText } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const Gridview = ({files,selectedFiles,handleFileType,handleSize,handleSelection,handlePathSystem}) => {
 async function handlePreviewFile(item){
    const filePath = item.path+item.filename
    console.log(filePath,"filePath");
    
    await FileService.getFilePreview(filePath.slice(1,))
  }
  return (
    <div className="grid max-[440px]:grid-cols-1 max-[768px]:grid-cols-2  min-[768px]:grid-cols-[repeat(auto-fit,minmax(170px,218px))] gap-4 h-max p-1 max-[768px]:pb-3" >
                {files.sort((a,b)=>new Date(a.created_at) - new Date(b.created_at)).map((item,index) => (
                  <div key={index} className={`relative p-3 rounded-lg border aspect-auto min-[768px]:aspect-video shadow-sm  ${selectedFiles.some((i)=>i.filename === item.filename) ? 'border-blue-300 shadow-md' : 'border-transparent'} hover:border-gray-200 bg-white min-[768px]:max-w-fit`} onClick={()=>handlePathSystem(item)}>

                    {/* <button onClick={() => handleSelection(item)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                     
                    </button> */}

                    <div className="flex flex-col items-start gap-3 justify-between">
                      <div className="w-full flex items-center gap-1">
                        <div className="w-12 h-12 flex items-center justify-center shrink-0" onClick={()=>handlePreviewFile(item)}>
                          {item.type === "folder" ? 
                         <span className='block p-2 bg-blue-50 text-blue-800 rounded-sm' >
                           <FileText className='w-5 h-5'/>
                          </span>
                           :
                           <Image src={`${handleFileType(item.type)}`} alt='name' width={30} height={30}/>
                          }
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis w-32 capitalize">{item.filename.split(".")[0]}</div>
                          <div className="text-xs text-gray-400 truncate uppercase">{item.type}</div>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between text-xs text-gray-500 pl-2.5">
                        <div className={`${item.type === "folder" && "opacity-0"}`}>{handleSize(item.size)}</div>
                        <div className="relative">
                          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"  onClick={(e)=>{e.preventDefault(); handleSelection(item)}}>
                            <EllipsisVertical className='w-4 h-4'/> </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  )
}

export default Gridview
