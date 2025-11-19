import { LoginSchema, RegisterSchema } from "@/schemas/authSchema";
import { Validator } from "@/utility/lib/validator";
import { toast } from "react-toastify";

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
export const authService = {
  login: async (user) =>
    apiFetch("/api/auth/login", POST({user})),
  register: (user) =>
    apiFetch("/api/auth/register", POST({user})),
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
  addNotice: async (formData) => apiFetch("/api/addnotice", POST(formData)),
};
