import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
export async function GET(req) {
    try {
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("select * from chatgroup where userId = ? order by created_at Desc limit 10 offset ?",[user.id, 0]);
        if(rows.length === 0 ) return Response.json({error : "no active group"},{status : 400})
        return Response.json({data : rows},{status : 200})
    } catch (error) {
        return Response.json({error : error.message},{status : 500}) 
    }
}