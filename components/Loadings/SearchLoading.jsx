import React from 'react'
import { inter } from '@/app/layout'
const SearchLoading = () => {
  return (
     <ul className={`${inter.className} row-span-13`}>
     <li className="grid grid-cols-20 items-center justify-between p-4 group/suggestion">
       
       <span className="w-5 h-5 block bg-[var(--foreground)] rounded-full shimmer"></span>
   
       <span className="flex flex-col items-start justify-center col-span-18 gap-2">
   
         <h4 className="bg-[var(--foreground)] rounded-xl block w-[40%] h-[10px] shimmer">
           <span className="opacity-0">placeholder</span>
         </h4>
   
         <p className="w-[80%] !text-[13px] bg-[var(--foreground)] rounded-xl block !h-[10px] shimmer">
           <span className="opacity-0">placeholder</span>
         </p>
   
       </span>
   
     </li>
            </ul>
  )
}

export default SearchLoading
