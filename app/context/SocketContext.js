"use client"
import React from 'react'
import { createContext,useState,useEffect } from 'react'
import { io } from 'socket.io-client';
export const Socket = createContext(null);

const SocketContext = ({children}) => {
    const [socket,setSocket] = useState(null);
    useEffect(() => {
        const s = io("http://localhost:3001");
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
