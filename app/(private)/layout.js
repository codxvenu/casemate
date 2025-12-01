import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";
import { getUser } from "@/lib/getUser";

export default async function RootLayout({ children }) {
   const user = await getUser()
  return (
    <>
          <SocketContext>
        <UserContext Initialuser={user}>
        {children}
        </UserContext>
          </SocketContext>
    </>
  );
}
