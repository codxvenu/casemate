import {React,useContext,useEffect} from "react";
import Person from "../person";
import { User } from "@/app/context/UserContext";
const ChatRoom = ({ chat }) => {
  const {user} = useContext(User)
  const formatTime12 = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // smooth animation
    });
  }, [chat]);
  return (
    <div className="chatroom mt-[80px] mb-[3rem] px-5 w-[100%] h-full mx-auto  row-span-28 bg-[var(--foreground)]">
      {chat.map((i, index) =>
        i.sender === user.id ? (
          <Person
            person={2}
            key={index}
            time={formatTime12(i.created_at)}
            timeShow={i.showTime}
            text={i.content || i.message}
          />
        ) : (
          <Person
            person={1}
            time={formatTime12(i.created_at)}
            timeShow={i.showTime}
            text={i.content || i.message}
            key={index}
          />
        )
      )}
    </div>
  );
};

export default ChatRoom;
