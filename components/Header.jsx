import { User } from '@/app/context/UserContext'
import { AlignCenter, Bell } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
const Header = ({setShowBar}) => {
  const {user} = useContext(User)
  return (
     <div className="sticky top-0 p-4 h-[50px] w-full bg-[var(--foreground)] shadow-sm rounded-md flex items-center justify-between z-[1000] min-[768px]:hidden">
<AlignCenter className="w-4 h-4 min-[768px]:hidden" onClick={()=>setShowBar((prev)=>!prev)}/> 
<span className='flex items-center gap-5 relative'>
  <Bell className='w-4 h-4'/>
 {/* <small className="
  absolute -top-2 left-2
  bg-[var(--text)] text-[var(--foreground)]
  text-xs
  h-5 min-w-4
  px-1
  py-1.5
  flex items-center justify-center
  rounded-full
  font-mono
">
  10
</small> */}
<Image src={`${user?.avatar ?? ""}`} width={25} height={25} className="rounded-full" alt="icon"/>
</span>
      </div>
  )
}

export default Header
