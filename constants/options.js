import { LayoutDashboard,Folder,MessageSquare,Bot } from "lucide-react";


export const options = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    route: "/dashboard",
    description: "Quick overview"
  },
  {
    name: "FileVault",
    icon: Folder,
    route: "/filemanager",
    description: "Manage files"
  },
  {
    name: "ChatRoom",
    icon: MessageSquare,
    route: "/chat",
    description: "Chat clients"
  },
  {
    name: "CaseBot",
    icon: Bot,
    route: "/chatbot",
    description: "AI assistant"
  }
];