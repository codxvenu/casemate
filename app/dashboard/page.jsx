"use client";
import SideBar from "@/components/sideBar";
import Stat from "@/components/dashboard/stat";
import { Columns2, DoorOpen, UserRoundCheck,Bell,Trash2, ChevronRight, ChevronLeft, Plus, UserRoundX } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Loader from "@/components/loader";
import { User } from "../context/UserContext";
import { toast } from "react-toastify";
import { dashboardService } from "@/hook/apifetch";
import Calandar from "@/components/dashboard/calandar";
import Notices from "@/components/dashboard/notices";
import Dialogue from "@/components/dashboard/Dialogue";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [currentDate, setCurrentDate] = useState([]);
  const[SearchDate,setSearchDate]= useState({});
  const [Dashboard, setDashboard] = useState([]);
  const [shownote, setShownote] = useState(false);
  const [notes, setnotes] = useState([]);
  const [showBell,setShowBell] = useState(false);
  const [history,setHistory] = useState([]);
  const [notice,setNotice] = useState([]);
  const [formData,setformData] = useState({});
  const [showActions,setShowActions] = useState(false)
  const [requests,setRequests] = useState([])
  const {user} = useContext(User)
  useEffect(()=>{
    handleStats()
  }
  ,[])
async function handleStats(){
  const data = await dashboardService.getStats();
  setDashboard(data.data)
  setLoading(false)
}
async function handleAddnotice(){
  const data = await dashboardService.addNotice(formData)
  toast.success(data?.message || "Note added")
};

async function handleRequest(action,i) {
  const now = new Date();
  const body = {
    id : i.id,
    now,
    receiver_id : i.receiver_id,
    sender_id : user.id,
    action : action
  }
  const data = await dashboardService.actionReq(body)
  toast.success(data.message , "Message request Accept")
  setRequests((prev)=>{
    return prev.filter((j)=>j.id !== i.id)
  })
}
//const notices = notice?.filter((i)=>ConvertDate(i.fortime).day === SearchDate.day && ConvertDate(i.fortime).month === SearchDate.month.id && ConvertDate(i.fortime).year === SearchDate.year)
  return (
    <div className={`flex max-h-screen overflow-x-clip overflow-scroll `} style={{scrollbarWidth : "none"}}>
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={0}
        className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`}
      />
      {loading ? <div className="flex items-center justify-center w-full h-screen">
      <Loader/>
      </div> : 
      <div className="bg-[var(--fileBox)] w-screen h-screen flex flex-col">
        {/* header */}
        <div className="flex justify-between px-2 py-3 bg-[var(--foreground)] rounded mt-3 mb-2 max-h-[55px] max-[680px]:mt-0 max-[680px]:w-full max-[680px]:fixed top-0 z-[1000]">
          <button
            className="p-2 px-3 hover:bg-[var(--fileBox)] mr-2 max-[768px]:hidden rounded-md"
            onClick={() => setIconOnly(!iconOnly)}
          >
            <Columns2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 px-3 hover:bg-[var(--fileBox)] mr-2 min-[768px]:hidden rounded-md"
            onClick={() => setShowBar(!showBar)}>
            <Columns2 className="w-4 h-4" />
          </button>
          <div className="flex gap-2 items-center flex-row-reverse w-full mr-3">
            <span className="bg-[var(--fileBox)] flex w-8 h-8 rounded-full items-center justify-center">N</span>
            <span onClick={()=>setShowBell(!showBell)} className="bg-[var(--fileBox)] flex w-8 h-8 rounded-full items-center justify-center relative"><span className="absolute -top-[.5rem] -right-4 bg-[var(--text)] text-[var(--foreground)] p-2 rounded-full w-8 h-5 flex items-center justify-center">
              <small >20+</small>
              </span>
               <Bell className="w-4 h-4"/>
               {showBell && 
                <Dialogue handleRequest={handleRequest} Dashboard={Dashboard} setShowBell={setShowBell}/>
               }
               </span>
          </div>
        </div>
        <div className="grid max-[600px]:flex flex-col max-[680px]:mt-[45px] grid-cols-[repeat(auto-fit,minmax(250px,.5fr))] grid-rows-auto p-3 gap-3">
       <Stat stat={Dashboard?.stat ?? []}/>
       <Calandar/> 
       <Notices iconOnly={iconOnly} setShownote={setShownote} shownote={shownote}/>
        </div>
        <div className="max-[425px]:flex flex-col grid max-[680px]:grid-rows-1 max-[1024px]:grid-cols-3 grid-cols-4 max-[768px]:grid-rows-11 grid-rows-2 gap-2 h-max mb-6">
       {/* cases */}
          <div className={`px-2 py-2 bg-[var(--fileBox)] col-span-3 max-[680px]:row-span-0 max-[768px]:row-span-4`}>
            <div className="px-2 py-3 h-[100%] rounded overflow-x-scroll" style={{scrollbarWidth : "none"}}>
              <table className="bg-[var(--foreground)] !w-max min-w-full shadow-sm">
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
         
            {/* quick action */}
        </div>
      </div>
      }
      {shownote && 
      <div className="backdrop-blur-md fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-screen h-screen flex items-center justify-center z-[10000000000]">
      <div className="w-[430px] h-[350px]  bg-[var(--fileBox)] p-4">
        <h1 className="text-center">Add note</h1>
        <form className="flex flex-col gap-2" >
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
         <button className="flex w-full items-center px-3 py-2 bg-[var(--text)] text-[var(--fileBox)] rounded-[5px] justify-center" onClick={()=>setShownote(!shownote)}>Cancel</button>
         <button className="flex w-full items-center px-3 py-2 bg-[var(--text)] text-[var(--fileBox)] rounded-[5px] justify-center" type="button" onClick={()=>handleAddnotice()}>Add</button>
          </div>
        </form>
      </div>
      </div>
      }
      
    </div>
  );
};

export default page;
