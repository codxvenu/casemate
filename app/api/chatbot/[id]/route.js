import { authMiddleware } from "../../middleware/auth";
import db from "@/lib/db";
export async function GET(req,{params}) {
    try {
        const {id} = await params;
        console.log(id);
        
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("select * from chatbot where userId = ? AND chatId = ? order by created_at Desc",[user.id, id]);
        return Response.json({data : rows},{status : 200})
    } catch (error) {
        return Response.json({error : error.message},{status : 500}) 
    }
}