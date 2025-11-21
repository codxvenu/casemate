"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { BriefcaseBusiness ,EthernetPort , ChevronDown,} from 'lucide-react'
import { ChatBotService } from '@/hook/apifetch';
const ChatBotHistory = ({setChatID,activeChat=0,setSearch,search}) => {
     const [ChatGroup,setChatGroup] = useState([]); 
     const [Caseactive,setCaseactive] = useState(0);
       const [SearchHistory, setSearchHistory] = useState([]);
      const caseDeta = [
       {
         name: "Case Chats",
         icon: BriefcaseBusiness,
         route: "/dashboard",
         description: "Quick overview"
       },
       {
         name: "General Chats",
         icon: EthernetPort,
         route: "/filemanager",
         description: "Manage files"
       },
     ];
     useEffect(()=>{
            async function handleGroupChat(){
               const res = await fetch("/api/chatbot",{
                 credentials : "include"
               })
               const data = await res.json()
               if(!res.ok && data.error === "no active group") return handlenewchat()
               setChatGroup(data.data)
             }
             handleGroupChat()
           },[activeChat])
       async function handlenewchat(index){
             setChatID(0);
             const now = new Date();
              const data = await ChatBotService.createChat({created_at : now,index})
               setChatID(data.id)
             }
         useEffect(()=>{
           setChatID(ChatGroup?.sort((a,b)=>new Date(a.lastUpdated) - new Date(b.lastUpdated))[ChatGroup.length-1]?.id)
         },[ChatGroup])
          async function handleShistory(){
    const data = await ChatBotService.getChatHistory();
    setSearchHistory(data.data)
  }
  useEffect(()=>{
    handleShistory()
  },[])
  return (
   <div className='group-[.iconOnly]:hidden'>
        <ul className='grid'>
            {caseDeta.map((i,index)=>(
                <li key={index} className={`group-[.iconOnly]:shrinkWidthtonone group-not-[.iconOnly]:growWidth flex flex-col justify-between  p-2 font-normal rounded-md `}>
                    <div className='flex justify-between items-center'  onClick={()=>setCaseactive((prev)=>prev === index ? 10 : index)}>
                    <span className='flex gap-2 items-center'><i.icon className='w-4 h-4'/> <h3 className='!text-[14px] [.iconOnly_&]:hidden'>{i.name}</h3></span> <ChevronDown className={`w-4 h-4 ${ Caseactive === index && "rotate-180 transition-all duration-300 ease-in-out"}`}/>
                    </div>
                    
                  {Caseactive === index && <div className='mt-2 text-ellipsis overflow-y-scroll max-h-[200px] flex flex-col' style={{scrollbarWidth : "none"}}>
                     <span  className='p-1 py-2 ' onClick={()=>handlenewchat(index)}>
                             <h3 className='!text-[13px] truncate w-[200px]'>Create New Chat</h3>
                         </span>
                    
                    {ChatGroup?.filter((f)=>f.category === index && f.title !== "")?.map((i,index)=>(
                         <span key={index} className='p-1 py-2 ' onClick={()=>setChatID(i.id)}>
                             <h3 className='!text-[13px] truncate w-[200px]'>{i?.title}</h3>
                         </span>
                     ))}
                  </div>
                  }  
                </li>
            ))}
        </ul>
        {search && 
 <ChatSearch setChatID={setChatID} setSearch={setSearch} SearchHistory={SearchHistory}/> 
}
      </div>
  )
}

export default ChatBotHistory
