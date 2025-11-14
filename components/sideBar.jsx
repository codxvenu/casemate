"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Folder,LayoutDashboard ,MessagesSquare,Sun,Moon, Bot,BriefcaseBusiness ,EthernetPort , ChevronDown,} from 'lucide-react'
import { Theme } from '@/app/context/ThemeContext'
import { inter } from '@/app/layout'
import { useRef } from 'react'
import Link from 'next/link'
const SideBar = ({className,showBar,setShowBar,atab=0,setChatID}) => {
    const options = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    route: "/dashboard",
    description: "Quick overview"
  },
  {
    name: "FileVault",
    icon: Folder,
    route: "/filemanager",
    description: "Manage files"
  },
  {
    name: "ChatRoom",
    icon: MessagesSquare,
    route: "/chat",
    description: "Chat clients"
  },
  {
    name: "CaseBot",
    icon: Bot,
    route: "/chatbot",
    description: "AI assistant"
  }
];
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


    const [active,setActive] = useState(atab);
    const[activeChat,setActiveChat] = useState(0);
    const [ChatGroup,setChatGroup] = useState([]);
    const [Caseactive,setCaseactive] = useState(atab);
    const {theme,ChangeTheme} = useContext(Theme);
    const ref = useRef(null);
    async function handlenewchat(index){
      setChatID(0);
      const now = new Date();
       const res = await fetch(`/api/newchat`,{
          credentials : "include",
          method : "POST",
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify({created_at : now,index})
        })
        const data = await res.json()
        if(!res.ok) return console.log(data)
        setChatID(data.id)
      }
    useEffect(()=>{
     async function handleGroupChat(){
        const res = await fetch("/api/chat",{
          credentials : "include"
        })
        const data = await res.json()
        if(!res.ok && data.error === "no active group") return handlenewchat()
        setChatGroup(data.data)
      console.log(data);
      
      }
      handleGroupChat()
    },[activeChat])
  useEffect(()=>{
    setChatID(ChatGroup?.sort((a,b)=>new Date(a.lastUpdated) - new Date(b.lastUpdated))[ChatGroup.length-1]?.id)
  },[ChatGroup])
  return (
<div className={`${!showBar && "max-[768px]:hidden"}`}>

    <div className={className+`  ${inter.className} group  max-[768px]:fixed top-0 z-[10000] bg-[var(--foreground)] h-screen p-2 grid grid-rows-[1fr_8fr] shrink-0 `}>
        <div className='flex justify-between items-center gap-2 p-1 rounded-md h-min '>
      <span className='flex justify-between items-center gap-3 py-1 rounded-md h-min !text-[14px] text-[var(--text)]'>
        <button className='p-2 bg-blue-600 shadow rounded-md text-[var(--svgtxt)]'>
            <Folder className='w-5 h-5' />
        </button>
       <p className='[.iconOnly_&]:hidden'>{options[atab].name} <br /> <small className='!text-[12px] whitespace-nowrap'>{options[atab].description} 
        </small>
        </p> 

      </span>
      <button ref={ref} className='[.iconOnly_&]:hidden p-2  shadow rounded-md text-[var(--text)] font-normal bg-[var(--fileBox)]' onClick={()=>ChangeTheme(ref)}>
       {theme ==="dark" ?  <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
      </button>
        </div>
      <div className='p-2 overflow-hidden'>
        <small className='font-medium [.iconOnly_&]:hidden'>Menu</small>
        <ul className='grid gap-2 mt-3'>
            {options.map((i,index)=>(
              <Link key={index} href={i.route}>
                <li  onClick={()=>setActive(index)} className={`group-[.iconOnly]:shrinkWidth group-not-[.iconOnly]:growWidth flex gap-2 p-2 font-normal items-center rounded-md ${active === index && "bg-blue-600 text-white"}`}><i.icon className='w-4 h-4'/> <h3 className='!text-[14px] [.iconOnly_&]:hidden'>{i.name}</h3></li>
              </Link>
            ))}
            
        </ul>
          <div className=' group-[.iconOnly]:hidden'>
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
      </div>
      </div>
    </div>
<div className='backdrop-blur-sm w-[calc(100vw-250px)] h-screen absolute top-0 right-0 z-[100000] min-[768px]:hidden' onClick={()=>setShowBar(!showBar)}></div>
</div>
  )
}

export default SideBar
