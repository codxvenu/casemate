import { LoginSchema, RegisterSchema } from "@/schemas/authSchema";
import { Validator } from "@/utility/lib/validator";
import { toast } from "react-toastify";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch(url, options) {
  const noRedirect = ["/login", "/register"];
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });
  const data = res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) {
      if (noRedirect.includes(window.location.pathname)) return;
      toast.error("Session Over");
      return (window.location.href = "/login");
    }
    return toast.error(data.error ?? "something went wrong");
  }
  return data;
}
const POST = (body) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const PUT = (body) => ({
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const FormData = (formData) => ({
  method: "POST",
  body: formData,
});
export const authService = {
  login: async (user) => apiFetch("/api/auth/login", POST({ user })),
  register: (user) => apiFetch("/api/auth/register", POST({ user })),
  forgotPass: ({ email }) => apiFetch("/api/auth/fpass"),
};
export const UserService = {
  getUser: () => apiFetch("/api/auth"),
};
export const dashboardService = {
  getStats: () => apiFetch("/api/stats"),
  actionReq: ({ action, id, now, receiver_id, sender_id }) =>
    apiFetch(
      "/api/request/actions",
      POST({ action, id, now, receiver_id, sender_id })
    ),
  addNotice: (formData) => apiFetch("/api/addnotice", POST(formData)),
};
export const FileService = {
  delete: (id, filename) =>
    apiFetch(`${backend}/delete/${id}/${filename}`, { method: "DELETE" }),
  rename: ({ oldName, newName }) =>
    apiFetch(`${backend}/rename`, PUT({ oldName, newName })),
  share: ({ file, userId }) =>
    apiFetch(`${backend}/Share/`, POST({ file, userId })),
  getFiles: () => apiFetch("/api/files"),
  addFile : (data)=> apiFetch(`${backend}/upload`,FormData(data))
};
export const ChatBotService = {
  getChatById: (id) => apiFetch(`/api/chatbot/${id}`),
  getChatHistory: () => apiFetch(`/api/chatbot/search/history`),
  createChat: ({ created_at, index }) =>
    apiFetch(`/api/newchat`, POST({ created_at, index })),
  getConversations: (conversations_ids) =>
    apiFetch(`/api/chat/messages/`, POST({ conversations_ids })),
  getChat: () => apiFetch(`/api/chat/`),
  shareMessage: (id) => apiFetch(`/api/share/${id}`),
  searchChat : (query)=>apiFetch(`/api/chatbot/search/${query}`),
  addSearchHistroy : ({query})=>apiFetch("/api/chatbot/search/history",POST({query}))
};
export const ChatService = {
  searchChat: (query) => apiFetch(`/api/chat/search/${query}`),
  sendRequest : ({requester_id,created_at,receiver_id}) => apiFetch("/api/chat/request",POST({requester_id,created_at,receiver_id}))
};
