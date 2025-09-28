import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function authMiddleware(req){
    try{
        const store = await cookies();
        const token = store.get("token").value;
        if(!token) return null;
        const user = jwt.verify(token,"helloworld")
        return user;
}catch(err){
    return null
}
}
