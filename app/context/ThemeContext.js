"use client"
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const Theme = createContext();
const ThemeContext = ({children}) => {
    const[theme,setTheme] = useState(true);
    useEffect(()=>{
        if(!window.innerHeight) return
       const theme = localStorage.getItem("theme")
       if(theme){ 
        setTheme(theme) 
        return document.documentElement.classList.add(theme)
    }
       setTheme("light")
       document.documentElement.classList.add("Light")
    },[]);
    useEffect(()=>{
        document.documentElement.classList.add(theme); 
        document.documentElement.classList.remove(theme === "dark" ? "light" : "dark" );
    },[theme])
    function ChangeTheme(){ setTheme(theme === "light" ? "dark" : "light")}
  return (
    <Theme.Provider value={{theme,ChangeTheme}} >
      {children}
    </Theme.Provider>
  )
}

export default ThemeContext
