"use client";
import SideBar from "@/components/sideBar";
import Stat from "@/components/stat";
import { Columns2, DoorOpen, EllipsisVertical,Bell,Trash2, ChevronRight, ChevronLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";

import { inter, montserrat } from "../layout";
import Loader from "@/components/loader";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [currentDate, setCurrentDate] = useState([]);
  const[SearchDate,setSearchDate]= useState({});
  const [currentNote, setCurrentNote] = useState([]);
  const [shownote, setShownote] = useState(false);
  const [notes, setnotes] = useState([]);
  const [stats,setStats] = useState([]);
  const [history,setHistory] = useState([]);
  const [notice,setNotice] = useState([]);
  const [formData,setformData] = useState({});
  const [showActions,setShowActions] = useState(false);
  useEffect(()=>{
    const date = new Date();
    const dateArray = {
      "day" : date.getDate(),
      "month": months[date.getMonth()],
      "year" : date.getFullYear()
    }
    setSearchDate(dateArray);
    
    console.log(dateArray);
    handleStats()
const stat = [
    { title: "Total users", description: "Users",iconTrue:true },
    { title: "Active cases", description: "cases",iconTrue:true },
    {title: "Pending Appoinments",description: "Appoinments",iconTrue:false},
];
setStats(stat)
  }
  ,[])
  useEffect(()=>{setCurrentDate([...Array(SearchDate?.month?.Days)])
  },[SearchDate])

const months = [
  { "id": 1, "monthName": "January", "Days": 31 },
  { "id": 2, "monthName": "February", "Days": 28 },
  { "id": 3, "monthName": "March", "Days": 31 },
  { "id": 4, "monthName": "April", "Days": 30 },
  { "id": 5, "monthName": "May", "Days": 31 },
  { "id": 6, "monthName": "June", "Days": 30 },
  { "id": 7, "monthName": "July", "Days": 31 },
  { "id": 8, "monthName": "August", "Days": 31 },
  { "id": 9, "monthName": "September", "Days": 30 },
  { "id": 10, "monthName": "October", "Days": 31 },
  { "id": 11, "monthName": "November", "Days": 30 },
  { "id": 12, "monthName": "December", "Days": 31 }
];



   const legalCases = [
  "Civil & Commercial", [
    { id: 1, title: "Breach of Contract", icon: "⚖️", description: "..." },
    { id: 2, title: "Property Dispute", icon: "🏠", description: "..." },
    { id: 3, title: "Cheque Bounce", icon: "💳", description: "..." },
    { id: 4, title: "Civil Suit Filing", icon: "📚", description: "..." },
  ],
  "Criminal & Cyber", [
    { id: 5, title: "Criminal Complaint", icon: "🚨", description: "..." },
    { id: 6, title: "Cyber Fraud / Online Scam", icon: "💻", description: "..." },
  ],
  "Family & Personal", [
    { id: 7, title: "Divorce & Family Matter", icon: "👨‍👩‍👧", description: "..." },
    { id: 8, title: "Wills & Succession", icon: "📜", description: "..." },
  ],
  "Business & Employment", [
    { id: 9, title: "Employment/Workplace Dispute", icon: "💼", description: "..." },
    { id: 10, title: "Startup / Business Agreement", icon: "📝", description: "..." },
  ],
  "Consumer & Public", [
    { id: 11, title: "Consumer Complaint", icon: "🛍️", description: "..." },
    { id: 12, title: "Public Interest Litigation (PIL)", icon: "📢", description: "..." },
  ],
   ];

const quickActions = [
    {
      id: 1,
      title: "Start Chatbot Chat",
      icon: "🧠",
      color: "indigo",
      description: "Open a new AI chatbot conversation",
      route: "/chatbot",
    },
    {
      id: 2,
      title: "Message User",
      icon: "💬",
      color: "green",
      description: "Start chatting with another user",
      route: "/user-chat",
    },
    {
      id: 3,
      title: "Upload File",
      icon: "📂",
      color: "blue",
      description: "Upload or manage your files",
      route: "/file-manager",
    },
    {
      id: 5,
      title: "View Usage / Stats",
      icon: "📊",
      color: "orange",
      description: "View your activity and analytics",
      route: "/stats",
    },
    {
      id: 6,
      title: "Manage Account",
      icon: "⚙️",
      color: "gray",
      description: "Access your profile and settings",
      route: "/settings",
    },
  ];
const lawyerNotes = [
  {
    title: "Court Hearing",
    time: "10:00 AM",
    description: "Hearing for Case #302 — Client: Ram Singh at District Court.",
    date : 8
  },
  {
    title: "Client Meeting",
    time: "2:30 PM",
    date : 8,
    description: "Meeting with Ms. Priya Sharma at office regarding property dispute papers."
  },
  {
    title: "Evidence Submission",
    time: "4:00 PM",
    date : 8,
    description: "Submit evidence documents for Case #188 in court registry."
  },
  {
    title: "Call Client",
    time: "6:00 PM",
    date : 9,
    description: "Call Mr. Arjun for final witness confirmation."
  },
  
  {
    title: "Draft Petition",
    time: "Evening",
    date : 10,
    description: "Prepare draft for anticipatory bail matter for Case #515."
  }
];
function handleDate(index){
  setCurrentNote([])
  setSearchDate((prev)=>{
    return prev.day === index+1 ? prev : {...prev,"day": index+1}
  })
}
function handleDec(){
  setCurrentNote([])
  setSearchDate((prev)=>{
    return prev?.month?.id === 1 ?  {...prev,month : months[11],"year" : prev.year - 1} : {...prev,month : months[prev?.month?.id - 2]}
  })
}
function handleInc(){
  setCurrentNote([])
  setSearchDate((prev)=>{
    console.log(months[Number(prev?.month?.id) + 1],prev?.month?.id);
    return prev?.month?.id === 12 ?  {...prev,month : months[0],"year" : prev.year + 1} : {...prev,month : months[prev?.month?.id]}
  })
}
async function handleStats(){
  const res = await fetch(`/api/stats`,{
    credentials : "include",
    method : "GET"
  });
const data = await res.json();
if(!res.ok) return alert(data.error);
setStats((prev)=>
  prev.map((i)=>(
    {...i,value : data.data[0][i.description]}
  )))
setHistory(data.data[1])
setNotice(data.data[2])
setLoading(false)
}
async function handleAddnotice(){
  const res = await fetch("/api/addnotice",{
    credentials : "include",
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({formData})
  });
  const data = res.json();
  if(req.ok) return alert(data.error);
  console.log("note added");
  
}
function ConvertDate(date){
  var date = new Date(date);
  console.log({"day" : date.getDate() ,"month" : date.getMonth(),"year" : date.getFullYear()},date);
  
  return {"day" : date.getDate() ,"month" : date.getMonth()+1,"year" : date.getFullYear()}
}
function ConvertTime(time){
  const [hours,min] = time.split(":")
  return Number(hours) >= 12 ? `${hours%12}:${min} AM` : `${hours%12}:${min} PM`
}

  return (
    <div className={`flex max-h-screen overflow-x-clip overflow-scroll ${inter.className}`} style={{scrollbarWidth : "none"}}>
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={0}
        className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`}
      />
      {loading ? <div className="flex items-center justify-center w-full h-screen">
      <Loader/>
      </div> : 
      <div className="bg-[var(--foreground)] w-screen h-screen flex flex-col">
        {/* header */}
        <div className="flex justify-between px-2 py-2 bg-[var(--fileBox)] rounded mt-3 mb-2 max-h-[55px]">
          <button
            className="p-2 px-3 bg-[var(--foreground)] mr-2 max-[768px]:hidden"
            onClick={() => setIconOnly(!iconOnly)}
          >
            <Columns2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 px-3 bg-[var(--foreground)] mr-2 min-[768px]:hidden"
            onClick={() => setShowBar(!showBar)}>
            <Columns2 className="w-4 h-4" />
          </button>
          <div className="flex gap-2 items-center flex-row-reverse w-full mr-3">
            <span className="bg-[var(--foreground)] flex w-8 h-8 rounded-full items-center justify-center">N</span>
            <span className="bg-[var(--foreground)] flex w-8 h-8 rounded-full items-center justify-center"><Bell className="w-4 h-4"/></span>
            <span className="bg-[var(--foreground)] flex w-max rounded-[5px] p-3 py-2 max-[350px]:hidden"><input type="text" placeholder="Search...." className="placeholder:text-[var(--text)]"/></span>

          </div>
        </div>
         {/* header */}
         <div className="p-2 bg-[var(--fileBox)] min-[1024px]:hidden">
          <div  className="p-2 bg-[var(--foreground)] flex justify-between items-center relative">
            <span>
           <span className={`text-[18px] font-semibold`}>Welcome Back,</span> <span className="text-[16px] font-medium">Nitesh</span>  
            </span>
           <EllipsisVertical className="w-5 h-5" onClick={()=>setShowActions(!showActions)} />
           {showActions && 
           <div className="absolute top-[45px] right-0 bg-[var(--fileBox)] z-[10000] p-2">
           <ul className="flex flex-col justify-center items-start gap-1  ">
                {quickActions.map((i) => (
                  <li
                    className="flex border-b-2 px-2 py-2 group/actions border-[var(--fileBox)] gap-2 bg-[var(--foreground)] w-full items-center"
                    key={i.title}
                  >
                    {i.icon}{" "}
                    <span className={` flex flex-col items-start justify-center text-[13px] text-[var(--fileText)] relative`}>
                      <h2 className="text-[var(--text)]">{i.title}</h2>{" "}
                      
                    </span>
                      </li>
                ))}
              </ul>
           </div>
           }
          </div>
         </div>
        <div className="max-[425px]:flex flex-col grid max-[680px]:grid-rows-1 max-[1024px]:grid-cols-3 grid-cols-4 max-[768px]:grid-rows-11 grid-rows-2 gap-2 h-max mb-6">
          {/* Stats */}
          
          <div className="max-[425px]:flex flex-col grid grid-cols-4 max-[600px]:grid-cols-6 max-[768px]:grid-cols-3 col-span-3  max-[680px]:row-span-auto max-[768px]:row-span-7 gap-3 px-3 py-3 bg-[var(--fileBox)]">
            {stats.map((i, index) => (
              <Stat
                key={index}
                title={i.title}
                fn={i.value}
                description={i.description}
                iconTrue={i.iconTrue}
              />
            ))}
            <div className="bg-[var(--foreground)] p-3 rounded-[5px]  row-span-2 max-[425px]:block max-[681px]:hidden">
             <span className="flex justify-between items-center max-[768px]:text-[12px] text-[14px] mb-2 text-center">
              <span className="max-[768px]:p-1  p-2 bg-[var(--fileBox)]" onClick={()=>handleDec()}>
              <ChevronLeft className="w-4 h-4" />
              </span>
              {SearchDate?.month?.monthName.slice(0,3)} {SearchDate?.year}
              {/* {getDate()[4]} {getDate()[3]} */}
             <span className="max-[768px]:p-1  bg-[var(--fileBox)]" onClick={()=>handleInc()}>
              <ChevronRight className="w-4 h-4" />
              </span>
              </span> 
              <ul className="grid grid-cols-7 gap-1.5 max-[768px]:text-[12px]  text-[13px]">
                
               { ["S", "M", "T", "W", "T", "F", "S"].map((i,index)=>(
                  <li key={index} className="px-1.5 font-medium text-center">{i}</li>
                ))}
            {currentDate.map((i,index)=>(
              <li onClick={()=>handleDate(index)} className={`${SearchDate?.day === index+1 && " bg-[var(--fileBox)] text-[var(--text)] font-bold"} p-1 py-2 text-[var(--fileText)] text-center`} key={index} >{index+1}</li>
            ))}
              </ul>
            </div>
           
              <div className="max-[600px]:col-span-3 max-[768px]:col-span-2 max-[768px]:row-span-2 row-span-1 col-span-3 bg-[var(--fileBox)] relative">
            <div className=" bg-[var(--foreground)] min-h-[130px] h-[100%] rounded max-[600px]:flex flex-col grid grid-cols-2">
              <div className="overflow-y-scroll max-[600px]:h-[138px] max-[768px]:h-[274px] h-[138px] scrollbtn" style={{scrollbarWidth : "none"}}>
             <ul className={`${inter.className} bg-[var(--fileBox)] flex flex-col gap-2  h-fit `} >
            {notice?.filter((i)=>ConvertDate(i.fortime).day === SearchDate.day && ConvertDate(i.fortime).month === SearchDate.month.id && ConvertDate(i.fortime).year === SearchDate.year)
            .map((n,index)=>(
            <li key={index} className="text-[13px] bg-[var(--foreground)] px-2 py-3 capitalize" onClick={()=>setCurrentNote(n)}>• {ConvertTime(n.fortime.split('T')[1])} — {n.Title}</li>
            ))}
            {/* {lawyerNotes?.filter((i)=>i.date === SearchDate.day).map((n,index)=>(
            <li key={index} className="text-[13px] bg-[var(--foreground)] px-2 py-3" onClick={()=>setCurrentNote(n)}>• {n.time} — {n.title}</li>
            ))} */}
               </ul>
            {notice.filter((i)=>ConvertDate(i.fortime).day === SearchDate.day && ConvertDate(i.fortime).month === SearchDate.month.id && ConvertDate(i.fortime).year === SearchDate.year).length ===0 && <h3 className="flex items-center justify-center p-12 text-[14px]">no notes </h3>}
              </div>
             <div className={`text-center align-middle flex items-center justify-start p-3 ${montserrat.className}`}>
              {currentNote.length === 0 ? 
              "No note selected"
              : 
              <ul className="flex flex-col items-start justify-start text-start text-[14px] capitalize">
                <li className="flex font-semibold gap-1">Title : <h3 className="font-normal text-[13px]"> {currentNote?.Title} </h3>  </li>
                <li  className="flex font-semibold gap-1">Time : <h3 className="font-normal text-[13px]">{ConvertTime(currentNote?.fortime.split('T')[1])}</h3></li>
                <li className=" font-semibold gap-1">Description : <p className="font-normal text-[13px]">{currentNote?.Description}</p></li>
              </ul>
              }
              </div>
           <span className="flex items-center bg-[var(--fileBox)] absolute right-0 p-2" onClick={()=>setShownote(!shownote)}>
            <Plus className="w-4 h-4"/>
            </span>  
            </div>
          </div> 
           <div className="bg-[var(--foreground)] p-3 rounded-[5px] max-[425px]:hidden row-span-2 max-[600px]:col-span-3 min-[681px]:hidden">
             <span className="flex justify-between items-center max-[768px]:text-[12px] text-[14px] mb-2 text-center">
              <span className="max-[768px]:p-1  p-2 bg-[var(--fileBox)]" onClick={()=>handleDec()}>
              <ChevronLeft className="w-4 h-4" />
              </span>
              {SearchDate?.month?.monthName.slice(0,3)} {SearchDate?.year}
              {/* {getDate()[4]} {getDate()[3]} */}
             <span className="max-[768px]:p-1  bg-[var(--fileBox)]" onClick={()=>handleInc()}>
              <ChevronRight className="w-4 h-4" />
              </span>
              </span> 
              <ul className="grid grid-cols-7 gap-1.5 max-[768px]:text-[12px]  text-[13px]">
                
               { ["S", "M", "T", "W", "T", "F", "S"].map((i,index)=>(
                  <li key={index} className="px-1.5 font-medium">{i}</li>
                ))}
            {currentDate.map((i,index)=>(
              <li onClick={()=>handleDate(index)} className={`${SearchDate?.day === index+1 && " bg-[var(--fileBox)] text-[var(--text)] font-bold"} p-1 py-2 text-[var(--fileText)] text-center`} key={index} >{index+1}</li>
            ))}
              </ul>
            </div>
          
          </div>
          {/* Stats */}
          {/* welcome msg */}
            <div className=" max-[1024px]:hidden p-3 bg-[var(--fileBox)]  min-h-[130px]  h-[100%] rounded" >
              {/* <h1 className='!text-xl'>Qucik actions</h1> */}
              <div className="overflow-y-scroll  max-h-[290px] bg-[var(--foreground)] h-full p-2" style={{scrollbarWidth : "none"}}>

          <>
          <span className={`text-[18px] font-semibold`}>Welcome Back,</span> <span className="text-[16px] font-medium">Nitesh</span>  
          </>  
           <br /><span className="text-[15px] font-normal">
            You last updated a case 2 hours ago. You have 1 appointment today
            </span>
              </div>
            </div>
            {/* welcome msg */}
        
       {/* cases */}
          <div className={`px-2 py-2 bg-[var(--fileBox)] col-span-3 max-[680px]:row-span-0 max-[768px]:row-span-4`}>
            <div className="px-2 py-3 h-[100%] rounded overflow-x-scroll" style={{scrollbarWidth : "none"}}>
              <table className="bg-[var(--foreground)] !w-max min-w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Last updated</th>
                    <th>Status</th>
                    <th>Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length !== 0 && history.map((i,index)=>(
                  <tr key={index}>
                    <td>{i?.Title}</td>
                    <td>{i?.Category}</td>
                    <td>{i?.updated}</td>
                    <td>{i?.status === 'active' ? <span className="text-green-500">Ongoing</span> : i?.status === 'closed' ? <span className="text-red-500">Closed</span> : <span className="text-red-500">Pending Hearing</span>}</td>
                    <td className="flex  gap-2 justify-center items-center"><span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><DoorOpen className="w-4 h-4" /></span> <span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><Trash2 className="w-4 h-4" /></span></td>
                  </tr>
                  ))}
                  {history.length === 0 && <tr>
                    <td></td>
                    <td></td>
                    <td>No history Found</td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>
          {/* cases */}
          {/* quick action */}
          <div className=" bg-[var(--fileBox)] col-span-1 max-[1024px]:hidden">
            {/* <div className="px-2 py-2  min-h-[130px] h-[100%] rounded">
              <ul className="flex flex-col gap-1.5 mt-1">
                {news.map((i,index)=>(
                <li key={index} className="flex  bg-[var(--foreground)] flex-col !text-[13px] text-[var(--fileText)] items-start justify-center gap-1 p-2">
                  <h2 className="text-[var(--text)]">
                    {i.title} 
                    </h2>
                    {i.source}({i.time})
                </li>
                ))

                }
              </ul>
            </div> */}
            <div className=" p-3 h-[100%] rounded">
              {/* <h1 className='!text-xl'>Qucik actions</h1> */}
              <ul className="flex flex-col justify-center items-start gap-1">
                {quickActions.map((i) => (
                  <li
                    className="flex border-b-2 px-2 py-2 border-[var(--fileBox)] gap-2 bg-[var(--foreground)] w-full items-center"
                    key={i.title}
                  >
                    {i.icon}{" "}
                    <span className={` flex flex-col items-start justify-center text-[13px] text-[var(--fileText)]`}>
                      <h2 className="text-[var(--text)]">{i.title}</h2>{" "}
                      {i.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
         
          </div>
            {/* quick action */}
        </div>
      </div>
      }
      {shownote && 
      <div className="backdrop-blur-md fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-screen h-screen flex items-center justify-center">
      <div className="w-[430px] h-[350px]  bg-[var(--foreground)] p-4">
        <h1 className="text-center">Add note</h1>
        <form className="flex flex-col gap-2">
          <div className="flex justify-center flex-col gap-1">
          <label>Title</label>
          <input type="text" placeholder="title" className="bg-[var(--fileBox)] p-3 outline-0" onChange={(e)=>{setformData((prev)=>{return {...prev,"title" : e.target.value}})}} />
          </div>
          <div  className="flex justify-center flex-col gap-1">
          <label>Time</label>
          <input type="datetime-local" placeholder="Time" className="bg-[var(--fileBox)] p-3 outline-0" onChange={(e)=>{setformData((prev)=>{return {...prev,"time" : e.target.value}})}} />
          </div>
          <div  className="flex justify-center flex-col gap-1">
          <label>Description</label>
          <input type="text" placeholder="Description" onChange={(e)=>{setformData((prev)=>{return {...prev,"description" : e.target.value}})}}  className="bg-[var(--fileBox)] p-3 outline-0"/>
          </div>
          <div className="flex mt-2 w-full gap-2">
         <button className="flex w-full items-center px-3 py-2 bg-[var(--text)] text-[var(--foreground)] rounded-[5px] justify-center" onClick={()=>setShownote(!shownote)}>Cancel</button>
         <button className="flex w-full items-center px-3 py-2 bg-[var(--text)] text-[var(--foreground)] rounded-[5px] justify-center" onClick={()=>handleAddnotice()}>Add</button>
          </div>
        </form>
      </div>
      </div>
      }
      
    </div>
  );
};

export default page;
