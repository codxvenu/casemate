import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { UserRoundX,UserRoundCheck,Search, Check, X } from 'lucide-react'
const ChatReq = ({chatRequests=[],handleRequest}) => {
  const[req,setReq] = useState(chatRequests);
  const searchTimer = useRef(null);
  function handleSearch(msg){
    if(msg.split()) setReq(chatRequests)
    if (searchTimer.current) clearTimeout(searchTimer.current);
   searchTimer.current = setTimeout(() => {
      setReq((prev)=>prev.filter((i)=>i.name.toLowerCase().includes(msg.toLowerCase()) || i.requester_id.toString().includes(msg)))
    }, 500);
  }
  return (
    <div className="shadow-md bg-[var(--foreground)] p-4 rounded-xl min-h-[170px] w-full min-w-full max-w-full">
        <span className="block relative shadow-sm border-[1px] border-gray-100 px-1 rounded-md mb-2">
        <input type="text" placeholder="Search" className="px-2 py-1.5 outline-0 w-[95%]" onChange={(e)=>handleSearch(e.target.value)}/>
        <Search className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2 text-blue-600"/>
        </span>
    <ul className="flex flex-col justify-center items-start gap-1 mt-3.5">
                {!!req.length && req?.map((i,index) => (
                  <li
                    className="flex justify-between px-2 py-2 bg-[var(--fileBox)] rounded-md gap-2  w-full items-center"
                    key={index}
                  >
                    <span className="flex gap-1 items-center">
                    {/* <Image src={`${i.avatar || ""}`} width={30} height={30} alt={i.name} className="rounded-full h-[30px]"/> */}
                    <span className={` flex flex-col items-start justify-center text-[13px] text-[var(--fileText)]`}>
                      <h2 className="text-[var(--text)] overflow-hidden text-ellipsis whitespace-nowrap w-[140px]">{i.name}</h2>{" "}
                      <p className="!text-[12px]">Wants to chat</p>
                    </span>
                    </span>
                    <span className="flex gap-2 text-[var(--fileText)]">
                      <button className="p-2 rounded-sm hover:scale-100 hover:bg-gray-50" onClick={()=>handleRequest("accept",i)}>
                        <Check className="w-4 h-4 text-blue-500" />
                        </button>
                      <button className="p-2  rounded-sm hover:bg-gray-50" onClick={()=>handleRequest("reject",i)}>
                        <X className="w-4 h-4 text-red-500" />
                        </button>
                    </span>
                  </li>
                ))}
                {!req.length && <span className='flex items-center justify-center mt-7 h-full w-full'><small>No Freind Request</small> </span>}
              </ul>
        </div>
  )
}

export default ChatReq
