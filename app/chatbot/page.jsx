"use client"
import {React,useContext,useEffect,useState} from 'react'
import { Ellipsis,ChevronLeft,SquarePen } from 'lucide-react'
import Message from '@/components/message'
import Bot from '@/components/bot'
import { Socket } from '../context/SocketContext'
import { User } from '../context/UserContext'
const page = () => {
  const[chat,setChats] = useState([]);
  const{user}=useContext(User);
  const{socket}=useContext(Socket);
  const [empty,setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const[loading , setLoading] = useState(true);
  useEffect(()=>{
    if(!socket || !user) return
    console.log(user,user.id);
    socket.on("replyDone",({fullReply})=>{
      setChats((prev)=>{
        const yes = prev[prev.length - 1].role === "assistant"
        const msg = !yes ? prev : prev.slice(0,-1)
        return [...msg,{role: "assistant", text : fullReply}]
      })
    });
    socket.emit("register", user.id);
    socket.on("history",(history)=>{
      setLoading(false)
      setChats(history)
    });
    socket.on("replyChunk",({text})=>{
      console.log(text);
      setChats((prev)=>{
        if(prev[prev.length - 1]){
          return [...prev.slice(0,-1),{...prev[prev.length - 1],completed : false,text : prev[prev.length - 1].text !== "loading" ? prev[prev.length - 1].text + text : text}]
        }else{
          return [...prev,{role : "assistant" , text : prev[prev.length - 1].text !== "loading" ? prev[prev.length - 1].text + text : text}]
        }
      });
    });
    socket.on("error",({error})=>{
      setChats((prev)=>{
        return [...prev.slice(0,-1),{role : "assistant" , error}]
      })
    });
  },[socket,user]);
  useEffect(()=>{
   window.scrollTo({
  top: document.body.scrollHeight,
  behavior: "smooth"  // smooth animation
});
console.log(chat);

    
  },[chat])
  useEffect(()=>{
    console.log(message);
  },[message])
  function sendMessage(){
    if(!socket || !user) return
    const now = new Date();
    console.log(message);
    
    setChats((prev)=>{
        return [...prev,{role: "user", text : message},{role : "assistant" , text : "loading",completed : false}]
      })
      console.log({userId: user.id, message: message,created_at : now });
      
    socket.emit("chatMessage",{userId: user.id, message: message,created_at : now });
    setMessage("");
    //document.getElementById("sendtxt").innerText = ""
    setEmpty("false");
  }
  function sendFn(m){
    if(!socket || !user) return
    const now = new Date();
  setChats((prev)=>{
        return [...prev,{role: "user", text : m},{role : "assistant" , text : "loading"}]
      })
      console.log({userId: user.id, message: m,created_at : now });
      
    socket.emit("chatMessage",{userId: user.id, message: m,created_at : now });
  }
  return (
    <>
    {loading ? 
    <>loading</>
    :
    <div className='flex flex-col items-center py-4'>
      
        
        
        <div className='w-full bg-white fixed top-0 py-4 flex justify-center'>

      <span className='flex justify-between items-center w-[85%]'>
        <button className='p-2 shadow-[5.92px_11.84px_23.68px_rgba(211,209,216,0.3)] rounded-[10px] flex items-center'> <ChevronLeft /></button>
       
        <h1>Welcome to CaseBot!</h1>
        <Ellipsis className="text-[#CBCCCD]" />
      </span>
        </div>
        {chat.length === 0 && <div className="mt-[56px] mb-[6rem] px-2 w-[100%]">
           <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
      {/* Welcome Message */}
      <p className="text-lg text-gray-600 max-w-md">
        CaseBot can help you summarize documents, research cases, or answer your questions instantly.
      </p>
 <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">What others are asking:</h2>
        <ul className="space-y-2">
          {[
            "Summarize a contract for me",
            "Research recent IP cases",
            "Explain my last case notes",
          ].map((chat, idx) => (
            <li
              key={idx}
              onClick={()=>{sendFn(chat)}}
              className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {chat}
            </li>
          ))}
        </ul>
      </div>

  
    </div>
        </div>}
        {chat.length !== 0  && 
      <div className='chatroom mt-[56px] mb-[6rem] px-2 w-[100%]'>
{chat.map((m,i)=>(
  m.role === "assistant" ? (
    <Bot key={i} text={m.error ? m.error : m.text} error={!!m.error} />
  ) : (
    <Message key={i} img={"image.png"} text={m.text}/>
  ) 
))}

      </div>}
       <div className='w-[90%] flex items-end justify-center gap-3 fixed bottom-0 py-3 bg-[var(--background)]'>
        <button className='w-[45px] h-[45px] bg-black text-white shrink-0 flex items-center justify-center rounded-2xl'>
        <img src="mic.svg" alt="" />
</button>

  
<label htmlFor="message" className='flex items-end p-4 shadow-2xl rounded-2xl w-full relative'>
    <div contentEditable="true" id='sendtxt' onKeyDown={(e)=>{if(e.key === "Enter"){e.preventDefault(); sendMessage()}}}  onInput={(e)=>{e.target.innerText.trim() === "" ? setEmpty(false) : setEmpty(true); setMessage(e.target.innerText)} } className='w-full outline-none peer'></div><small className={`absolute ${empty ? "hidden" : "peer-focus:hidden" }  pointer-events-none`}>Write now...</small>
{/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
<button onClick={sendMessage}>
<img src="send.svg" alt="" />
</button>

</label>

      </div>
      
    </div>
     }
    </>
  )
}

export default page
