import React from 'react'
import { options } from "@/constants/options";
import Link from 'next/link';
const SidebarMd = () => {
  return (
    <div className="min-[768px]:hidden w-screen grid-cols-4 gap-0.5 p-2 py-0.5 h-fit bg-[var(--foreground)] grid rounded-md shadow-md border-t-2 border-[var(--border-color)]">
        {options.map((i,index)=>(
          <Link key={index}  href={i.route}>
            <button className="p-1 px-2 flex flex-col gap-2 items-center justify-center "><i.icon className="w-4 h-4 "/> <small>{i.name}</small> </button>
          </Link>
        ))}
      </div>
  )
}

export default SidebarMd
