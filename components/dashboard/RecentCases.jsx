import React from 'react'
import { DoorOpen,Trash2,ChevronLeft,ChevronRight } from 'lucide-react'
const RecentCases = ({history}) => {
  return (
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
                  {!!history?.length   && history?.map((i,index)=>(
                  <tr key={index}>
                    <td>{i?.Title}</td>
                    <td>{i?.Category}</td>
                    <td>{i?.updated}</td>
                    <td>{i?.status === 'active' ? <span className="text-green-500">Ongoing</span> : i?.status === 'closed' ? <span className="text-red-500">Closed</span> : <span className="text-red-500">Pending Hearing</span>}</td>
                    <td className="flex  gap-2 justify-center items-center"><span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><DoorOpen className="w-4 h-4" /></span> <span className="bg-black p-1 text-white flex items-center justify-center w-fit rounded-xl"><Trash2 className="w-4 h-4" /></span></td>
                  </tr>
                  ))}
              {!!history?.length && <tr className=" w-full h-full">
                  <td></td>
                  <td></td>
                  <td className="block w-full text-center  max-[600px]:!pt-8 min-[600px]:!pt-36 ">No history Found</td> 
                    </tr>
                    }
                </tbody>
              </table>
              </div>
          </div>
  )
}

export default RecentCases
