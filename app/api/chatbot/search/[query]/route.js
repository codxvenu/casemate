import { authMiddleware } from "@/app/api/middleware/auth";
import db from "@/lib/db";
export async function GET(req,{params}) {
    try {
        const {query} = await params;
        const user = await authMiddleware()
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("select * from chatbot WHERE userId = ? and MATCH(text) AGAINST (? IN NATURAL LANGUAGE MODE)",[user.id,query])
        if(rows.length === 0) return Response.json({message : "no result found"})
        const ids = rows.map((i)=>{return i.chatId})
        const [rows2] = await db.query("select * from chatgroup WHERE userId = ? and id in (?)",[user.id,ids])
        if(rows2.length === 0) return Response.json({message : "no result found for group"})
        return Response.json({result : [rows,rows2]},{status : 200})
    } catch (error) {
        return Response.json({error : error.message},{status : 400})
    }

}