"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    const timer2 = setTimeout(()=>{
      router.push("/login")
    },3000)
    return () => clearTimeout(timer2); // ✅ cleanup to prevent memory leaks
  },[])
  return (
    <div className="font-sans bg-[var(--purple)] h-screen overflow-hidden flex flex-col text-[var(--background)] items-center justify-center">
    <img className="ml-[75px] pulseimg mt-[-50%]" src="load.svg" alt="" />
    <h1 className="flex items-center gap-3 !font-bold">CaseMate <svg width="42" height="18" viewBox="0 0 42 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.08228 8.84812C6.77436 6.62496 10.1929 -2.5374 15.6578 3.15536C21.1227 8.84812 23.8552 11.125 28.8647 10.8974C33.8742 10.6697 40.9331 4.74933 40.9331 4.74933" stroke="#F1F1F1"/>
<path d="M1.08228 8.84812C6.77436 6.62496 10.1929 -2.5374 15.6578 3.15536C21.1227 8.84812 23.8552 11.125 28.8647 10.8974C33.8742 10.6697 40.9331 4.74933 40.9331 4.74933" stroke="#F1F1F1"/>
<path d="M1.08228 12.0364C6.77436 9.81319 10.1929 0.650834 15.6578 6.34359C21.1227 12.0363 23.8552 14.3133 28.8647 14.0856C33.8742 13.8579 40.9331 7.93756 40.9331 7.93756" stroke="#9292FD"/>
<path d="M1.08228 12.0364C6.77436 9.81319 10.1929 0.650834 15.6578 6.34359C21.1227 12.0363 23.8552 14.3133 28.8647 14.0856C33.8742 13.8579 40.9331 7.93756 40.9331 7.93756" stroke="#9292FD"/>
<path d="M1.08228 15.2243C6.77436 13.0012 10.1929 3.83882 15.6578 9.53158C21.1227 15.2243 23.8552 17.5013 28.8647 17.2736C33.8742 17.0459 40.9331 11.1256 40.9331 11.1256" stroke="#F1F1F1"/>
<path d="M1.08228 15.2243C6.77436 13.0012 10.1929 3.83882 15.6578 9.53158C21.1227 15.2243 23.8552 17.5013 28.8647 17.2736C33.8742 17.0459 40.9331 11.1256 40.9331 11.1256" stroke="#F1F1F1"/>
</svg>
</h1>
    </div>
  );
}
