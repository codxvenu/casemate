import { User } from '@/app/context/UserContext'
import { ChatService } from '@/hook/apifetch';
import { CircleQuestionMark } from 'lucide-react'
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const SendInvite = ({id,setReceiver_id}) => {
    const {user} = useContext(User);
    async function handleSendRequest(){
        const now = new Date()
        const data = await ChatService.sendRequest({requester_id : user.id,created_at : now,receiver_id : id})
        toast.success(data.message ?? "Request sent")
        setReceiver_id(false)
    }
  return (
    <div className='bg-[var(--fileBox)] w-[400px] h-[180px] flex flex-col items-center justify-center gap-3 absolute top-1/2 left-1/2 z-[1000] p-4 rounded-xl -translate-1/2'>
    <span className=' p-3 bg-[var(--foreground)] h-fit'>
        <CircleQuestionMark className='w-4 h-4' />
        </span>
      <h2>Send request to chat</h2>
      <p>Are u Sure u Want to Send request to Chat?</p>
      <span className='flex gap-4 w-[90%]'><button className='block p-2 px-4 bg-[var(--text)] text-[var(--foreground)] w-full' onClick={()=>setReceiver_id(false)}>Cancel</button> <button className='block p-2 px-4 text-[var(--text)] bg-[var(--foreground)] w-full' onClick={()=>handleSendRequest()}>Send</button> </span>
    </div>
  )
}

export default SendInvite
