"use client"
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { flushSync } from 'react-dom';
export const Theme = createContext();
const ThemeContext = ({children}) => {
    const[theme,setTheme] = useState(true);
    useEffect(()=>{
        document.documentElement.classList.add(theme); 
        document.documentElement.classList.remove(theme === "dark" ? "light" : "dark" );
    },[theme])
  function ChangeTheme(ref = "null"){ 
      if(ref === "null") return
      
     const transition=  document.startViewTransition(()=>{
        flushSync(()=>{
          setTheme(theme === "light" ? "dark" : "light");
        })
    })
     const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;

    const radius = Math.hypot(Math.max(x, right), Math.max(y, bottom));
  
    transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    }
  return (
    <Theme.Provider value={{theme,ChangeTheme}} >
      {children}
    </Theme.Provider>
  )
}

export default ThemeContext
