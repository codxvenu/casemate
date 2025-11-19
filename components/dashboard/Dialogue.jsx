import React from 'react'
import Image from 'next/image'
import { UserRoundX,UserRoundCheck } from 'lucide-react'
const Dialogue = ({Dashboard,handleRequest,setShowBell}) => {
  return (
     <div className=" bg-[var(--foreground)] col-span-1 max-[1024px]:hidden absolute top-8 right-0 w-[300px] h-[250px]" >
        <div className='fixed top-0 w-screen h-screen z-[10] inset-0' onClick={()=>setShowBell(false)}></div>
            <div className=" p-3 h-[100%] rounded">
              <ul className="flex flex-col justify-center items-start gap-1">
                {Dashboard?.chatRequests?.map((i,index) => (
                  <li
                    className="flex justify-between border-b-2 px-2 py-2 border-[var(--fileBox)] gap-2 bg-[var(--fileBox)] w-full items-center"
                    key={index}
                  >
                    <span className="flex gap-1">
                    <Image src={`${i.avatar || ""}`} width={30} height={30} alt={i.name} className="rounded-full"/>
                    <span className={` flex flex-col items-start justify-center text-[13px] text-[var(--fileText)]`}>
                      <h2 className="text-[var(--text)]">{i.name}</h2>{" "}
                      <p className="!text-[12px]">Wants to chat</p>
                    </span>
                    </span>
                    <span className="flex gap-2 text-[var(--fileText)]">
                      <button className="p-2 shadow-green-300 shadow-sm rounded-sm hover:scale-100" onClick={()=>handleRequest("accept")}>
                        <UserRoundCheck className="w-4 h-4 " />
                        </button>
                      <button className="p-2 shadow-red-300 shadow-sm rounded-sm" onClick={()=>handleRequest("reject")}>
                        <UserRoundX className="w-4 h-4" />
                        </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  )
}

export default Dialogue
