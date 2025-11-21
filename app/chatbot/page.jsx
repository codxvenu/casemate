"use client";
import { React, useContext, useEffect, useState } from "react";
import { Columns2,Search } from "lucide-react";
import Message from "@/components/message";
import Bot from "@/components/bot";
import { Socket } from "../context/SocketContext";
import { User } from "../context/UserContext";
import SideBar from "@/components/sideBar";
import ChatSearchPopup from "@/components/ChatSearch";
import ChatBotLoading from "@/components/Loadings/ChatBotLoading";
import { ChatBotService } from "@/hook/apifetch";
const page = () => {
  const [chat, setChats] = useState([]);
  const [chatID, setChatID] = useState(0);
  const { user } = useContext(User);
  const { socket } = useContext(Socket);
  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [prevLen, setPrevLen] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [search,setSearch] = useState(false);
  useEffect(() => {
    if (!socket || !user) return;
    console.log(user, user.id);
    socket.on("replyDone", ({ fullReply, id, edited }) => {
      if (edited) {
        setChats((prev) => {
          const newChat = prev.map((i) => {
            return id === i.id ? { role: "assistant", text: fullReply, id } : i;
          });
          return [...newChat];
        });
      } else {
        setChats((prev) => {
          const yes = prev[prev.length - 1].role === "assistant";
          const msg = !yes ? prev : prev.slice(0, -1);
          return [...msg, { role: "assistant", text: fullReply }];
        });
      }
    });
    socket.emit("register", user.id);
    socket.on("replyChunk", ({ text }) => {
      setChats((prev) => {
        if (prev[prev.length - 1]) {
          return [
            ...prev.slice(0, -1),
            {
              ...prev[prev.length - 1],
              completed: false,
              text:
                prev[prev.length - 1].text !== "loading"
                  ? prev[prev.length - 1].text + text
                  : text,
            },
          ];
        } else {
          return [
            ...prev,
            {
              role: "assistant",
              text:
                prev[prev.length - 1].text !== "loading"
                  ? prev[prev.length - 1].text + text
                  : text,
            },
          ];
        }
      });
    });
    socket.on("error", ({ error }) => {
      setChats((prev) => {
        return [...prev.slice(0, -1), { role: "assistant", error }];
      });
    });
  }, [socket, user]);
  useEffect(() => {
    const chatroom = document.querySelector(".chatroom")
    if(!chatroom) return 
    if (prevLen !== chat.length) {
      chatroom.scrollTo({
        top: chatroom.scrollHeight,
        behavior: "smooth", // smooth animation
      });
    }
    setPrevLen(chat.length);
  }, [chat]);
  
  var titlePrompt = "";
  function sendMessage() {
    if (!socket || !user) return;
    if(!chatID) return
    const now = new Date();
    if (message.replace(" ", "") === "" || !message) return;
    if(chat.length === 0){
        titlePrompt = " do add a title to chat acc to the msg description"
    }
    setChats((prev) => {
      return [
        ...prev,
        { role: "user", text: message+titlePrompt },
        { role: "assistant", text: "loading", completed: false },
      ];
    });
    
    socket.emit("chatMessage", {
      userId: user.id,
      message: message,
      created_at: now,
      chatID
    });
    setMessage("");
    document.getElementById("sendtxt").innerText = "";
    setEmpty("false");
  }
  function sendFn(m) {
    if (!socket || !user) return;
    if (!chatID) return console.log("count",chatID)
    console.log("count",chatID)
    const now = new Date();
    setChats((prev) => {
      return [
        ...prev,
        { role: "user", text: m },
        { role: "assistant", text: "loading" },
      ];
    });
    console.log({ userId: user.id, message: m, created_at: now });

    socket.emit("chatMessage", {
      userId: user.id,
      message: m,
      created_at: now,
      chatID
    });
  }
 
  useEffect(() => {
  let isMounted = true; // to prevent state update after unmount

  async function loadChats() {
    if (chatID === 0) {
      setChats([]);
      return;
    }
    setLoading(true);
    setChats([]);
    const data = await ChatBotService.getChatById(chatID);
    if (!data) {
      setLoading(false);
      return;
    }
    if (isMounted) {
      setChats(data.data || []);
      setLoading(false);
    }
  }
  loadChats();
  return () => {
    isMounted = false;
  };
}, [chatID]);

  return (
        <div className="flex bg-[var(--foreground)] gap-3">
          <SideBar
          setChatID={setChatID}
            showBar={showBar}
            setShowBar={setShowBar}
            setSearch={setSearch}
            search={search}
            atab={3}
            className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`}
          />
          
          <div className=" w-full overflow-hidden grid bg-[var(--foreground)] h-screen relative ml-[-11px]">
            <div className=" p-4 flex justify-between z-50 rounded w-full fixed top-0">
              <button
                className="p-2 px-3 bg-[var(--fileBox)] mr-2 max-[768px]:hidden"
                onClick={() => setIconOnly(!iconOnly)}
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                className="p-2 px-3 bg-[var(--foreground)] mr-2 min-[768px]:hidden"
                onClick={() => setShowBar(!showBar)}
              >
                <Columns2 className="w-4 h-4" />
              </button>
 
            <h1 className={`min-[768px]:flex hidden transition-all duration-500 relative  ${iconOnly ? "-ml-30" :  "-ml-78"}`}>CaseMate 
               <button
                className={`p-2 px-3 bg-[var(--foreground)] mr-2 absolute  left-[41vw]`}
                onClick={() => setSearch(!showBar)}
              >
              <Search className="  w-4 h-4" />
              </button>
              </h1>
           <small></small>
            </div>
            {chat.length === 0 && !loading && (
              <div className="mt-[56px] mb-[6rem] px-2 w-[100%] bg-[var(--foreground)]">
                <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
                  {/* Welcome Message */}
                  <h1 className=" text-[var(--fileText)] max-w-md font-bold">
                    CaseBot
                  </h1>
                  <div className="mt-8 w-full h-full items-center max-w-md text-[var(--fileText)]">
                    <ul className="space-y-2">
                      {[
                        "Draft client communication (emails, memos)",
                        "Summarize witness statements",
                        "Translate legal jargon into plain English",
                        "Generate legal arguments based on facts",
                      ].map((chat, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            sendFn(chat);
                          }}
                          className=" rounded-lg bg-[var(--fileBox)] text-[14px] cursor-pointer p-[18px]"
                        >
                          {chat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
             {loading && <ChatBotLoading/>}
            {!loading &&
            <>
            {chat.length !== 0 && (
              <div className="chatroom w-[100%] overflow-y-scroll overflow-x-hidden min-[768px]:max-w-[800px] mx-auto mt-[70px] mb-[80px]" style={{scrollbarWidth : "none"}}>
                {chat.map((m, i) =>
                  m.role === "assistant" ? (
                    <Bot
                      key={i}
                      id={m.id}
                      text={m.error ? m.error : m.text}
                      error={!!m.error}
                    />
                  ) : (
                    <Message
                      key={i}
                      id={m.id}
                      Onedit={({ id, message }) => {
                        setChats((prev) => {
                          const newChat = prev.map((i) => {
                            if (id === i.id) {
                              return { role: "user", text: message, id };
                            } else if (id + 1 === i.id) {
                              return {
                                role: "assistant",
                                text: "loading",
                                id: id + 1,
                              };
                            } else {
                              return i;
                            }
                          });
                          return [...newChat];
                        });
                        socket.emit("edit-message", {
                          id,
                          message,
                          userId: user.id,
                        });
                      }}
                      img={"image.png"}
                      text={m.text}
                    />
                  )
                )}
              </div>
            )}
            </>
             }
            <div className="w-full  px-4 flex items-end justify-center gap-3 py-3 bg-transparent min-[768px]:max-w-[800px] absolute bottom-0 left-1/2 -translate-x-1/2">
              {/* <button className="w-[45px] h-[45px] bg-black text-[var(--text)] shrink-0 flex items-center justify-center rounded-2xl">
                <img src="mic.svg" alt="" />
              </button> */}

              <label
                htmlFor="message"
                className="flex items-end min-[768px]:p-4 p-2 shadow rounded-2xl py-4 px-3 w-full relative bg-[var(--fileBox)]"
              >
                <div
                  contentEditable="true"
                  id="sendtxt"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  onInput={(e) => {
                    e.target.innerText.trim() === ""
                      ? setEmpty(false)
                      : setEmpty(true);
                    setMessage(e.target.innerText);
                  }}
                  className="max-w-[96%] w-full outline-none peer"
                ></div>
                <small
                  className={`absolute ${
                    empty ? "hidden" : "peer-focus:hidden"
                  }  pointer-events-none`}
                >
                  Write now...
                </small>
                {/* <textarea type="text" placeholder='Write now...' className='outline-none resize-none w-full h-auto' rows={1}  style={{scrollbarWidth : "none"}} /> */}
                <button onClick={sendMessage}>
                  <img src="send.svg" alt="" />
                </button>
              </label>
            </div>
          </div>
        </div>
  );
};

export default page;
