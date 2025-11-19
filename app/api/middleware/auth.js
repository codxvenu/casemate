import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function authMiddleware(req){
    try{
        const store = await cookies();
        const token = store.get("token").value;
        if(!token) return null;
        const user = jwt.verify(token,process.env.JWT_SECRET)
        console.log(user,"usersslksasda");
        
        return user;
}catch(err){
    return null
}
}
