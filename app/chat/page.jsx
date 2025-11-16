"use client";
import React, { useState, useEffect, useContext } from "react";
import { Columns2, Search } from "lucide-react";
import Person from "@/components/person";
import { User } from "../context/UserContext";
import { Socket } from "../context/SocketContext";
import SideBar from "@/components/sideBar";
import ChatBar from "@/components/ChatBar";
import Image from "next/image";
import ChatRoom from "@/components/Chat/ChatRoom";
const page = () => {
  const { user } = useContext(User);
  const { socket } = useContext(Socket);
  console.log(user);

  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState(0);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    if (!socket || !user) return
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
  useEffect(()=>{
    if (!socket || !user) return
    socket.emit("recent-message", {
      sender: user.id,
      receiver :  receiver.id
    });
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
      receiver: receiver.id, // example: sending to user 2
      message: message,
      created_at: now,
    };
    socket.emit("send-message", msg);

    setChat((prev) => {
      const data = prev[prev.length - 1]
        ? handleFormatChat([prev[prev.length - 1], msg])
        : handleFormatChat([msg]);

      return [...prev.slice(0, -1), ...data];
    });
    setMessage(""); // clear input
    document.getElementById("sendtxt").innerText = "";
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

  return (
    <div className="flex bg-[var(--foreground)] gap-3">
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={2}
        className={`${true ? "iconOnly shrinkWidth" : " growWidth"}`}
      />
      <ChatBar showBar={showBar} setShowBar={setShowBar} atab={2} setReceiver={setReceiver}/>
      <div className=" w-full overflow-hidden grid grid-rows-30 bg-[var(--fileBox)] h-screen relative ml-[-11px]">
        <div className=" p-4 pt-2 pb-0 flex justify-between z-50 rounded w-full fixed top-0 bg-[var(--foreground)] items-center">
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
        {chat && <ChatRoom chat={chat} />}

        <div className="w-[96%] flex items-end justify-center gap-3 py-3 bg-[var(--background)] mx-auto row-span-2">
          <button className="w-[45px] h-[45px] bg-black text-[var(--text)] shrink-0 flex items-center justify-center rounded-2xl">
            <img src="mic.svg" alt="" />
          </button>
          <label
            htmlFor="message"
            className="flex items-end p-4 shadow-2xl rounded-2xl w-full relative"
          >
            <div
              contentEditable="true"
              id="sendtxt"
              onInput={(e) => {
                e.target.innerText === "" ? setEmpty(false) : setEmpty(true);
                setMessage(e.target.innerText);
              }}
              className="w-full outline-none peer"
            ></div>
            <small
              className={`absolute ${
                empty ? "hidden" : "peer-focus:hidden"
              }  pointer-events-none`}
            >
              Write now...
            </small>
            {/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
            <button onClick={sendMessage}>
              <img src="send.svg" alt="" />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default page;
