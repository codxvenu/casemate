"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Folder,LayoutDashboard ,MessagesSquare,Sun,Moon, Bot,BriefcaseBusiness ,EthernetPort , ChevronDown, Share,} from 'lucide-react'
import { Theme } from '@/app/context/ThemeContext'
import { inter } from '@/app/layout'
import { useRef } from 'react'
import Link from 'next/link'
import ChatBotHistory from './SubBar/ChatBotHistory'
import ChatSearch from './ChatSearch'
const SideBar = ({iconOnly,setIconOnly,showBar,setShowBar,atab=0,setChatID,search,setSearch}) => {
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
    const [active,setActive] = useState(atab);
    const[activeChat,setActiveChat] = useState(0);
    const {theme,ChangeTheme} = useContext(Theme);
    const ref = useRef(null);
    
  return (
<div className={`${!showBar && "max-[768px]:hidden"} shrink-0`}>

    <div className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}  ${inter.className} group  max-[768px]:fixed top-0  bg-[var(--foreground)] h-screen p-2 grid grid-rows-[1fr_8fr] shrink-0 z-[1000000000000]`}>
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
            <button className='group-[.iconOnly]:w-fit group-[.iconOnly]:left-2 shadow-md px-3 py-2 w-[240px] rounded-md fixed left-0 bottom-0 flex justify-end items-center whitespace-nowrap' onClick={()=>setIconOnly((prev)=>!prev)}>
         <Share className='w-4.5 h-4.5 group-[.iconOnly]:rotate-[90deg] rotate-[270deg] transition-all duration-300 ease-in-out'/>
            </button>
        {setChatID && 
          <ChatBotHistory setChatID={setChatID} activeChat={activeChat} search={search} setSearch={setSearch}/>
        }
      </div>
    </div>
<div className='backdrop-blur-sm w-[calc(100vw-250px)] h-screen absolute top-0 right-0 z-[100000] min-[768px]:hidden' onClick={()=>setShowBar(!showBar)}></div>

</div>
  )
}

export default SideBar
