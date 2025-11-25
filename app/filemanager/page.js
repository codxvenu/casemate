"use client"
import React, { createElement, Fragment, useContext, useEffect } from 'react'
import { useState } from 'react'
import {TextAlignJustify,Type,HardDrive,Clock,House,Ellipsis, SortAsc,
  SortDesc,Search,Grid,List,Columns2,ArrowUpDown,Folder,Info,ChevronUp,FileSpreadsheet,ChevronDown,EllipsisVertical, Download, Share2, Edit, Trash2,FileQuestionMark,Video,Music,FileText,Image as Imageicon,CloudUpload,
  ChevronRight,
  LayoutDashboard,
  CircleQuestionMark,
  File,
  FolderArchive,
  UserPlus,
  FolderSymlink,
  Link2,
  Cross,
  X} from 'lucide-react'
import UploadFile from '@/components/uploadFile'
import Image from 'next/image'
import Details from '@/components/details'
import { User } from '../context/UserContext'
import GridView from '@/components/gridView'
import ListView from '@/components/listView'
import Loader from '@/components/loader'
import SideBar from '@/components/sideBar'
import { FileService } from '@/hook/apifetch'
import { toast } from 'react-toastify'
import SidebarMd from '@/components/SidebarMd'
import { ConvertMDY } from '@/utility/lib/date'
import Header from '@/components/Header'
const page = () => {
    const {user} = useContext(User);
    const [upload,setUpload] = useState(null);
    const [showBar,setShowBar] = useState(false);
    const [sortName,setSortName] = useState("Name");
    const [showSort,setShowSort] = useState(null);
    const [loading,setLoading] = useState(false)
    const [uploadShow,setUploadShow] = useState(false);
    const[allFiles,setAllFiles] = useState([])
    const [view,setView] = useState("grid");
    const [showOptions,setShowOptions] = useState(false);
    const [files,setFiles] = useState(false);
    const [iconOnly,setIconOnly] = useState(false);
    const [selectedIds,setSelectedIds] = useState([]);
    
    async function handleFiles(){
     if(!user.user?.id) return
       const data = await FileService.getFiles();
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
    setShowSort(false);
  },[sortName])
  useEffect(()=>{
    if(!files) return setAllFiles([])
    setAllFiles(files)
  },[files])
    async function DownloadFile(file) {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/download/${user.user?.id}/${file.filename}`,{
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
      const data = await FileService.share({file , userId : user.user?.id})
      toast.success(data.message ?? "File Shared")
      setLoading(false)
    }
    async function RenameFile(file,filename) {
      setLoading(true)
      const data = await FileService.rename({oldName : file.filename , newName : filename,userId : user.user?.id})
      toast.success(data.message ?? "File renamed")
      setLoading(false)
      handleFiles()
      
      
    }
    async function DeleteFile(file) {
      setLoading(true)
      const data = await FileService.delete(user.id,file.filename)
      toast.success(data.message ?? "File Deleted")
      setLoading(false)
      handleFiles()
    }
    function handleSize(i){
      const size = (i/1024).toFixed(2)
      if(size < 1000) return `${(i/1024).toFixed(2)} KB`
      return `${size/1024} MB`
    }
    function handleFileType(type){
      switch (type) {
        case "pdf":
          return "/pdf.png"

        case "folder":
          return "/folder.svg"
          
        case "docx":
          return "/docx.svg"
          
        case "xsl":
          return "/xsl.svg"
        default:
          return <FileQuestionMark className='w-10 h-10 p-2.5 text-[var(--text)] bg-[var(--fileBox)] rounded-xl'/>
          
      }
    }
  //   const actions = [
  // { name: "Details", icon: Info , fn : (i)=>setClose(i) },
  // { name: "Download", icon: Download ,fn : (i)=>DownloadFile(i)},
  // { name: "Share", icon: Share2 , fn : (i)=>ShareFile(i)},
  // { name: "Rename", icon: Edit , fn : (i)=>{const newName = prompt("What is the name of file u want"); RenameFile(i,newName)}}, 
  // { name: "Delete", icon: Trash2,fn : (i)=>DeleteFile(i)}];
 const actions = [
  {
    name: "Close",
    fn: () => setSelectedIds([]),
    icon: X
  },
  {
    name: "Info",
    fn: () => console.log("info"),
    icon: UserPlus
  },
  {
    name: "Download",
    fn: () => console.log("download"),
    icon: Download
  },
  {
    name: "Move",
    fn: () => console.log("move"),
    icon: FolderSymlink
  },
  {
    name: "Delete",
    fn: () => console.log("delete"),
    icon: Trash2
  },
  {
    name: "Copy Link",
    fn: () => console.log("copy-link"),
    icon: Link2
  },
];

  const folders = [
  {
    name : "Documents",
    totalSize: "2.3 GB",
    type : "folder",
    dateCreated: "2025-01-12"
  },
   {
    name : "Videos",
    totalSize: "22.4 GB",
    type : "folder",
    dateCreated: "2024-12-10"
  },
  {
    name : "Documents",
    totalSize: "2.3 GB",
    type : "folder",
    dateCreated: "2025-01-12"
  },
  {
    name : "Projects",
    totalSize: "850 MB",
    type : "docx",
    dateCreated: "2025-02-03"
  },
  {
    name : "s,cskcscndskcdsnmnsmcasncask",
    totalSize: "5.7 GB",
    type : "pdf",
    dateCreated: "2024-11-29"
  },
  {
    name : "Videos",
    totalSize: "22.4 GB",
    type : "xsl",
    dateCreated: "2024-12-10"
  },
  {
    name : "Projects",
    totalSize: "850 MB",
    type : "docx",
    dateCreated: "2025-02-03"
  },
  {
    name : "Images",
    totalSize: "5.7 GB",
    type : "pdf",
    dateCreated: "2024-11-29"
  },
 
];
function handleSelection(i){
  if(!i) return
  setSelectedIds((prev)=>{
    return prev?.includes(i.name) ? [...prev.filter((j)=>
      j !== i.name
    )] : [...prev,i.name]
  })
}
useEffect(()=>{
  console.log(selectedIds);
  
},[selectedIds])
  return (
   <div className='flex max-[768px]:flex-col bg-gray-50 overflow-hidden h-screen'>
   <SideBar atab={1} setIconOnly={setIconOnly} iconOnly={iconOnly} showBar={showBar} setShowBar={setShowBar} className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`} />
    <Header setShowBar={setShowBar}/>

        {/* Main Area */}
        <main className="flex flex-col p-2 min-[440px]:p-6 w-full">

          {/* Topbar: Search + actions */}
          <div className="flex max-[600px]:gap-3 max-[600px]:flex-col items-center justify-between min-[600px]:mb-6">
            <div className="flex items-center gap-4 w-full">
              <div className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm w-full">
                <Search className='w-4 h-4 aspect-auto'/>
                 <input className="outline-none w-full text-sm" placeholder="Search files and folders..." />
              </div>
        
            </div>

            <div className="flex items-center gap-3 ml-4">
              <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-1">
                <button onClick={() => setView('grid')} className={`p-2 rounded ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`} title="Grid view">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                </button>
                <button onClick={() => setView('list')} className={`p-2 rounded ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`} title="List view">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="5" width="16" height="2" rx="1"/><rect x="4" y="11" width="16" height="2" rx="1"/><rect x="4" y="17" width="16" height="2" rx="1"/></svg>
                </button>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95">Upload</button>
            </div>
          </div>

          {/* Breadcrumb + selected info */}
          <div className="flex justify-end min-[680px]:mb-1 py-3">
          
             {!!selectedIds.length && 
     <div className='flex gap-2  p-1 bg-[var(--foreground)] items-center rounded-3xl shadow-sm w-fit max-[680px]:mx-auto'>
        {actions.map((a)=>(
          <Fragment key={a.name}>
        <button  className='p-2 hover:bg-[var(--fileBox)] rounded-full' onClick={a.fn}>
       <a.icon className="w-4 h-4"/>
        </button>
       <h3 className={`${a.name === "Close" && "!block"} hidden`}>{selectedIds?.length} selected</h3>
          </Fragment>
        ))}
      </div>
     } 
          </div>

          {/* Content area */}
          <div className="bg-white border h-full border-gray-100 p-4 rounded-lg shadow-sm  grid" >
            {!selectedIds.length && 
            <div className="flex items-center gap-3 text-sm text-[var(--fileText)]">
              <div className="text-sm font-light">root@venu</div>
              {`>`}
              <div className="text-sm font-light">Cases</div>
              {`>`}
              <div className="text-sm text-gray-500">Case #232</div>
          
            </div>}
            <div className='overflow-auto overflow-x-hidden w-full max-[600px]:h-[60vh]' style={{scrollbarWidth : "none"}}>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 min-[440px]:grid-cols-[repeat(auto-fit,minmax(155px,1fr))] gap-4 " >
                {folders.map((item,index) => (
                  <div key={index} className={`relative p-3 rounded-lg border aspect-auto min-[440px]:aspect-video  ${selectedIds.includes(item.name) ? 'border-blue-300 shadow-md' : 'border-transparent'} hover:border-gray-200 bg-white`} onClick={()=>handleSelection(item)}>

                    {/* <button onClick={() => handleSelection(item)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                     
                    </button> */}

                    <div className="flex flex-col items-start gap-3">
                      <div className="w-full flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                         <Image src={`${handleFileType(item.type)}`} alt='name' width={40} height={40}/>
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis w-full">{item.name}</div>
                          <div className="text-xs text-gray-400 truncate uppercase">{item.type}</div>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between text-xs text-gray-500">
                        <div>{item.totalSize}</div>
                        <div className="relative">
                          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                            <EllipsisVertical className='w-4 h-4'/> </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col" >
                <div className="grid grid-cols-12 gap-4 border-b border-gray-100 pb-2 text-xs text-gray-500">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-1">Access</div></div>

                {folders.map((item,index) => (
                  <div key={index} className={`grid grid-cols-12 gap-4 items-center py-3 hover:bg-gray-50 rounded-md ${selectedIds.includes(item.name) ? 'bg-blue-50' : ''}`} onClick={()=>handleSelection(item)}>
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0">
                       <Image src={`${handleFileType(item.type)}`} alt='name' width={40} height={40}/>
                      </div> 
                        <h3 className="font-medium text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</h3>
                        
                    </div>

                    <div className="col-span-3 text-sm text-gray-600">{item.type}</div>
                    <div className="col-span-2 text-sm text-gray-600">{item.totalSize}</div>

                    <div className="col-span-1 flex justify-between items-center">
                      <Image src={`${user.avatar}`} width={25} height={25} className='rounded-full' alt='folder'/>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>

          </div>

        </main>
        
      </div>
  )
}

export default page
