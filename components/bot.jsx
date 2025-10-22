import React, { useState } from 'react'
import { Share2 , Clipboard,Check} from 'lucide-react'
import ReactMarkdown from "react-markdown";
import Image from 'next/image';
const Bot = ({text ,id, error}) => {
  const [copied,setCopied] = useState(false);
  const [showlink,setShowLink] = useState(false);
  const handleShareLink = async()=>{
    const res = await fetch(`/api/share/${id}`);
    const data = await res.json();
    console.log(data);
    if (!res.ok) return alert("Something went wrong");
    
    return data.shareID
  }
const shareOptions = [
  {
    app: "reddit",
  },
  {
    app: "linkedin",
  },
  {
    app: "X",
  },
  {
    app: "copy",
  }
];
function handleLink(id,link){
  switch (id){
    case 0: 
      return `https://www.reddit.com/submit?url=${link}&title=CaseMate+Context&type=LINK`;
    case 1:
      return `https://www.linkedin.com/shareArticle?url=${link}&text=CaseMate%20Context`;
    case 2:
      return `https://x.com/intent/tweet?url=${link}&text=CaseMate%20Context`;
  default:
      return null
}}
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
async function handleShare(id){
  const ShareId = await handleShareLink();
  const link = `https://casemate.icu/s/${ShareId}`
  if(id==3) return copyToClipboard();
  window.open(handleLink(id,link),"_blank", "noopener,noreferrer")
}

  return (
    <>
      {text && (
        

        <div className={`${error && "text-red-900 font-medium"} flex flex-col  justify-between w-[100%] gap-3 p-5 bg-[var(--fileBox)] text-[13px] `}>
            <span className='flex items-center justify-between'>
    
      <Image
  src="/bot.png"
  width={37}
  height={37}
  alt="Bot"
  className="icon"
/>

            <span className='flex gap-3 '>
              {copied ? (
              <span className='relative group/clip'>
            <Check  className="text-[var(--fileText)] w-[14px] h-[14px]" onClick={()=>copyToClipboard(text)} />
            <small className='absolute top-1/2 group-hover/clip:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-[var(--text)] -translate-x-1/2 translate-y-1/2'>Copied</small>
              </span>
              ):
               <span className='relative group/clip'>
            <Clipboard  className="text-[var(--fileText)] w-[14px] h-[14px]" onClick={()=>copyToClipboard(text)} />
            <small className='absolute top-1/2 group-hover/clip:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-[var(--text)] -translate-x-1/2 translate-y-1/2'>Copy</small>
              </span>
              }
 <span className='relative group/share flex'>
            <Share2  className="text-[var(--fileText)] w-[14px] h-[14px]" onClick={()=>setShowLink(!showlink)} />
            <small className='absolute top-1/2 group-hover/share:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-[var(--text)] -translate-x-1/2 translate-y-1/2'>Share</small>
{showlink && <ul>
  {shareOptions.map((i,index)=>(
  <li key={index} onClick={()=>handleShare(index)}>{i.app}</li>
))}
</ul>
}
 </span>
            </span>
            </span>
            {text === "loading" ? <div className="flex space-x-1">
  <span className="w-2 h-2 bg-[var(--fileText)] rounded-full bounceDot"></span>
  <span className="w-2 h-2 bg-[var(--fileText)] rounded-full bounceDot"></span>
  <span className="w-2 h-2 bg-[var(--fileText)] rounded-full bounceDot"></span>
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
