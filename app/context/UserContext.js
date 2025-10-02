"use client"
import React, { useState,useEffect } from 'react'
import { createContext } from 'react'
import { useRouter } from 'next/navigation'
export const User = createContext()
const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
    const router = useRouter();
     useEffect(() => {
    // Ensure socket route is initialized
    const handleUser=async()=>{
      const res = await fetch("/api/auth",{
        method : "GET",
        credentials : "include"
      });
      const data = await res.json();
      if(!res.ok) return router.push("/login");
       console.log(data);
      setUser(data.user)
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
