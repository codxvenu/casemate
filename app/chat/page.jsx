"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import { ArrowLeft, Columns2, Search } from "lucide-react";
import Person from "@/components/person";
import { User } from "../context/UserContext";
import { Socket } from "../context/SocketContext";
import SideBar from "@/components/sideBar";
import ChatBar from "@/components/ChatBar";
import Image from "next/image";
import ChatRoom from "@/components/Chat/ChatRoom";
import SidebarMd from "@/components/SidebarMd";
const page = () => {
  const { user } = useContext(User);
  const { socket } = useContext(Socket);
  console.log(user?.id);
  const [loading,setLoading] = useState(true)
  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const TextRef = useRef(null)
  useEffect(() => {
    if (!socket || !user) return
    setLoading(false)
    socket.emit("register", user.id);
    socket.on("receive-message", (msg) => {
      setChat((prev) => {
        const data = prev[prev.length - 1]
          ? handleFormatChat([prev[prev.length - 1], msg])
          : handleFormatChat([msg]);
        return [...prev.slice(0, -1), ...data];
      });
    });
    
    
  }, [socket, user]);

  async function init() {
    const result = await ActionIndexDb("message",0,receiver.id)
if(result === "Failed to read data") return console.log("Failed to read data");
console.log(result,receiver.id);

setChat(result);
  }
  useEffect(()=>{
    init()
  },[receiver])
  useEffect(()=>{
    if (!socket || !user) return
    // socket.emit("recent-message", {
    //   sender: user.id,
    //   receiver :  receiver.other_user_id
    // });
socket.on("receive-recent-message", (msg) => {
      setChat(handleFormatChat(msg));
    });
  },[receiver])

  const sendMessage = () => {
    if (message.trim() === "") return;
    const now = new Date();
    // emit 'send-message' to server
    const msg = {
      sender: user.id,
      receiver: receiver.other_user_id, // example: sending to user 2
      message: message,
      created_at: now,
      conver_id : receiver.id
    };
    socket.emit("send-message", msg);

    setChat((prev) => {
      const data = prev[prev.length - 1]
        ? handleFormatChat([prev[prev.length - 1], msg])
        : handleFormatChat([msg]);

      return [...prev.slice(0, -1), ...data];
    });
    setMessage(""); // clear input

    TextRef.current.innerText = "";
  };
  function handleFormatChat(msgs) {
    if (!msgs) return [];

    return msgs.map((msg, i) => {
      const prev = msgs[i - 1];
      const next = msgs[i + 1];
      let showTime = true;
      const crr = new Date(msg.created_at);
      const prevDate = prev ? new Date(prev.created_at) : null;
      const nextDate = next ? new Date(next.created_at) : null;
      const sameAsPrev = prev && prev.sender === msg.sender;
      const sameAsNext = next && next.sender === msg.sender;
      const closeToPrev = prevDate && (crr - prevDate) / 1000 < 60;
      const closeToNext = nextDate && (nextDate - crr) / 1000 < 60;
      if ((sameAsPrev && closeToPrev) || (sameAsNext && closeToNext)) {
        showTime = false;
      }
      return { ...msg, showTime };
    });
  }
  useEffect(()=>console.log(receiver,"receiverdata")
  ,[receiver])
 function CreateIndexDb() {
  return new Promise((resolve)=>{
    const req = indexedDB.open("casemate_chat", 1);
    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("message")) {
        const store = db.createObjectStore("message", { keyPath: "id" });
        store.createIndex("conversations_id", "conversations_id", { unique: false });
      }
      if (!db.objectStoreNames.contains("chats")) {
        db.createObjectStore("chats", { keyPath: "id" });
      }
      let exists = db.objectStoreNames.contains("chats") && db.objectStoreNames.contains("message")
      resolve(exists)
    };
    req.onsuccess = (event)=>{
      const db = event.target.result;
      let exists = db.objectStoreNames.contains("chats") && db.objectStoreNames.contains("message")
      resolve(exists)
    }
  })
}

 async function ActionIndexDb(table,task,data){
  // task 0 : readonly , task 1 : readwrite
  return new Promise((resolve,reject)=>{
   
    const req = indexedDB.open("casemate_chat",1)
    
    req.onsuccess = (event)=>{
      const db = event.target.result;
      const tx = db.transaction(table,task ? "readwrite" : "readonly")
      const store = tx.objectStore(table)
     if(!task) {
       let fdata = []
       if(table === "chats"){
         fdata = store.getAll()
        }else {
          const indexed = store.index("conversations_id")
         fdata = indexed.getAll(data)}
          fdata.onsuccess = () => {
          resolve(fdata.result); // <-- REAL DATA
        };
        fdata.onerror = () => reject("Failed to read data");
      } else if(task === 1) {
        Array.isArray(data) ? data.forEach((i)=>store.put(i)) :    store.put(data)
        resolve("updated")
      }else{
        reject("unkown task")
      }
    }
    req.onerror = ()=>{
      reject("failed to open schema")
    }
  })
    
  }
  return (
    <div className="flex bg-[var(--foreground)] min-[768px]:gap-3 justify-center">
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={2}
        className={`${true ? "iconOnly shrinkWidth" : " growWidth"}`}
      />
      <ChatBar showBar={showBar} setShowBar={setShowBar} atab={2} setReceiver={setReceiver} CreateIndexDb={CreateIndexDb} ActionIndexDb={ActionIndexDb}/>
      <div className=" w-full grid grid-rows-12 bg-[var(--fileBox)] relative ml-[-11px] h-screen" >
        <div className=" p-4 pt-2 pb-0 flex justify-between z-50 rounded w-full fixed top-0 bg-[var(--foreground)] items-center row-span-10">
          <button
                          className={`p-2 px-2 bg-[var(--foreground)] mr-2`}
                          onClick={() => setShowBar(!showBar)}
                        >
                        <ArrowLeft className="  w-4 h-4" />
                        </button>
          <li className="flex gap-2 items-center py-2 relative bg-[var(--foreground)] w-full px-1 rounded-sm">
            <Image
              src={`${receiver?.avatar ?? 'https://dummyjson.com/icon/sophiab/128'}`}
              width={30}
              height={30}
              alt="ramu"
              className=" rounded-full"
            />
            <span className="flex flex-col gap-1">
              <h3 className="!text-[13px]">{receiver?.name}</h3>
              <p className="w-[99%] text-ellipsis overflow-hidden !text-[12px] whitespace-nowrap">
                Last seen 2m ago
              </p>
            </span>
          </li>
        </div>
        <div className="overflow-scroll w-full h-full row-span-12 bg-[var(--foreground)]" style={{scrollbarWidth : "none"}}>
        {!loading && chat && <ChatRoom chat={chat} />}
        </div>
        <div className="w-[1200px] flex items-end justify-center gap-3 py-3 mx-auto row-span-2 fixed bottom-0 max-[680px]:left-1/2 max-[680px]:-translate-x-1/2">
          <button className="w-[45px] h-[45px] bg-black text-[var(--text)] shrink-0 flex items-center justify-center rounded-2xl">
            <img src="mic.svg" alt="" />
          </button>
          <label
            htmlFor="message"
            className="flex items-end p-4 shadow-2xl rounded-2xl bg-[var(--fileBox)] w-full relative"
          >
           <div
      contentEditable
      className="w-full outline-none peer"
      ref={TextRef}
      onInput={(e) => {
        const text = e.target.innerText;
        setMessage(text);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault(); // Prevent new line
          sendMessage();
        }
      }}
    />
            <small
              className={`absolute ${
                empty ? "hidden" : "peer-focus:hidden"
              }  pointer-events-none`}
            >
              Write now...
            </small>
            {/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
            <button onClick={()=>sendMessage}>
              <img src="send.svg" alt="" />
            </button>
          </label>
        </div>
      </div>
        <SidebarMd />
    </div>
  );
};

export default page;
