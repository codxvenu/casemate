"use client"
import React, { useState,useEffect, useContext } from 'react'
import { Phone,Video } from 'lucide-react'
import Person from '@/components/person'
import { User } from '../context/UserContext'
import { Socket } from '../context/SocketContext'
const page = () => {
  const {user} = useContext(User);
  const {socket} = useContext(Socket);
  console.log(user);
  
    const [empty,setEmpty] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
      useEffect(() => {
if(!socket || !user) return console.log("failed");
        console.log("passed");
    socket.emit("register", user.id);
    socket.emit("recent-message", {sender : user.id,receiver : user.id === 2 ? 3 : 2});

    // receive messages
    socket.on("receive-message", (msg) => {
    
      
      setChat((prev) => {
        const data = prev[prev.length - 1]? handleFormatChat([prev[prev.length - 1],msg])  : handleFormatChat([msg]);
        return [...prev.slice(0,-1), ...data]
      }
      );
    });
    socket.on("receive-recent-message", (msg) => {
      console.log(msg);
      setChat(handleFormatChat(msg));
    });

  }, [socket,user]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const now = new Date();
    // emit 'send-message' to server
    const msg = {
      sender: user.id,
      receiver: user.id === 2 ? 3 : 2, // example: sending to user 2
      message: message,
      created_at : now,
    };
    socket.emit("send-message",msg);
   
     setChat((prev) => {
       
       const data = prev[prev.length - 1] ? handleFormatChat([prev[prev.length - 1],msg]) : handleFormatChat([msg]);
       
        return [...prev.slice(0, -1), ...data]
      }
      );
    setMessage(""); // clear input
    document.getElementById("sendtxt").innerText = ""
  };
   function handleFormatChat(msgs){
    console.log(msgs);
    
    if(!msgs) return
    const processedChat = msgs.map((msg, index) => {
        let showTime = true
        var prev = msgs[index - 1]
        var next = msgs[index + 1]
        var crr = msg
        var prevDate = new Date(prev?.created_at);
        var nextDate = new Date(next?.created_at);
        var crrDate = new Date(crr?.created_at);
      if(!prev && !next){
        return { ...msg, showTime};
      }else if(!prev && next && crr){
        var author = next.sender === crr.sender;
        if(author){
          if((nextDate - crrDate) / 1000 < 60){
            showTime = false
            return { ...msg, showTime};
          }else{
           return { ...msg, showTime};
          }
        }else{
          return { ...msg, showTime};
        }
      }else if(prev && !next && crr){
        var author = prev.sender === crr.sender;
        if(author){
          if((crrDate - prevDate) / 1000 < 60){
            showTime = true
             return { ...msg, showTime};
          }else{
            return { ...msg, showTime};
          }
        }else{
          return { ...msg, showTime};
        }
      }
      else if(prev && next && crr){
        if(prev.sender === crr.sender && crr.sender === next.sender){
          if(((nextDate - crrDate) / 1000 < 60) === ((crrDate - prevDate) / 1000 < 60)){
            showTime = false
            return { ...msg, showTime};
          }else if((nextDate - crrDate) / 1000 < 60){
             showTime = false
            return { ...msg, showTime};
          }else{
            return { ...msg, showTime};
          }
        }else if(crr.sender === next.sender){
            if(((nextDate - crrDate) / 1000 < 60)){
              showTime = false
              return { ...msg, showTime};
            }else{
              return { ...msg, showTime};
            }
          }else{
          return { ...msg, showTime};
        }
      }else{
        alert("fucked")
      }
    
  });
  console.log(processedChat,"processed");
  
  return processedChat
  }
  const formatTime12 = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

  useEffect(()=>{
    window.scrollTo({
  top: document.body.scrollHeight,
  behavior: "smooth"  // smooth animation
});

  }
  ,[chat])
  return (
    <div className='flex items-center flex-col py-4'>
      <div className='flex w-[90%] justify-between border-b-[1px] border-[#DBDBDB] py-3 fixed top-0 bg-[var(--background)]'>
        <span className='flex'>
        <img src="boticon.svg" className='w-[40px] h-[40px]' alt="" />
<span className='flex flex-col justify-start ml-3'>
    <h1 className='!text-[18px] !font-bold'>Helpy</h1>
    <small className='!text-[12px] !font-medium text-[#616161]'>Online</small>
</span>
        </span>
<span className='flex gap-3'>
<button className='bg-[#F3F5F6] rounded-full w-[40px] h-[40px] flex justify-center items-center'>
    <img src="phone.svg" alt="" />
</button>
<button className='bg-[#F3F5F6] rounded-full w-[40px] h-[40px] flex justify-center items-center'>
  <img src="camera.svg" alt="" />

</button>
</span>
      </div>
      {chat && 
          <div className='chatroom mt-[70px] mb-[3rem] px-5 w-full'>
{chat.map((i, index) =>
  i.sender === user.id ? (
    <Person person={2} key={index} time={formatTime12(i.created_at)} timeShow={i.showTime} text={i.content || i.message} />
  ) : (
    <Person person={1} time={formatTime12(i.created_at)} timeShow={i.showTime} text={i.content || i.message} key={index} />
  )
)}

      {/* <Person person={2} time={"10:52"} text={"Maybe, Nearly July, 2022"} />
      <Person person={1} time={"10:52"} text={"OKay, I”m Waiting...."} /> */}
      </div>
      }

      <div className='w-[90%] flex items-end justify-center gap-3 fixed bottom-0 py-3 bg-[var(--background)]'>
        <button className='w-[45px] h-[45px] bg-black text-white shrink-0 flex items-center justify-center rounded-2xl'>
        <img src="mic.svg" alt="" />
</button>
<label htmlFor="message" className='flex items-end p-4 shadow-2xl rounded-2xl w-full relative'>
    <div contentEditable="true" id='sendtxt' onInput={(e)=>{e.target.innerText === "" ? setEmpty(false) : setEmpty(true); setMessage(e.target.innerText)} } className='w-full outline-none peer'></div><small className={`absolute ${empty ? "hidden" : "peer-focus:hidden" }  pointer-events-none`}>Write now...</small>
{/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
<button onClick={sendMessage}>
<img src="send.svg" alt="" />
</button>

</label>

      </div>
    </div>
  )
}

export default page
