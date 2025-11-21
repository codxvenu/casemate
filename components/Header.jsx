import React from 'react'
import { Columns2,Bell } from 'lucide-react'
const Header = () => {
  return (
    <div className="fixed top-0 flex justify-between px-2 py-3 bg-[var(--foreground)] rounded mb-2 max-h-[55px] max-[680px]:mt-0 max-[680px]:w-full  z-[1000] w-full">
          <button
            className="p-2 px-3 hover:bg-[var(--fileBox)] mr-2 max-[768px]:hidden rounded-md"
            // onClick={() => setIconOnly(!iconOnly)}
          >
            <Columns2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 px-3 hover:bg-[var(--fileBox)] mr-2 min-[768px]:hidden rounded-md"
            // onClick={() => setShowBar(!showBar)}
            >
            <Columns2 className="w-4 h-4" />
          </button>
          <div className="flex gap-2 items-center flex-row-reverse w-full mr-3">
            <span className="bg-[var(--fileBox)] flex w-8 h-8 rounded-full items-center justify-center">N</span>
            <span 
            // onClick={()=>setShowBell(!showBell)}
             className="bg-[var(--fileBox)] flex w-8 h-8 rounded-full items-center justify-center relative"><span className="absolute -top-[.5rem] -right-4 bg-[var(--text)] text-[var(--foreground)] p-2 rounded-full w-8 h-5 flex items-center justify-center">
              <small >20+</small>
              </span>
               <Bell className="w-4 h-4"/>
               {/* {showBell && 
                <Dialogue handleRequest={handleRequest} Dashboard={Dashboard} setShowBell={setShowBell}/>
               } */}
               </span>
          </div>
        </div>
  )
}

export default Header
