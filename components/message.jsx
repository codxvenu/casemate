"use client"
import React, { useState,useRef ,useEffect} from 'react'
import { SquarePen } from 'lucide-react'
const Message = ({img,text,Onedit,id}) => {
  const [edit,setEdit] = useState(false);
  const [message,setMessage] = useState(text);
  const divRef = useRef(null);
   useEffect(() => {
    if (divRef.current && edit) {
      divRef.current.innerText = message;
    }
  }, [edit, message]);

  const handleCancel = () => {
    if (divRef.current) {
      divRef.current.innerText = message; // reset to last saved
    }
    setEdit(false);
  };

  const handleSave = () => {
    const newMessage = divRef.current.innerText;
    setMessage(newMessage);
    setEdit(false);
    Onedit({message : newMessage , id})
  };
  return (
    <div className={`flex items-center justify-between w-[100%] gap-3 p-5 relative ${edit && "mb-6"}`}>
        <img src={`/${img}`} width={37} height={37} alt="" className="icon" />
        <span className='flex justify-start w-full'>
            <div contentEditable={edit && "true"} ref={divRef} suppressContentEditableWarning={true} className='!text-[13px] !font-medium text-start w-full outline-0 wrap-anywhere whitespace-pre-wrap'>{message}</div>
            </span>
            {!edit && 
            <span className='relative group/edit'>
        <SquarePen className="text-[#BDBDBD] w-[14px] h-[14px]" onClick={()=>setEdit(!edit)} />
        <small className='absolute top-1/2 group-hover/edit:block hidden bg-[#000000c9] p-[5px_10px] rounded-[5px] left-1/2 !text-[11px] text-[var(--text)] -translate-x-1/2 translate-y-1/2'>Edit</small>    
            </span>
            }
{edit && 
            <span className='flex text-[11px] absolute -bottom-2 right-5 w-[100%] justify-end gap-[10px]'>
              <button className='border-[1px] border-[#BBBBBB] bg-black text-[var(--text)] px-4 py-1' onClick={handleSave}>Save</button>
              <button className='border-[1px] border-[#BBBBBB] px-3 py-2' onClick={handleCancel}>Cancel</button>
            </span>
}
      </div>
  )
}

export default Message
