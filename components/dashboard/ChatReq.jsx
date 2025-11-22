import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { UserRoundX,UserRoundCheck,Search } from 'lucide-react'
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
    <div className="shadow-md bg-[var(--foreground)] p-4 rounded-md min-h-[170px] w-full min-w-full max-w-full">
        <span className="block relative shadow-sm border-[1px] border-gray-100 px-1 rounded-md mb-2">
        <input type="text" placeholder="Search" className="px-2 py-1.5 outline-0 w-[95%]" onChange={(e)=>handleSearch(e.target.value)}/>
        <Search className="w-5 h-5 absolute top-2.5 right-2 text-blue-600"/>
        </span>
    <ul className="flex flex-col justify-center items-start gap-1 mt-3.5">
                {!!req.length && req?.map((i,index) => (
                  <li
                    className="flex justify-between border-b-2 px-2 py-2 border-[var(--fileBox)] shadow-md gap-2 bg-[var(--background)] w-full items-center"
                    key={index}
                  >
                    <span className="flex gap-1">
                    <Image src={`${i.avatar || ""}`} width={30} height={30} alt={i.name} className="rounded-full"/>
                    <span className={` flex flex-col items-start justify-center text-[13px] text-[var(--fileText)]`}>
                      <h2 className="text-[var(--text)] overflow-hidden text-ellipsis whitespace-nowrap w-[140px]">{i.name}</h2>{" "}
                      <p className="!text-[12px]">Wants to chat</p>
                    </span>
                    </span>
                    <span className="flex gap-2 text-[var(--fileText)]">
                      <button className="p-2 shadow-green-300 shadow-sm rounded-sm hover:scale-100" onClick={()=>handleRequest("accept",i)}>
                        <UserRoundCheck className="w-4 h-4 " />
                        </button>
                      <button className="p-2 shadow-red-300 shadow-sm rounded-sm" onClick={()=>handleRequest("reject",i)}>
                        <UserRoundX className="w-4 h-4" />
                        </button>
                    </span>
                  </li>
                ))}
                {!chatRequests.length && <span className='flex items-center justify-center mt-7 h-full w-full'><small>No Freind Request</small> </span>}
              </ul>
        </div>
  )
}

export default ChatReq
