"use client"
import { useApi, UserService } from '@/hook/apifetch'
import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
export const User = createContext()
const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
     useEffect(() => {
    const handleUser=async()=>{
      const data = await UserService.getUser()
      setUser(data?.user)
    }
handleUser();
},[])
  return (
    <div>
    <User.Provider value={{user}}>
      {children}
    </User.Provider>
    </div>
  )
}

export default UserContext
