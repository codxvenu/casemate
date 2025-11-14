import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
export async function POST(req) {
    try {
        const {created_at,index} = await req.json();
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("insert into chatgroup(created_at,userId,category) values(?,?,?)",[created_at,user.id,index])
        if(rows.affectedRows === 0) return Response.json({error : "failed to add new chat"},{status : 400})
        return Response.json({id : rows.insertId},{status : 200})
    } catch (error) {
        console.log(error.message);
        return Response.json({error : error.message},{status : 500}) 
    }
}