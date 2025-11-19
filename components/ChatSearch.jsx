"use client";
import React, { useEffect, useState } from "react";
import { X, MessageSquare, Search } from "lucide-react";
import { inter } from "@/app/layout";
import SearchLoading from "./Loadings/SearchLoading";
import { useApi } from "@/hook/apifetch";
const ChatSearch = ({ setChatID, setSearch,SearchHistory }) => {
  const [SearchQuery, setSearchQuery] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
const {apiFetch} = useApi();
   
  async function handleAddShistory(query){
    const data = await apiFetch("/api/chatbot/search/history",{
      method : "POST",
      body : JSON.stringify({query})
    })
  }
  useEffect(() => {
    if(!SearchQuery.trim()) return
    async function handleSearch() {
      setLoading(true)
      const data = await apiFetch(`/api/chatbot/search/${SearchQuery}`);
      setSearchResult(data.result ?? []);
      setLoading(false);
      console.log(data);
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return ()=>clearTimeout(timer)
  }, [SearchQuery]);
  function convertToDate(time) {
    const date = new Date(time);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date?.getDate()} ${months[date?.getMonth()]}`;
  }
  return (
    <div className={`w-[680px] h-[440px] fixed top-1/2 left-1/2 -translate-1/2 grid grid-rows-15 bg-[var(--fileBox)] rounded-2xl z-[10000] ${inter.className}`}>
      <span className="flex items-center justify-between row-span-2 p-4 border-b-[1px] border-[var(--border-color)]">
        <input
          type="text"
          placeholder="Search..."
          value={SearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[95%] outline-0 text-[16px] p-[.5rem_.75rem]"
        />
        <X className="w-4 h-4" onClick={() => setSearch((prev) => !prev)} />
      </span>
      {loading && <SearchLoading />}
      {!loading && SearchQuery.trim() && (
        <>
          {SearchResult?.length !== 0 ? 
              <ul className={`${inter.className} row-span-13`}>
                {SearchResult[0]?.map((s, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-20 items-center justify-between p-4 group/suggestion hover:bg-[var(--foreground)]"
                    onClick={() => {
                      handleAddShistory(SearchResult[1].find((j) => j.id === s.chatId))
                      setChatID(s.chatId);
                      setSearch(false);
                    }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="flex flex-col items-start justify-center col-span-18">
                      <h4>
                        {SearchResult[1].find((j) => j.id === s.chatId).title}
                      </h4>
                      <p className="group-hover/suggestion:w-[95%] transition-all duration-300 ease-in-out w-[100%] text-ellipsis overflow-hidden whitespace-nowrap !text-[13px] text-[var(--border_color)]">
                        {s.text}
                      </p>
                    </span>
                    <small className="group-hover/suggestion:block hidden transition-all duration-300 ease-in-out">
                      {convertToDate(s.created_at)}
                    </small>
                  </li>
                ))}
              </ul>
           : 
            <span className="flex items-center gap-2 justify-start w-full p-4  mt-1.5">
              <Search className="w-4 h-4" /> No results
            </span>
            }
        </>
      )}
      {!SearchQuery.trim() && 
        <div className="w-full p-2 row-span-13">
          <h4 className="text-[var(--fileText)] !text-[12px] mb-2 px-5 pt-4">Today</h4>
        {SearchHistory?.map((s)=>(
          <h3 key={s.id} className="flex items-center justify-start gap-2 hover:bg-[var(--foreground)] p-3.5 px-5 rounded-2xl" onClick={()=>setChatID(s.chatId)}> <MessageSquare className="w-4 h-4"/>{s?.query}</h3>
        ))}
        </div>
        }
     
    </div>
  );
};

export default ChatSearch;
