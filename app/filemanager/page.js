"use client"
import React, { createElement, useContext, useEffect } from 'react'
import { useState } from 'react'
import {TextAlignJustify,Type,HardDrive,Clock,House,ChevronRight, SortAsc,
  SortDesc,Search,Grid,List,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,ChevronDown,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload} from 'lucide-react'
import UploadFile from '@/components/uploadFile'
import Image from 'next/image'
import Details from '@/components/details'
import { User } from '../context/UserContext'
import GridView from '@/components/gridView'
import ListView from '@/components/listView'
import Loader from '@/components/loader'
const page = () => {
    const user = useContext(User);
    const [upload,setUpload] = useState(null);
    const [sortName,setSortName] = useState("Name");
    const [showSort,setShowSort] = useState(null);
    const [loading,setLoading] = useState(true)
    const [uploadShow,setUploadShow] = useState(false);
    const[allFiles,setAllFiles] = useState([])
    const [view,setView] = useState(true);
    const [close,setClose] = useState(false);
    const [files,setFiles] = useState(false);
    async function handleFiles(){
     if(!user.user?.id) return
       const res = await fetch(`/api/files`)
       const data = await res.json();
       if(!res.ok) return setLoading(false); console.log(data.error);
       setFiles(data.files)
       setLoading(false)
     }
  useEffect(()=>{
    handleFiles()
  },[user])
  useEffect(()=>{
    if(sortName==="Name")  setAllFiles([...allFiles].sort((a, b) => a.filename.localeCompare(b.filename)));
    if(sortName==="Modified")  setAllFiles([...allFiles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    if(sortName==="Size")  setAllFiles([...allFiles].sort((a, b) => a.size - b.size ));
    console.log(allFiles);
    
    setShowSort(false);
  },[sortName])
  useEffect(()=>{
    if(!files) return setAllFiles([])
    setAllFiles(files)
    console.log(!!files);
  
  },[files])
  useEffect(()=> console.log(files),[files])
    async function DownloadFile(file) {
      setLoading(true)
      const res = await fetch(`${process.env.BACKEND_URL}/download/${user.user?.id}/${file.filename}`,{
        credentials : "include"
      })
      const blob = await res.blob();
      const a = document.createElement("a")
      a.href = window.URL.createObjectURL(blob);
      a.download = file.filename
      setLoading(false)
      a.click()
      
    }
    async function ShareFile(file) {
      setLoading(true)
      const res = await fetch(`${process.env.BACKEND_URL}/Share/`,{
        method : "POST",
        headers : {"Content-Type"  : "application/json"},
        body : JSON.stringify({file , userId : user.user?.id})
      })
      const data = await res.json();
      if(!res.ok) return setLoading(false); console.log(data.error);
      console.log(`Access Given to ${data.user}`);
      setLoading(false)
    }
    async function RenameFile(file,filename) {
      setLoading(true)
      const res = await fetch(`${process.env.BACKEND_URL}/rename`,{
        method : "PUT",
        headers : {"Content-Type"  : "application/json"},
        credentials : "include",
        body : JSON.stringify({oldName : file.filename , newName : filename,userId : user.user?.id})
      })
      const data = await res.json();
      if(!res.ok) return setLoading(false); console.log(data.error);
      console.log("renamed");
      setLoading(false)
      handleFiles()
      
      
    }
    async function DeleteFile(file) {
      setLoading(true)
      const res = await fetch(`${process.env.BACKEND_URL}/delete/${user.user.id}/${file.filename}`,{
        method : "DELETE",
        credentials : "include"
      })
      const data = await res.json();
      if(!res.ok) return console.log(data.error);
      console.log(`Deleted File ${file.filename}`);
      setLoading(false)
      handleFiles()
    }
    function handleSize(i){
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
  { name: "Details", icon: Info , fn : (i)=>setClose(i) },
  { name: "Download", icon: Download ,fn : (i)=>DownloadFile(i)},
  { name: "Share", icon: Share2 , fn : (i)=>ShareFile(i)},
  { name: "Rename", icon: Edit , fn : (i)=>{const newName = prompt("What is the name of file u want"); RenameFile(i,newName)}}, 
  { name: "Delete", icon: Trash2,fn : (i)=>DeleteFile(i)}];
  return (
   
    <div className={`${allFiles && "overflow-hidden h-screen"} bg-gray-100 w-screen min-h-screen h-fit {}`}>
      <div className=' min-[400px]:grid grid-cols-2 justify--between px-4 py-4 bg-white mx-4 rounded mt-3'>
        <label className='max-[400px]:w-full min-[768px]:w-[40%] w-[50%] min-w-[250px] h-[40px] flex items-center gap-3 p-2 border-[1px] border-gray-300 rounded placeholder:text-gray-600 placeholder:font-medium'>
          <Search className='w-4 h-4 text-gray-400 ' />
          <input type="text" name='search' placeholder='Search files and folders...' className='outline-0' onChange={(e)=>{setAllFiles(files.filter(f =>
  f.filename.toLowerCase().includes(e.target.value.toLowerCase())))}}/>
        </label>
        <span className='flex gap-4 items-center justify-end h-[40px]  max-[400px]:hidden'>
         
        <a className='flex items-center p-1 rounded-[5px] bg-gray-100 max-[400px]:hidden'>
          <button onClick={()=>setView(true)} className={`${view && "bg-[var(--background)]"} p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out`}><Grid className="w-4 h-4" /></button>
          <button onClick={()=>setView(false)} className={`${!view && "bg-[var(--background)]"} p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out`}><List className="w-4 h-4" /></button>
          </a>
        <span onClick={()=>setShowSort(!showSort)} className='flex items-center relative  gap-2 border-[1px] border-gray-300 px-3 py-1 rounded h-full max-[768px]:hidden '>
      <ArrowUpDown className="w-4 h-4 text-gray-400" />
      <h2 className='!font-medium'>Sort by </h2>
     <span className='flex gap-3 justify-between items-center'>
      {sortName} 
      <ChevronDown className='w-5 h-5 text-gray-500' />
     </span>
       {showSort && 
       <>
                <div
                  className="absolute top-0  inset-0 z-10"
                  onClick={() => setShowSort(false)}
                />
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[180px] animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    Sort by
                  </div>
                  {[
                    { key: "name", label: "Name", icon: Type },
                    { key: "size", label: "Size", icon: HardDrive },
                    { key: "modified", label: "Modified", icon: Clock },
                  ].map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.key}
                        onClick={() => setSortName(option.label)}
                        className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                          <span className="text-gray-700">{option.label}</span>
                        </div>
                        
                      </button>
                    );
                  })}
                </div>
              </>
      }
        </span>
         <button onClick={()=>setUploadShow(!uploadShow)} className={`bg-gray-200 p-3 py-2 rounded-[5px] transition-all duration-150 ease-in-out flex gap-2 items-center`}><CloudUpload className="w-4 h-4" />Upload</button>
         
        </span>
      </div>
      
       {loading && 
    <Loader className="absolute top-1/2 right-1/2 !w-12 h-12 " />
    }
       {allFiles?.length === 0 && !loading && 
    <div className='items-center justify-center flex flex-col h-[calc(100vh-84px)] text-gray-300' >
   <Folder className=' h-24 w-24'/>
   <h1>No file</h1>
    </div>
    }
      {view && <GridView allFiles={allFiles} handleFileType={handleFileType} actions={actions} handleSize={handleSize} formatDate={formatDate} DownloadFile={DownloadFile} setClose={setClose} />}
      {!view && <ListView allFiles={allFiles} handleFileType={handleFileType} actions={actions} handleSize={handleSize} formatDate={formatDate} />}
      
      {/* <input type="file" onChange={(e)=>setUpload(e.target.files[0])}  />
      <button onClick={()=>handleUpload()}>upload</button>
       */}
      {close && 
      <Details onClose={setClose} handleSize={handleSize} handleFileType={handleFileType} formatDate={formatDate} close={close} />
      }
    
  {uploadShow &&  <UploadFile setUploadShow={setUploadShow} handleFiles={handleFiles} />
   }
   </div>
  )
}

export default page
