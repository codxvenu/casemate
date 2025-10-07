"use client"
import React, { createElement, useContext, useEffect } from 'react'
import { useState } from 'react'
import {TextAlignJustify,House,ChevronRight,Search,Grid,List,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload} from 'lucide-react'
import UploadFile from '@/components/uploadFile'
import Image from 'next/image'
import Details from '@/components/details'
import { User } from '../context/UserContext'
const page = () => {
  
    const user = useContext(User);
    const [upload,setUpload] = useState(null);
    const [uploadShow,setUploadShow] = useState(false);
    const[allFiles,setAllFiles] = useState([])
    const [view,setView] = useState(1);
    const [close,setClose] = useState(false);
    const [files,setFiles] = useState(false);
    async function handleFiles(){
     if(!user.user?.id) return
       const res = await fetch(`/api/files`)
       const data = await res.json();
       if(!res.ok) return console.log(data.error);
       setFiles(data.files)
     }
  useEffect(()=>{
    handleFiles()
  },[user])
  useEffect(()=>{
    if(files) setAllFiles(files)
  },[files])
  useEffect(()=> console.log(files),[files])
    async function DownloadFile(file) {
      const res = await fetch(`https://ws.casemate.icu:3001/download/${user.user?.id}/${file.filename}`,{
        credentials : "include"
      })
      const blob = await res.blob();
      const a = document.createElement("a")
      a.href = window.URL.createObjectURL(blob);
      a.download = file.filename
      a.click()
    }
    async function ShareFile(file) {
      const res = await fetch(`https://ws.casemate.icu:3001/Share/`,{
        method : "POST",
        headers : {"Content-Type"  : "application/json"},
        body : JSON.stringify({file , userId})
      })
      const data = await res.json();
      if(!res.ok) return console.log(data.error);
      console.log(`Access Given to ${data.user}`);
      
    }
    async function RenameFile(file,filename) {
      const res = await fetch(`https://ws.casemate.icu:3001/rename`,{
        method : "PUT",
        headers : {"Content-Type"  : "application/json"},
        credentials : "include",
        body : JSON.stringify({oldName : file.filename , newName : filename,userId : user.user?.id})
      })
      const data = await res.json();
      if(!res.ok) return console.log(data.error);
      console.log("renamed");
      handleFiles()
      
    }
    async function DeleteFile(file) {
      console.log(file);
      
      const res = await fetch(`https://ws.casemate.icu:3001/delete/${user.user.id}/${file.filename}`,{
        method : "DELETE",
        credentials : "include"
      })
      const data = await res.json();
      if(!res.ok) return console.log(data.error);
      console.log(`Deleted File ${file.filename}`);
      handleFiles()
    }
    function handleSize(i){
      console.log(i/(1024*1024));
      
      const size = (i/(1024*1024)).toFixed(2)
      if(size == 0.00) return `${(i/1024).toFixed(2)} Kb`
      return `${size} Mb`
    }
    function handleFileType(type){
      switch (type) {
        case "pdf":
          return <FileText className="w-10 h-10 p-2.5 text-red-500 bg-gray-100 rounded-xl" />
          
        case "docx":
          return <FileText className="w-10 h-10 p-2.5 text-blue-500 bg-gray-100 rounded-xl" />
          
        case "mp3":
          return <Music className="w-10 h-10 p-2.5 text-pink-500 bg-gray-100 rounded-xl"/>
        case "mp4":
          return <Video className="w-10 h-10 p-2.5 text-shadow-amber-900 bg-gray-100 rounded-xl" />
          
        case "xlsx":
          return <FileSpreadsheet className="w-10 h-10 p-2.5 text-green-500 bg-gray-100 rounded-xl"/>
          
        case "png":
          return <Imageicon className="w-10 h-10 p-2.5 text-[var(--purple)] bg-gray-100 rounded-xl"/>
          
        case "jpg":
          return <Imageicon className='w-10 h-10 p-2.5 text-[var(--light_purple)] bg-gray-100 rounded-xl' />
          
        default:
          return <FileQuestionMark className='w-10 h-10 p-2.5 text-gray-500 bg-gray-100 rounded-xl'/>
          
      }
    }
    function formatDate(time){
      const date = new Date(time);
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      const day = String(date.getDate()).padStart(2, '0');
      const month = months[date.getMonth()]
      let hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const year = date.getFullYear();

      return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`
    }
    const actions = [
  { name: "Details", icon: Info , fn : (i)=>setClose(!close) },
  { name: "Download", icon: Download ,fn : (i)=>DownloadFile("KeyAuth.hpp")},
  { name: "Share", icon: Share2 , fn : (i)=>ShareFile(i)},
  { name: "Rename", icon: Edit , fn : (i)=>{const newName = prompt("What is the name of file u want"); RenameFile(i,newName)}}, 
  { name: "Delete", icon: Trash2,fn : (i)=>DeleteFile(i)}];
  return (
    <div className='bg-gray-100 w-screen min-h-screen h-fit'>
    <header className='p-4 flex justify-between items-center shadow bg-white'>
      <TextAlignJustify className='w-6 h-6'  />
      <h1>Case Manager</h1>
      <Image src="/bot.png"
  width={37}
  height={37}
  alt="Bot"
  className="icon"
      />
    </header>
    {/* <span className='px-4 py-3 flex '>
      <House className='w-4 h-4' /> <h1><ChevronRight className='w-4 h-4'/></h1>
      </span> */}
      <div className=' min-[400px]:grid grid-cols-2 justify--between px-4 py-4 bg-white mx-4 rounded mt-3'>
        <label className='max-[400px]:w-full min-[768px]:w-[40%] w-[50%] min-w-[250px] h-[40px] flex items-center gap-3 p-2 border-[1px] border-gray-300 rounded placeholder:text-gray-600 placeholder:font-medium'>
          <Search className='w-4 h-4 text-gray-400 ' />
          <input type="text" name='search' placeholder='Search files and folders...' className='outline-0' onChange={(e)=>{setAllFiles(files.filter(f =>
  f.filename.toLowerCase().includes(e.target.value.toLowerCase())))}}/>
        </label>
        <span className='flex gap-4 items-center justify-end h-[40px]  max-[400px]:hidden'>
         
        <a className='flex items-center p-1 rounded-[5px] bg-gray-100 max-[400px]:hidden'>
          <button onClick={()=>setView(1)} className={`${view === 1 && "bg-[var(--background)]"} p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out`}><Grid className="w-4 h-4" /></button>
          <button onClick={()=>setView(2)} className={`${view === 2 && "bg-[var(--background)]"} p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out`}><List className="w-4 h-4" /></button>
          </a>
        <span className='flex items-center  gap-2 border-[1px] border-gray-300 px-3 py-1 rounded h-full max-[768px]:hidden '>
      <ArrowUpDown className="w-4 h-4 text-gray-400" />
      <h2 className='!font-medium'>Sort by </h2>
      <select name="sort" id="">
        <option value="name">name</option>
      </select>
        </span>
         <button onClick={()=>setUploadShow(!uploadShow)} className={`bg-gray-200 p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out flex gap-2 items-center`}><CloudUpload className="w-4 h-4" />Upload</button>
         
        </span>
      </div>
      <div className="store p-6 grid min-[850px]:grid-cols-3 min-[1200px]:grid-cols-4 max-[850px]:grid-cols-2 max-[550px]:grid-cols-1 gap-4 justify-items-center">

        {allFiles && allFiles.map((i,index)=>(

        <div key={index} className='bg-white px-3 py-3 rounded-2xl min-[850px]:max-w-[350px]  w-[100%] hover:shadow-2xl hover:translate-y-1 transition-all duration-150 ease-in-out'>
          <span className='flex justify-between items-center '>
         {handleFileType(i.type)}
         <button className={`${i.type==="folder" && "hidden"} p-4 -mr-4 group/more relative`}>
          <EllipsisVertical className='w-6 h-6' />
         <div className='absolute top-2 right-8 bg-white drop-shadow-xl  group-hover/more:block hidden  transition-all duration-150 ease-in-out'>
         <ul className=' p-3 w-fit h-fit flex flex-col gap-2 relative'>
          {actions.map((m,index)=>(
          <li onClick={()=>m.fn(i)} key={index} className={`${m.name === "Delete" && "text-red-600"} flex items-center gap-2 text-gray-600 font-medium cursor-pointer`}>
             <m.icon className='w-4 h-4'/> 
             {m.name}
          </li>
          ))}
         </ul>
         </div>
          </button>
          </span>
          <span className='grid gap-3 mt-3'>
            <h1 className='!text-[18px] text-gray-700'>{i.filename}</h1>
            <small className='bg-gray-200 text-gray-600 font-medium px-2 py-1 rounded w-fit'>{i.type}</small>
            <ul className='flex flex-col gap-2 !text-[14px]'>
              <li className='flex justify-between '>
                <h2 className='text-gray-400 font-medium'>Size</h2>
                <h2 className='text-gray-700'>{handleSize(i.size)}</h2>
              </li>
              <li className='flex justify-between'>
                <h2 className='text-gray-400 font-medium'>Modified</h2>
                <h2 className='text-gray-700'>{formatDate(i.created_at)}</h2>
              </li>
            </ul>
          </span>
          <ul className='border-t-[1px] border-gray-300 grid grid-cols-2 mt-3 p-3 items-center gap-2'>
            <li className='flex items-center gap-2 justify-start' onClick={()=>setClose(true)}>
              <Info className='w-4 h-4' /> Details
              </li> 
            <li className='flex items-center gap-2 justify-end' onClick={()=>DownloadFile(i)}>
              <Download className='w-4 h-4 shrink-0' /> Download
              </li> 
          </ul>
        </div>
        ))}
      </div>
      {/* <input type="file" onChange={(e)=>setUpload(e.target.files[0])}  />
      <button onClick={()=>handleUpload()}>upload</button>
       */}
      {close && 
      <Details onClose={setClose}/>
      }
  {uploadShow &&  <UploadFile setUploadShow={setUploadShow} handleFiles={handleFiles} />
   }
   </div>
  )
}

export default page
