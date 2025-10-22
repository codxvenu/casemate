"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Folder,LayoutDashboard ,MessagesSquare,Sun,Moon} from 'lucide-react'
import { Theme } from '@/app/context/ThemeContext'
import { inter } from '@/app/layout'
const SideBar = ({className,showBar,setShowBar}) => {
    const options = [
        {name : "Dashboard",icon : LayoutDashboard},
        {name : "FileVault",icon : Folder},
        {name : "ChatRoom",icon :  MessagesSquare}
    ]
    const [active,setActive] = useState(0);
    const {theme,ChangeTheme} = useContext(Theme);
  return (
<div className={`${!showBar && "max-[768px]:hidden"}`}>

    <div className={className+` ${inter.className}  max-[768px]:fixed top-0 z-[10000] bg-[var(--foreground)] h-screen w-[250px] p-2 grid grid-rows-[1fr_8fr] shrink-0 `}>
        <div className='flex justify-between items-center gap-2 p-1 rounded-md h-min '>
      <span className='flex justify-between items-center gap-3 py-1 rounded-md h-min !text-[14px] text-[var(--text)]'>
        <button className='p-2 bg-blue-600 shadow rounded-md text-[var(--svgtxt)]'>
            <Folder className='w-5 h-5' />
        </button>
       <p className='[.iconOnly_&]:hidden'>FileVault <br /> <small className='!text-[12px] whitespace-nowrap'>Manage files
        </small>
        </p> 

      </span>
      <button className='[.iconOnly_&]:hidden p-2  shadow rounded-md text-[var(--text)] font-normal bg-[var(--fileBox)]' onClick={()=>ChangeTheme()}>
       {theme ==="dark" ?  <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
      </button>
        </div>
      <div className='p-2'>
        <small className='font-medium [.iconOnly_&]:hidden'>Menu</small>
        <ul className='grid gap-2 mt-3'>
            {options.map((i,index)=>(
            <li key={index} onClick={()=>setActive(index)} className={`flex gap-2 p-2 font-normal items-center rounded-md ${active === index && "bg-blue-600 text-white"}`}><i.icon className='w-4 h-4'/> <h3 className='!text-[14px] [.iconOnly_&]:hidden'>{i.name}</h3></li>
            ))}
        </ul>
      </div>
    </div>
<div className='backdrop-blur-sm w-[calc(100vw-250px)] h-screen absolute top-0 right-0 z-[100000] min-[768px]:hidden' onClick={()=>setShowBar(!showBar)}></div>
</div>
  )
}

export default SideBar
