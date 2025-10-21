"use client"
import {React,useContext,useEffect,useState} from 'react'
import { Upload,FolderPlus } from 'lucide-react'
import { User } from '@/app/context/UserContext';
import Loader from './loader';
const UploadFile = ({setUploadShow,handleFiles}) => {
  const [isDragging,setDragging] = useState(false);
  const [loading,setLoading] = useState(false);
  const {user} = useContext(User);
  useEffect(()=>{console.log(user);
  },[user])
  async function handleUpload(upload){
    if(!upload || !user) return 
    setLoading(true)
    const formData = new FormData();
    formData.append("file", upload);
    const now = new Date().toISOString();
    formData.append("time", now);
          formData.append("userId", user.id);
          console.log(now);
          
          formData.append("time",now)
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,{
            method: "POST",
            body : formData,
            credentials :"include"
          });
          console.log(upload);
          
          const data = await res.json();
          if(!res.ok){ 
            setLoading(false); 
            setDragging(false); 
            setUploadShow(false); 
            console.log(data.error) 
          }
          await handleFiles()
          setLoading(false)
          setDragging(false)
          setUploadShow(false);
      }
  return (
    <div className='fixed top-0 backdrop-blur-md w-screen h-screen flex flex-col items-center justify-center bg-gray-100'>
    <div onDrop={(e)=>{e.preventDefault(); handleUpload(e.dataTransfer.files[0])}} onDragOver={(e)=>{e.preventDefault(); setDragging(true)}}  className={`${isDragging && "opacity-65"} bg-[var(--foreground)] relative flex flex-col items-center justify-center py-6 px-2 gap-4 border-2 border-gray-400 border-dashed max-[500px]:w-[90%] max-[768px]:w-[480px] w-[60vw] min-h-[300px]`}>
    {loading && <Loader className="absolute top-1/2 left-1/2" />}  
      <Upload className='text-[var(--fileText)] w-8 h-8'/>
      <span className='flex flex-col gap-2 items-center'>
      <h1 className='text-[22px] max-[500px]:!text-[18px]'>Upload files or Create Directory</h1>
      <h2 className='text-[16px] max-[500px]:text-[14px]'> Drag and drop files here , or click to select files</h2>
      </span>
      <div className='min-[500px]:flex grid grid-cols-2 min-[680px]:gap-6 gap-2 !text-[14px] '>
        <button onClick={()=>document.getElementById("fileInput").click()} className='flex px-3 py-2 rounded-[8px] bg-blue-500 text-white gap-2 items-center justify-center'><input type="file" onChange={(e)=>{setDragging(true); handleUpload(e.target.files[0])}} className="hidden" id="fileInput" /><Upload  className='w-4 h-4'/>Upload</button>
        <button className='flex px-3 py-2 rounded-[8px] bg-green-500 text-white gap-2 items-center'><FolderPlus className='w-4 h-4' />Create Directory</button>
        <button className='flex px-3 py-2 rounded-[8px] bg-gray-600 text-white gap-2 items-center max-[500px]:col-span-2 justify-center'>
            <svg
          className="w-4 h-4 mr-2 transition-transform group-hover:scale-110 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>Import from Drive</button>
      </div>
    </div>
    </div>
  )
}

export default UploadFile
