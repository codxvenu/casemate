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
  X,
  Home,
  FilePen,
  Pencil} from 'lucide-react'
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
import RenameD from '@/components/dialoge/RenameD'
import DeleteD from '@/components/dialoge/DeleteD'
import { handleCopyClipBoard } from '@/utility/lib/Copy'
import ShareD from '@/components/dialoge/ShareD'
import { handleSize } from '@/utility/lib/files'
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
    const [files,setFiles] = useState([]);
    const [iconOnly,setIconOnly] = useState(false);
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [RenameShow,setRenameShow] = useState(false);
    const [DeleteShow,setDeleteShow] = useState(false); 
    const [ShareShow,setShareShow] = useState(true); 
    const[Upath,setUpath] = useState([])
    
    async function handleFiles(){
     if(!user?.id) return
     const filepath = CurrentPath()
       const data = await FileService.getFiles(filepath);
       setAllFiles(data.files ?? [])
       setLoading(false)
     }
    async function handleCreateDir(foldername){
      setLoading(true)
     if(!user?.id) return
     const fpath = CurrentPath()
     const time = new Date()
       const data = await FileService.CreateDir({foldername,fpath,userId : user.id,time});
       if(data.success){
         handleFiles 
        setLoading(false)
       } 
     }
  useEffect(()=>{
    handleFiles()
  },[Upath])
  useEffect(()=>{
   console.log(RenameShow);
   
  },[RenameShow])
  // useEffect(()=>{
  //   if(sortName==="Name")  setAllFiles([...allFiles].sort((a, b) => a.filename.localeCompare(b.filename)));
  //   if(sortName==="Modified")  setAllFiles([...allFiles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  //   if(sortName==="Size")  setAllFiles([...allFiles].sort((a, b) => a.size - b.size ));
  //   setShowSort(false);
  // },[sortName])
  useEffect(()=>{
    if(!allFiles) return setFiles([])
    setFiles(allFiles)
  },[allFiles])
    async function DownloadFile() {
      setLoading(true)
      const backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL
      const res = await fetch(`${backend_Url}/download`,{
        method : "POST",
        credentials : "include",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({selectedIds : selectedFiles.map(i=>i.fileId)})
      })
      const blob = await res.blob();
      window.open(window.URL.createObjectURL(blob),"_")
      setLoading(false)
      setSelectedFiles([])
    }
    function CurrentPath(){
      let Cpath = "";
     Upath.forEach((e)=>{
        if(!e) return
      Cpath += `${e}/`
      return 
    })
     const filepath = `/${user.id}/${Cpath}`
      return filepath
    }
    async function ShareFile(file) {
      setLoading(true)
      const data = await FileService.share({file , userId : user.user?.id})
      toast.success(data.message ?? "File Shared")
      setLoading(false)
    }
    async function RenameFile(newName,oldName) {
      setSelectedFiles([])
      setLoading(true)
      const data = await FileService.rename({fileId : selectedFiles[0].fileId,newName : `${newName}.${oldName.split(".")[1]}`})
      handleFiles()
      setRenameShow(false)
      setLoading(false)
    }
    async function DeleteFile() {
      setLoading(true)
      const data = await FileService.delete(selectedFiles.map(i=>i.fileId))
      setSelectedFiles([])
      toast.error(`Total files deleted ${data?.results?.success?.length} & Failed ${data?.results?.failed?.length}`)
      setLoading(false)
      setDeleteShow(false)
      handleFiles()
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
    fn: () => setSelectedFiles([]),
    icon: X
  },
  {
    name: "Share",
    fn: (i) =>ShareFile(i),
    icon: UserPlus
  },
  {
    name: "Rename",
    fn: () =>setRenameShow(selectedFiles[0].filename),
    icon: FilePen
  },
  {
    name: "Download",
    fn: (i) => DownloadFile(i),
    icon: Download
  },
  {
    name: "Move",
    fn: (i) => MoveFile(i),
    icon: FolderSymlink
  },
  {
    name: "Delete",
    fn: ()=>setDeleteShow(true),
    icon: Trash2
  },
  {
    name: "Copy Link",
    fn: () => CopyUrl(),
    icon: Link2
  },
];

