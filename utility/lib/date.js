import { months } from "@/constants/months";
export function ConvertDate(date) {
    if(!date) return
  var date = new Date(date);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
export function ConvertTime(time) {
    if(!time) return
  const [hours, min] = time.split(":");
  return Number(hours) >= 12
    ? `${hours % 12}:${min} AM`
    : `${hours % 12}:${min} PM`;
}
export function handleInitializeDate(setDate) {
    if(!setDate) return 
  const date = new Date();
  setDate({
    day: date.getDate(),
    month: months[date.getMonth()+1],
    year: date.getFullYear(),
  });
}
