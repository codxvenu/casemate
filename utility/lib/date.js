import { months } from "@/constants/months";
export function ConvertDate(Ndate) {
    if(!Ndate) return
  const date = new Date(date);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
export function ConvertMDY(Ndate){
  if(!Ndate) return
  const date = new Date(Ndate);
  const day = date.getDate();
  const month = months[date.getMonth()].shortForm
  const year = date.getFullYear()
  return `${month} ${day},${year}`
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
    month: months[date.getMonth()],
    year: date.getFullYear(),
  });
}
