import React, { useEffect, useState } from 'react'
import { statData } from '@/constants/stat'
import { User,BriefcaseBusiness,Calendar } from 'lucide-react'
const Stat = ({stat,iconOnly}) => {
  const[stats,setStats] = useState([])
  useEffect(()=>{
    if(!stat[0]) return
    setStats(statData?.map((i)=>(
        {...i,value : stat[0][i?.description]}
      )))
  },[])
  return (
    <div className='grid max-[600px]:flex flex-col min-[450px]:grid-cols-3 col-span-4 gap-3'>
      {stats.length !==0 && stats.map((i,index)=>(
       <div key={index} className='group relative items-right justify-center shadow-sm px-4 max-[680px]:py-2 min-[680px]:py-3 bg-[var(--foreground)] max-[600px]:col-span-2 min-[680px]:min-h-[130px] h-[100%] rounded flex min-[680px]:gap-2 max-[680px]:gap-1 flex-col'>
      <span className='absolute top-0 right-0 w-1 rounded-md h-full block bg-blue-500'></span>
      <h3 className='font-medium flex items-center gap-3'>{i.title}
       <span className='shadow-md inset-ring-slate-400 p-3 absolute right-4 top-8'>
        <i.icon className='w-4 h-4' />
        </span>
        </h3>
      <h1 className='font-extrabold'>{i.value}</h1>
      <h3 className='text-[var(--fileText)]'>{i.description}</h3>
        <span>
        </span>
      </div>
      ))}
    </div>
  )
}

export default Stat
