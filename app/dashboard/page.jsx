"use client";
import SideBar from "@/components/sideBar";
import Stat from "@/components/dashboard/stat";
import { ChevronDown, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import React, { useContext, useEffect,useState } from "react";
import Loader from "@/components/loader";
import { User } from "../context/UserContext";
import { toast } from "react-toastify";
import { dashboardService } from "@/hook/apifetch";
import Calandar from "@/components/dashboard/calandar";
import ChatReq from "@/components/dashboard/ChatReq";
import AddReminder from "@/components/dialoge/addReminder";
import SidebarMd from "@/components/SidebarMd";
import Notices from "@/components/dashboard/notices";
import QuickReminder from "@/components/dashboard/QuickReminder";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [Dashboard, setDashboard] = useState([]);
  const [shownote, setShownote] = useState(false);
  const [Reminder, setReminder] = useState(false);
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
async function handleAddnotice(formData,action){
  const data = await dashboardService.addNotice({...formData,action})
  if(!data.error){
    handleStats()
    setReminder(false)
    return
  }
    
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
  await dashboardService.actionReq(body)
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
      <div className=" w-screen max-[768px]:h-[calc(100vh-58px]) h-screen flex flex-col overflow-x-hidden overflow-y-scroll" style={{scrollbarWidth : "none"}}>
        <div className="grid max-[1170px]:flex flex-col min-[550px]:grid-cols-[repeat(auto-fit,minmax(275px,.5fr))] min-[780px]:mr-3 mt-3 h-fit mb-4">
        <div className=" max-[768px]:w-screen col-span-3 grid max-[600px]:flex flex-col  grid-cols-[repeat(auto-fit,minmax(250px,.5fr))] grid-rows-auto p-3 gap-3">
       <Stat stat={Dashboard?.stat ?? []}/>
       <Calandar/>

            <div className="px-2 col-span-3 row-span-2 h-[100%] rounded  grid grid-rows-10" >
              <h2 className="px-2 pb-3 flex justify-between">Recent Cases <span className="flex items-center gap-2">
                
                <button className="p-1 rounded-md shadow-sm bg-[var(--foreground)] group hover:bg-blue-600 transition-all duration-200 ease-in-out"><ChevronLeft className="w-4 h-4 group-hover:text-white"/></button>
                <button className="p-1 rounded-md shadow-sm bg-[var(--foreground)] group hover:bg-blue-600 transition-all duration-200 ease-in-out"><ChevronRight className="w-4 h-4 group-hover:text-white" /></button>
                
                </span>
              </h2>
              <div className="overflow-x-scroll w-full h-full row-span-10"style={{scrollbarWidth : "none"}}>
              <table className="bg-[var(--foreground)] !w-max min-w-full shadow-sm h-full ">
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
                  {!!Dashboard?.history?.length   && history?.map((i,index)=>(
                  <tr key={index}>
                    <td>{i?.Title}</td>
                    <td>{i?.Category}</td>
                    <td>{i?.updated}</td>
                    <td>{i?.status === 'active' ? <span className="text-green-500">Ongoing</span> : i?.status === 'closed' ? <span className="text-red-500">Closed</span> : <span className="text-red-500">Pending Hearing</span>}</td>
                    <td className="flex  gap-2 justify-center items-center"><span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><DoorOpen className="w-4 h-4" /></span> <span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><Trash2 className="w-4 h-4" /></span></td>
                  </tr>
                  ))}
              {!!history.length && <tr className=" w-full h-full">
                  <td></td>
                  <td></td>
                  <td className="block w-full text-center  max-[600px]:!pt-8 min-[600px]:!pt-36 ">No history Found</td> 
                    </tr>
                    }
                </tbody>
              </table>
              </div>
          </div>
        <Notices notices={Dashboard.notice} setReminder={setReminder}/>
        </div>
       <div className={`w-full h-full py-4 px-2.5 max-[768px]:w-screen max-[768px]:pt-0 max-[768px]:max-h-[482px] grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] min-[1195px]:col-span-[span 4] gap-2 ${!iconOnly ? "max-[1353px]:col-span-4" : "max-[1170px]:col-span-4"}`}>
        
        <ChatReq handleRequest={handleRequest} chatRequests={Dashboard?.chatRequests}/>
        <QuickReminder notices={Dashboard.notice} setReminder={setReminder}/>
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
    {!!Reminder && <AddReminder setReminder={setReminder} handleAddnotice={handleAddnotice} action={Reminder}/>}
    </div>
  );
};

export default page;
