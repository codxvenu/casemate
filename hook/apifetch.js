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
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401) {
      if (noRedirect.includes(window.location.pathname)) return;
      toast.error("Session Over");
      return (window.location.href = "/login");
    }
    console.log(data?.error);
    return toast.error(data?.error ?? "something went wrong");
  }
    if(data?.message) toast.success(data?.message)
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
  getStats: () => apiFetch("/api/Dashboard/stats"),
  actionReq: ({ action, id, now, requester_id, sender_id }) =>
    apiFetch(
      "/api/chat/request/actions",
      POST({ action, id, now, requester_id, sender_id })
    ),
  addNotice: ({...formData}) => apiFetch("/api/Dashboard/addnotice", POST(formData)),
};
export const FileService = {
  CreateDir : ({foldername,fpath,userId,time})=>apiFetch(`${backend}/upload/createDir`,POST({foldername,fpath,userId,time})),
  delete: (selectedIds) =>
    apiFetch(`${backend}/delete`,{...POST({selectedIds}),method: "DELETE"}),
  rename: ({ fileId, newName }) =>
    apiFetch(`${backend}/rename`, PUT({ fileId, newName })),
  share: ({ file, userId }) =>
    apiFetch(`${backend}/Share/`, POST({ file, userId })),
  getFiles: (filepath) => apiFetch(`/api/files?path=${encodeURIComponent(filepath)}`),
  addFile : (formData)=> apiFetch(`${backend}/upload`,FormData(formData)),
  getFilePreview: (filePath) => apiFetch(`${backend}/previewFile/${filePath}`),
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
