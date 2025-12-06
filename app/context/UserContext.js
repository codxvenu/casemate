"use client"
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { usePathname } from 'next/navigation'
export const User = createContext()
const UserContext = ({Initialuser,children}) => {
  const[user,setUser] = useState(Initialuser)

  if(!user && !usePathname().includes("login")) return

  return (
    <div>
    <User.Provider value={{user,setUser}}>
      {children}
    </User.Provider>
    </div>
  )
}

export default UserContext
