import React from 'react'
import { X ,FileSpreadsheet} from 'lucide-react'
const details = ({onClose,close,handleSize,formatDate,handleFileType}) => {
  console.log(close);
  
  return (
    <div  className='fixed top-0 backdrop-blur-sm w-screen h-screen'>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] max-[768px]:w-[80vw] max-[1064px]:w-[50vw] w-[30vw] h-fit rounded-2xl shadow-2xl'>
      <span className='flex justify-between p-4 border-b-[1px] border-gray-300'>
        <h1 className='!text-[18px]'>Details</h1>
    <X onClick={()=>onClose(false)} />
      </span>
      <span className='flex gap-2 items-center px-4 py-3 mt-2'>
      { handleFileType(close?.type)}
        <h1 className='flex flex-col gap-0 !text-[16px]'>
            {close.filename}
            <small className='text-gray-300'>
{close.type}
            </small>
        </h1>
      </span>
      <ul className='flex flex-col gap-2 items-center mb-4'>
        {[
  { "name": "Size", "value": `${handleSize(close.size)}` },
  { "name": "Files", "value": `${close?.FileCount || ""}` },
  { "name": "Subdirectories", "value": `${close?.FileCount || ""}` },
  { "name": "Created", "value": `${formatDate(close?.created_at)}` },
  { "name": "Modified", "value": `${close?.modified_at || ""}` },
  { "name": "Path", "value": `/root/${close?.filename}` }
].filter((i)=>i?.value).map((i,index)=>(
            <li className=' py-3 flex justify-between items-center !text-[14px] border-b-[1px] border-gray-200 w-[90%]' key={index}>
                <h2 className='text-gray-400 font-medium'>{i.name}</h2>
                <h2 className='text-gray-700'>{i.value}</h2>
            </li>
        ))}
        <li>
            
        </li>
      </ul>
    </div>
    </div>
  )
}

export default details
