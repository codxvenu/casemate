"use client"
import { useState } from 'react'
import { createContext } from 'react'
export const User = createContext()
const UserContext = ({Initialuser,children}) => {
  const[user,setUser] = useState(Initialuser)
  return (
    <div>
    <User.Provider value={{user,setUser}}>
      {children}
    </User.Provider>
    </div>
  )
}

export default UserContext
