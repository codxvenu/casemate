"use client"
import React from 'react'
import { createContext,useState,useEffect } from 'react'
import { io } from 'socket.io-client';
export const Socket = createContext(null);

const SocketContext = ({children}) => {
    const [socket,setSocket] = useState(null);
    console.log(process.env.NEXT_PUBLIC_WEBSOCK_URL,"casijajs");
    
    useEffect(() => {
        const s = io(process.env.NEXT_PUBLIC_WEBSOCK_URL,{transports: ["websocket", "polling"],path: "/socket.io/"});
        // const s = io("http://localhost:3001",{transports: ["websocket", "polling"],path: "/socket.io/"});
        setSocket(s);
        return () => {s.disconnect()}
    }, []);
  return (
    <Socket.Provider value={{socket}}>
      {children}
    </Socket.Provider>
  )
}

export default SocketContext
