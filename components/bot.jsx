import React, { useState } from 'react'
import { Share2 , Clipboard,Check} from 'lucide-react'
import ReactMarkdown from "react-markdown";
const Bot = ({text , error}) => {
  const [copied,setCopied] = useState(false)
 async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Implement fallback here if writeText fails
    fallbackCopyToClipboard(text); 
  }
}


  return (
    <>
      {text && (
        

        <div className={`${error && "text-red-900 font-medium"} flex flex-col  justify-between w-[100%] gap-3 p-5 bg-[#F7F7F8] text-[13px] `}>
            <span className='flex items-center justify-between'>
    
            <img src="bot.png" width={37} height={37} alt="" className="icon" />
            <span className='flex gap-3 '>
              {copied ? (
              <span className='relative group/clip'>
            <Check  className="text-[#BDBDBD] w-[14px] h-[14px]" onClick={()=>copyToClipboard(text)} />
            <small className='absolute top-1/2 group-hover/clip:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-white -translate-x-1/2 translate-y-1/2'>Copied</small>
              </span>
              ):
               <span className='relative group/clip'>
            <Clipboard  className="text-[#BDBDBD] w-[14px] h-[14px]" onClick={()=>copyToClipboard(text)} />
            <small className='absolute top-1/2 group-hover/clip:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-white -translate-x-1/2 translate-y-1/2'>Copy</small>
              </span>
              }
 <span className='relative group/share flex'>
            <Share2  className="text-[#BDBDBD] w-[14px] h-[14px]" />
            <small className='absolute top-1/2 group-hover/share:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-white -translate-x-1/2 translate-y-1/2'>Share</small>
 </span>
            </span>
            </span>
            {text === "loading" ? <div className="flex space-x-1">
  <span className="w-2 h-2 bg-gray-600 rounded-full bounceDot"></span>
  <span className="w-2 h-2 bg-gray-600 rounded-full bounceDot"></span>
  <span className="w-2 h-2 bg-gray-600 rounded-full bounceDot"></span>
</div> : 
            
            <ReactMarkdown >{text}</ReactMarkdown>
            }
           
          </div>
      )
      }
    </>
  )
}

export default Bot
