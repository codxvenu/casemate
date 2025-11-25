"use client";
import SideBar from "@/components/sideBar";
import Stat from "@/components/dashboard/stat";
import React, { useContext, useEffect, useState } from "react";
import Loader from "@/components/loader";
import { User } from "../context/UserContext";
import { dashboardService } from "@/hook/apifetch";
import Calandar from "@/components/dashboard/calandar";
import ChatReq from "@/components/dashboard/ChatReq";
import AddReminder from "@/components/dialoge/addReminder";
import SidebarMd from "@/components/SidebarMd";
import Notices from "@/components/dashboard/notices";
import QuickReminder from "@/components/dashboard/QuickReminder";
import RecentCases from "@/components/dashboard/RecentCases";
import { AlignCenter } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
const page = () => {
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [Dashboard, setDashboard] = useState([]);
  const [Reminder, setReminder] = useState(false);
  const { user } = useContext(User);
  useEffect(() => {
    handleStats();
    console.log(user);
    
  }, [user]);
  async function handleStats() {
    const data = await dashboardService.getStats();
    setDashboard(data.data);
    setLoading(false);
  }
  async function handleAddnotice(formData, action) {
    const data = await dashboardService.addNotice({ ...formData, action });
    if (!data.error) {
      handleStats();
      setReminder(false);
      return;
    }
  }

  async function handleRequest(action, i) {
    const now = new Date();
    const body = {
      id: i.id,
      now,
      requester_id: i.requester_id,
      sender_id: user.id,
      action: action,
    };
    await dashboardService.actionReq(body);
    setRequests((prev) => {
      return prev.filter((j) => j.id !== i.id);
    });
  }
   return (
    <div
      className={`bg-[var(--fileBox)] flex max-[768px]:flex-col h-screen overflow-clip `}
    >
     
      <SideBar
        showBar={showBar}
        setShowBar={setShowBar}
        atab={0}
        iconOnly={iconOnly}
        setIconOnly={setIconOnly}
      />
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className=" w-screen max-[768px]:h-[calc(100vh-58px]) h-screen flex flex-col overflow-x-hidden overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <Header setShowBar={setShowBar}/>
            <div className="grid max-[1170px]:flex flex-col min-[550px]:grid-cols-[repeat(auto-fit,minmax(275px,.5fr))] min-[780px]:mr-3 mt-3 h-fit mb-4">
              <div className=" max-[768px]:w-screen col-span-3 grid max-[600px]:flex flex-col  grid-cols-[repeat(auto-fit,minmax(250px,.5fr))] grid-rows-auto p-3 gap-3">
                <Stat stat={Dashboard?.stat ?? []} />
                <Calandar />
                <RecentCases history={Dashboard?.history} />
                <Notices notices={Dashboard.notice} setReminder={setReminder} />
              </div>
              <div
                className={`w-full h-full py-4 px-2.5 max-[768px]:w-screen max-[768px]:pt-0 max-[768px]:max-h-[482px] grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] min-[1195px]:col-span-[span 4] gap-2 ${
                  !iconOnly
                    ? "max-[1353px]:col-span-4"
                    : "max-[1170px]:col-span-4"
                }`}
              >
                <ChatReq
                  handleRequest={handleRequest}
                  chatRequests={Dashboard?.chatRequests}
                />
                <QuickReminder
                  notices={Dashboard.notice}
                  setReminder={setReminder}
                />
              </div>
            </div>
          </div>
          <SidebarMd />
        </>
      )}
      {!!Reminder && (
        <AddReminder
          setReminder={setReminder}
          handleAddnotice={handleAddnotice}
          action={Reminder}
        />
      )}
    </div>
  );
};

export default page;
