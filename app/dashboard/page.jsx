"use client";
import SideBar from "@/components/sideBar";
import Stat from "@/components/dashboard/stat";
import { Search } from "lucide-react";
import React, { useContext, useEffect,useState } from "react";
import Loader from "@/components/loader";
import { User } from "../context/UserContext";
import { toast } from "react-toastify";
import { dashboardService } from "@/hook/apifetch";
import Calandar from "@/components/dashboard/calandar";
import ChatReq from "@/components/dashboard/ChatReq";

import SidebarMd from "@/components/SidebarMd";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [Dashboard, setDashboard] = useState([]);
  const [shownote, setShownote] = useState(false);
  const [formData,setformData] = useState({});
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
    requester_id : i.requester_id,
    sender_id : user.id,
    action : action
  }
  const data = await dashboardService.actionReq(body)
  toast.success(data.message ?? "Message request Accept")
  setRequests((prev)=>{
    return prev.filter((j)=>j.id !== i.id)
  })
}
//const notices = notice?.filter((i)=>ConvertDate(i.fortime).day === SearchDate.day && ConvertDate(i.fortime).month === SearchDate.month.id && ConvertDate(i.fortime).year === SearchDate.year)
  return (
    <div className={`bg-[var(--fileBox)] flex max-[768px]:flex-col h-screen overflow-clip `} >
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={0}
        iconOnly={iconOnly}
        setIconOnly={setIconOnly}
      />
      {loading ? <div className="flex items-center justify-center w-full h-screen">
      <Loader/>
      </div> : 
      <>
      <div className=" w-screen h-screen flex flex-col overflow-x-hidden overflow-y-scroll" style={{scrollbarWidth : "none"}}>
        <div className="grid max-[1170px]:flex flex-col min-[550px]:grid-cols-[repeat(auto-fit,minmax(275px,.5fr))] min-[780px]:mr-3 mt-3 h-fit mb-4">
        <div className=" max-[768px]:w-screen col-span-3 grid max-[600px]:flex flex-col  grid-cols-[repeat(auto-fit,minmax(250px,.5fr))] grid-rows-auto p-3 gap-3">
       <Stat stat={Dashboard?.stat ?? []}/>
       <Calandar/> 
       <div className="col-span-4 w-full"></div>
       {/* <Notices iconOnly={iconOnly} setShownote={setShownote} shownote={shownote}/> */}
          <div className="col-span-4 p-2 m-2  h-full">
          <h2 className="font-semibold mb-3">Notices & Reminder</h2>
          <div className="overflow-x-scroll max-[768px]:w-screen w-full" style={{scrollbarWidth : "none"}}>
          <ul className="grid grid-cols-4 gap-2 w-max">
            <li className="max-[768px]:w-[210px] min-w-[218px] flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">Court filling</h3>
            <small className="text-[var(--fileText)]">Sept 22,2024</small>
            <h4 className="font-normal text-[12px]">Court filling & Court filling</h4>
            </li>
            <li className="max-[768px]:w-[210px] min-w-[218px]  flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">Court filling</h3>
            <small className="text-[var(--fileText)]">Sept 22,2024</small>
            <h4 className="font-normal text-[12px]">Court filling & Court filling</h4>
            </li>
            <li className="max-[768px]:w-[210px] min-w-[218px]  flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">Court filling</h3>
            <small className="text-[var(--fileText)]">Sept 22,2024</small>
            <h4 className="font-normal text-[12px]">Court filling & Court filling</h4>
            </li>
            <li className="max-[768px]:w-[210px] min-w-[218px]  flex flex-col gap-2 capitalize shadow-sm rounded-md px-2 py-3 bg-[var(--foreground)]"><h3 className="font-semibold">Court filling</h3>
            <small className="text-[var(--fileText)]">Sept 22,2024</small>
            <h4 className="font-normal text-[12px]">Court filling & Court filling</h4>
            </li>
          </ul>
          </div>
        </div>
        </div>
       <div className={`w-full h-full py-4 px-2.5 max-[768px]:w-screen max-[768px]:pt-0 max-[768px]:max-h-[482px] grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] min-[1195px]:col-span-[span 4] gap-2 ${!iconOnly ? "max-[1353px]:col-span-4" : "max-[1170px]:col-span-4"}`}>
        <div className="shadow-md bg-[var(--foreground)] p-4 rounded-md min-h-[170px] w-full min-w-full max-w-full">
        <span className="block relative shadow-sm border-[1px] border-gray-100 px-1 rounded-md mb-2">
        <input type="text" placeholder="Search" className="px-7 py-1.5 outline-0"/>
        <Search className="w-4 h-4 absolute top-2.5 left-2"/>
        </span>
        <ChatReq handleRequest={handleRequest} chatRequests={Dashboard?.chatRequests}/>
        </div>
        <div className=" shadow-md bg-[var(--foreground)] p-4 rounded-md min-h-[170px] ">
        <h2 className="font-medium">Quick Reminder</h2>
        <ul className="flex items-center justify-start mt-2.5">
          <li className="flex gap-2 items-center relative w-full"><input type="checkbox" name="reminder" id="" /><h3>Rajus wife</h3> <small className="absolute top-[2.5px] right-1 text-[var(--fileText)]">Sep 22 ,2025</small></li>
        </ul>
        </div>
       </div>
        </div>
      </div>
      <SidebarMd/>
      </>
      
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