function CopyUrl(){
  const WebUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  const fileId = files.filter(i=>i.filename === selectedFiles[0])[0]?.fileId
  const CompleteUrl = `${WebUrl}/file/view/${fileId}`
  handleCopyClipBoard(CompleteUrl)
  selectedFiles([])
} 
function handleSelection(i){
  if(!i) return
  setSelectedFiles((prev)=>{
    return prev?.some((j)=>j.filename === i.filename) ? [...prev.filter((j)=>
      j.filename !== i.filename
    )] : [...prev,i]
  })
}
function handlePathSystem(i){
  if(!i || i.type !== "folder") return
  setFiles([])
  setUpath((prev)=>{
    return prev?.includes(i.filename) ? [...prev] : [...prev,i.filename]
  })
}
useEffect(()=>{
  console.log(selectedFiles);
  
},[selectedFiles])
  return (
   <div className='flex max-[768px]:flex-col bg-gray-50 overflow-hidden h-screen'>
   <SideBar atab={1} setIconOnly={setIconOnly} iconOnly={iconOnly} showBar={showBar} setShowBar={setShowBar} className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`} />
    <Header setShowBar={setShowBar}/>

        {/* Main Area */}
        <main className="flex flex-col p-2 min-[440px]:p-6 w-full">

          {/* Topbar: Search + actions */}
          <div className="flex max-[600px]:gap-3 max-[600px]:flex-col max-[600px]:items-end items-center justify-between min-[600px]:mb-6 max-[600px]:mb-3">
            <div className="flex items-center gap-4 w-1/2">
              <div className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-3 rounded-lg shadow-sm w-full">
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

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95" onClick={()=>setUploadShow((prev)=>!prev)}>Upload</button>
            </div>
          </div>
          <div className="flex min-[680px]:mb-1 w-full min-[625px]:flex-row flex-col items-center justify-between ">
             <div className="flex items-center gap-3 text-sm text-[var(--fileText)] p-1 px-4 mb-2 bg-white rounded-sm shadow-sm min-[625px]:w-1/2">
            <button className='hover:bg-gray-100 p-2 rounded-md flex gap-2 w-28 items-center ' onClick={()=>{setFiles([...allFiles]); setUpath([]); }}>
             <Home className='w-4 h-4 shrink-0'/>
             <div className='truncate'>{user.email}</div>
            </button>
             <ChevronRight className={`${!Upath.length && "hidden"} w-4 h-4`}/>
              {Upath?.map((i,index)=>(
                <button key={index} className='hover:bg-gray-100 p-2 rounded-md'>
              <div className="text-sm max-w-32 truncate">{i}</div>
                <ChevronRight className={`${(index+1) === Upath.length && "hidden"} w-4 h-4`}/>
                </button>
              ))}
          
            </div>
  {!!selectedFiles.length &&        
     <div className='flex gap-2  p-1 bg-[var(--foreground)] items-center rounded-3xl shadow-sm w-fit max-[680px]:mx-auto'>
        {actions.map((a)=>(
          <Fragment key={a.name}>
        <button  className='p-2 hover:bg-[var(--fileBox)] rounded-full relative group' onClick={a.fn}>
       <a.icon className="w-4 h-4"/>
        <small className='bg-black text-gray-100 rounded-sm absolute top-12 left-1/2 -translate-1/2 p-1 w-max group-hover:block hidden transition-all duration-200 ease-in-out'>{a.name}</small>
        </button>
       <h3 className={`${a.name === "Close" && "!block"} hidden`}>{selectedFiles?.length} selected</h3>
          </Fragment>
        ))}
      </div>
     } 
    
            
           
             </div>
         

          {/* Content area */}
          <div className="bg-white border h-full border-gray-100 p-4 rounded-lg shadow-sm overflow-y-scroll" style={{scrollbarWidth : "none"}}>
            
            <div className='w-full max-[600px]:h-[60vh] h-max'>
            {view === 'grid' ? (
              <div className="grid min-[440px]:grid-cols-[repeat(auto-fit,minmax(170px,215px))] gap-4 h-full p-1" >
                {files.sort((a,b)=>new Date(a.created_at) - new Date(b.created_at)).map((item,index) => (
                  <div key={index} className={`relative p-3 rounded-lg border aspect-auto min-[440px]:aspect-video shadow-sm  ${selectedFiles.some((i)=>i.filename === item.filename) ? 'border-blue-300 shadow-md' : 'border-transparent'} hover:border-gray-200 bg-white max-w-fit`} onClick={()=>handlePathSystem(item)}>

                    {/* <button onClick={() => handleSelection(item)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                     
                    </button> */}

                    <div className="flex flex-col items-start gap-3 justify-between">
                      <div className="w-full flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                          {item.type !== "folder" ? 
                         <span className='block p-2 bg-blue-50 text-blue-800 rounded-sm'>
                           <FileText className='w-5 h-5'/>
                          </span>
                           :
                           <Image src={`${handleFileType(item.type)}`} alt='name' width={40} height={40}/>
                          }
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-sm truncate whitespace-nowrap overflow-hidden text-ellipsis w-32 capitalize">{item.filename}</div>
                          <div className="text-xs text-gray-400 truncate uppercase">{item.type}</div>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between text-xs text-gray-500">
                        <div className={`${item.type === "folder" && "opacity-0"}`}>{handleSize(item.size)}</div>
                        <div className="relative">
                          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"  onClick={(e)=>{e.preventDefault(); handleSelection(item)}}>
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
                  <div key={index} className={`grid grid-cols-12 gap-4 items-center py-3 hover:bg-gray-50 rounded-md ${!!selectedFiles.some(i=>i.includes(item.name)) ? 'bg-blue-50' : ''}`} onClick={()=>handleSelection(item)}>
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
       { uploadShow && <UploadFile files={files} handleCreateDir={handleCreateDir} setUploadShow={setUploadShow} handleFiles={handleFiles} CurrentPath={CurrentPath}/>}
       {RenameShow && 
      <RenameD handleRename={RenameFile} oldname={RenameShow} setRenameShow={setRenameShow} loading={loading}/>
       }
       {false && 
      <ShareD handleRename={RenameFile} oldname={"RenameShow"} setRenameShow={setRenameShow} loading={loading}/>
       }
       {DeleteShow && 
      <DeleteD handleDelete={DeleteFile} selectedFiles={selectedFiles} setDeleteShow={setDeleteShow} loading={loading}/>
       }
       
      </div>
  )
}

export default page
