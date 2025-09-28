import jwt from "jsonwebtoken";

export async function authMiddleware(req){
    const token = req.cookies.get("token").value;
    try{
        if(!token) return false;
        const user = jwt.verify(token,"helloworld")
        req.user = user;
        return true;
}catch(err){
    throw new Error("Not authenticated");
}
}
