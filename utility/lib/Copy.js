import { toast } from "react-toastify"

export function handleCopyClipBoard(context){
    if(!context) return
    navigator.clipboard.writeText(context)
    toast.success("link Copied")
}