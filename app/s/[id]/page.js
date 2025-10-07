"use client"
import {React,useContext,useEffect,useState} from 'react'
import { Ellipsis,ChevronLeft,SquarePen } from 'lucide-react'
import Message from '@/components/message'
import Bot from '@/components/bot'
import { User } from "@/app/context/UserContext"
import { useRouter,useParams } from 'next/navigation'
import { Socket } from '@/app/context/SocketContext'
const page = () => {
    const router = useRouter();
  const[chat,setChats] = useState([]);
  const{user}=useContext(User);
  const{socket}=useContext(Socket);

  const[loading , setLoading] = useState(true);
  const {id} = useParams();
  console.log(router,id);
  
  useEffect(()=>{
   async function handleChat(){
    if(!id) return
        const res = await fetch(`/api/s/${id}`);
        const data = await res.json();
        if(!res.ok) return alert("chat loading failed")
        setChats(data.chat)
    console.log(data);
    
    setLoading(false)
    }
    handleChat()
    if(!socket) return
   socket.on("route",({link})=>{
    router.push(link)
   })
  },[user])
  useEffect(()=>{
        window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"  // smooth animation
      });
      
    },[chat])
  useEffect(()=>console.log(chat)
  ,[chat])
   function handleContinueChat(){
      const now = new Date()
      socket.emit("continue-chat",[{...chat[0],userId : user.id,created_at:now},{...chat[1],userId : user.id,created_at:now}]);
    }
  return (
    <>
    {loading ? 
    <>loading</>
    :
    <div className='flex flex-col items-center py-4'>
      
        
        
        <div className='w-full bg-[var(--background)] fixed top-0 py-4 flex justify-center z-50'>

      <span className='flex justify-between items-center w-[85%]'>
        <button className='p-2 shadow-[5.92px_11.84px_23.68px_rgba(211,209,216,0.3)] rounded-[10px] flex items-center'> <ChevronLeft /></button>
       
        <h1 className="!text-[22px]">Shared Chat</h1>
        <Ellipsis className="text-[#CBCCCD]" />
      </span>
        </div>
      <div className='chatroom mt-[56px] mb-[4rem] px-2 w-[100%] '>
{chat.map((m,i)=>(
  m.role === "assistant" ? (
    <Bot key={i} id={m.id} text={m.error ? m.error : m.text} error={!!m.error}  />
  ) : (
    <Message key={i} id={m.id} img={"image.png"} text={m.text}/>
  ) 
))}

      </div>
        <div className='w-[100%] px-4 flex items-end justify-center gap-3 fixed bottom-0 py-3 bg-[var(--background)] '>
        <button className="py-2 px-3 bg-[#FAFAFA] border-[1px] border-[#CCCCCC] rounded-[5px]" onClick={()=>handleContinueChat()}>Continue Chat</button>
      </div>

      
    </div>
     }
    </>
  )
}

export default page
