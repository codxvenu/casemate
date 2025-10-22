"use client";
import { React, useContext, useEffect, useState } from "react";
import { Columns2 } from "lucide-react";
import Message from "@/components/message";
import Bot from "@/components/bot";
import { Socket } from "../context/SocketContext";
import { User } from "../context/UserContext";
import SideBar from "@/components/sideBar";
const page = () => {
  const [chat, setChats] = useState([]);
  const { user } = useContext(User);
  const { socket } = useContext(Socket);
  const [empty, setEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [prevLen, setPrevLen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
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
    socket.on("history", (history) => {
      setLoading(false);
      setChats(history);
    });
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
    if (prevLen !== chat.length) {
      chatroom.scrollTo({
        top: chatroom.scrollHeight,
        behavior: "smooth", // smooth animation
      });
    }
    setPrevLen(chat.length);
  }, [chat]);
  function sendMessage() {
    if (!socket || !user) return;
    const now = new Date();
    if (message.replace(" ", "") === "" || !message) return;

    setChats((prev) => {
      return [
        ...prev,
        { role: "user", text: message },
        { role: "assistant", text: "loading", completed: false },
      ];
    });
    console.log({ userId: user.id, message: message, created_at: now });

    socket.emit("chatMessage", {
      userId: user.id,
      message: message,
      created_at: now,
    });
    setMessage("");
    document.getElementById("sendtxt").innerText = "";
    setEmpty("false");
  }
  function sendFn(m) {
    if (!socket || !user) return;
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
    });
  }
  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <div className="flex bg-[var(--foreground)] gap-3">
          <SideBar
            showBar={showBar}
            setShowBar={setShowBar}
            className={`${iconOnly ? "iconOnly shrinkWidth" : " growWidth"}`}
          />
          <div className="grid grid-rows-[1fr_10fr_1fr] w-full overflow-hidden bg-[var(--foreground)] h-screen">
            <div className=" p-4 flex justify-between z-50 rounded w-full">
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
            <h1 className="-ml-6">CaseMate</h1>
            <small></small>
            </div>
            {chat.length === 0 && (
              <div className="mt-[56px] mb-[6rem] px-2 w-[100%]">
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
            {chat.length !== 0 && (
              <div className="chatroom w-[100%] overflow-y-scroll max-w-[800px] mx-auto" style={{scrollbarWidth : "none"}}>
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
            <div className="w-full px-4 flex items-end justify-center gap-3 py-3 bg-[var(--foreground)] max-w-[800px] mx-auto">
              <button className="w-[45px] h-[45px] bg-black text-[var(--text)] shrink-0 flex items-center justify-center rounded-2xl">
                <img src="mic.svg" alt="" />
              </button>

              <label
                htmlFor="message"
                className="flex items-end p-4 shadow-2xl rounded-2xl w-full relative bg-[var(--fileBox)]"
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
                  className="w-full outline-none peer"
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
      )}
    </>
  );
};

export default page;
