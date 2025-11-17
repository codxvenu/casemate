import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SendInvite from "./Chat/SendInvite";

const ChatBar = ({ setReceiver, CheckDb, ActionIndexDb, CreateIndexDb }) => {
  const [activeState, setActiveState] = useState(0);
  const [ChatUsers, setChatUsers] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const [receiver_id, setReceiver_id] = useState(0);
  const chatFilters = [
    { id: "all", label: "All" },
    { id: "unseen", label: "Unseen" },
    { id: "lawyers", label: "Lawyers" },
  ];
  function handleDataSort(arr) {
    return arr.sort(
      (a, b) => new Date(b.lastupdated) - new Date(a.lastupdated)
    );
  }
  async function handleChatUsers() {
    const result = await ActionIndexDb("chats", 0);
    if (result === "Failed to read data")
      return console.log("Failed to read data");
    setChatUsers(handleDataSort(result));
    const res = await fetch("/api/chat/");
    const data = await res.json();
    if (!res.ok) return console.log(data.error);
    setChatUsers(handleDataSort(data.data));
    ActionIndexDb("chats", 1, data.data);
    handleMessages(data.data);
  }
  async function handleMessages(arr) {
    if (!arr.length) return;
    const conversations_ids = arr.map((i) => i.id);
    const res = await fetch(`/api/chat/messages/`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ conversations_ids }),
    });
    const data = await res.json();
    if (!res.ok) return console.log(data.error);
    console.log(data.data, "messages data");
    ActionIndexDb("message", 1, data.data);
  }
  async function handleSearch(query) {
    setLoading(true);
    const res = await fetch(`/api/chat/search/${query}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return console.log(data.error);
    setSearchResult(data.data ?? []);
    console.log(data);
    setLoading(false);
  }
  useEffect(() => {
    if (!SearchQuery.trim()) return;
    const timer1 = setTimeout(() => {
      handleSearch(SearchQuery);
    }, 500);
    return () => clearTimeout(timer1);
  }, [SearchQuery]);
  useEffect(() => {
    CreateIndexDb().then((exists) =>
      exists ? handleChatUsers() : CreateIndexDb()
    );
  }, []);
  const formatTime12 = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const d = (now - date) / (1000 * 60 * 60 * 24);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const StrTime = `${hours}:${minutes} ${ampm}`;
    const StrDay = `${date.getDay()}`;
    const StrYear = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    return d < 1 ? StrTime : d < 7 ? StrDay : StrYear;
  };
  const Chats = [
    {
      user: {
        name: "John Doe",
        icon: "https://avatars.githubusercontent.com/u/158077441?v=4",
      },
      userId: "1",
      lastMsg: "Hey, did you check the documents?",
      lastupdated: "2:45 PM",
    },
    {
      user: {
        name: "Priya Sharma",
        icon: "https://dummyjson.com/icon/michaelw/128",
      },
      lastMsg: "Sure, I will review it tonight.",
      lastupdated: "1:15 PM",
    },
    {
      user: {
        name: "Amit Verma",
        icon: "https://dummyjson.com/icon/sophiab/128",
      },
      lastMsg: "Sent the file. Please verify.",
      lastupdated: "Yesterday",
    },
    {
      user: {
        name: "Michael Lee",
        icon: "https://dummyjson.com/icon/jamesd/128",
      },
      lastMsg: "Let’s schedule a call.",
      lastupdated: "Mon",
    },
    {
      data: [
        {
          id: 6,
          user1_id: 5,
          user2_id: 6,
          last_message: "hello how are u did u sleep",
          last_message_time: "2025-11-16T15:43:49.000Z",
          created_at: "2025-11-16T15:43:49.000Z",
          updated_at: "2025-11-16T15:43:49.000Z",
          name: "Manveer Singh ",
          email: "princekumax7@gmail.com",
          avatar: "https://dummyjson.com/icon/sophiab/128",
        },
      ],
    },
  ];
  useEffect(() => {
    setSearchQuery("");
    setSearchResult([]);
    // handleChatUsers()
  }, [receiver_id]);

  return (
    <div className="py-4 bg-[var(--fileBox)] w-[260px] shrink-0 -ml-4">
      <span className="flex p-3 bg-[var(--foreground)] m-2 rounded-xl items-center relative ">
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-0"
          value={SearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="w-4 h-4" />
        {SearchResult.length !== 0 && !loading ? (
          <span
            className={`flex bg-[var(--foreground)] items-start p-3 justify-start flex-col absolute top-[55px] left-0 w-[244px] h-[140px] z-[1000] ${
              !SearchQuery.trim() && "!hidden"
            }`}
          >
            {SearchResult.connected.length !== 0 && (
              <span>
                <h3 className="!text-[12px]">Recent</h3>
                {SearchResult.connected.map((s, index) => (
                  <span key={index} className="flex gap-1 py-2">
                    <Image
                      src={`${s.avatar}`}
                      alt="ramu"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <span className="flex items-start justify-center">
                      <h3>{s.name}</h3>
                      <small></small>
                    </span>
                  </span>
                ))}
              </span>
            )}
            {SearchResult.notConnected.length !== 0 && (
              <h3 className="!text-[12px]">Global Search</h3>
            )}
            {SearchResult.notConnected.length !== 0 &&
              SearchResult.notConnected?.map((s, index) => (
                <span
                  key={index}
                  className="flex gap-1 py-2"
                  onClick={() => setReceiver_id(s.id)}
                >
                  <Image
                    src={s.avatar}
                    alt="ramu"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="flex items-start justify-center">
                    <h3>{s.name}</h3>
                    <small></small>
                  </span>
                </span>
              ))}
          </span>
        ) : (
          <span
            className={`flex bg-[var(--foreground)]  items-center justify-center absolute top-[55px] left-0 w-[244px] h-[140px] ${
              !SearchQuery.trim() && "!hidden"
            }`}
          >
            No result found
          </span>
        )}
      </span>
      <ul
        className="flex gap-2 items-center w-max overflow-x-scroll h-[30px] px-2 py-2 mb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {chatFilters.map((fil, index) => (
          <li
            key={index}
            className={`${
              activeState === index && "text-[var(--text)]"
            } text-[13px] font-medium text-[var(--fileText)] p-1`}
          >
            {fil.label}
          </li>
        ))}
      </ul>
      <ul className="flex items-start justify-start flex-col bg-[var(--fileBox)] gap-1 p-2">
        {ChatUsers.map((chat, index) => (
          <li
            key={index}
            className="flex gap-2 items-center py-2 relative bg-[var(--foreground)] w-full px-1 rounded-sm"
            onClick={() => setReceiver(chat)}
          >
            <Image
              src={`${chat.avatar}`}
              width={30}
              height={30}
              alt="ramu"
              className=" rounded-full"
            />
            <span className="flex flex-col gap-1">
              <h3 className="!text-[13px]">{chat.name}</h3>
              <p className="w-[99%] text-ellipsis overflow-hidden !text-[12px] whitespace-nowrap">
                {chat.lastMsg}
              </p>
            </span>
            <small className="absolute top-2 right-2">
              {formatTime12(chat.lastupdated)}
            </small>
          </li>
        ))}
      </ul>
      {!!receiver_id && (
        <SendInvite id={receiver_id} setReceiver_id={setReceiver_id} />
      )}
    </div>
  );
};

export default ChatBar;
