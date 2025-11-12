import db from "@/lib/db";
import { authMiddleware } from "../middleware/auth";
export async function GET(req){
    try {
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
    const [rows] = await db.query("select * from stats where userid = ?",user.id)
    const [rows2] = await db.query("select * from recentcases where userid = ?",user.id)
    const [rows3] = await db.query("select * from notice where userid = ?",user.id)
    return Response.json({data : [rows[0],rows2,rows3]},{status : 200})
    } catch (error) {
        return Response.json({error : error.message},{status : 500})
    }
}