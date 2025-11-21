import db from "@/lib/db";
import { authMiddleware } from "@/app/api/middleware/auth";
export async function POST(req) {
    try {
        const {action,id,now,requester_id,sender_id} = await req.json()
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
            const [rows] = await db.query("update chat_requests set status = ? where id = ?",[action,id])
            if(rows.affectedRows === 0) return Response.json({error : `failed to ${action}`},{status : 500})
        if(action === "accept"){
            const[rows1] = await db.query("INSERT INTO conversations (user1_id, user2_id,created_at) VALUES (LEAST(?,?), GREATEST(?,?),?)",[sender_id,requester_id,sender_id,requester_id,now])
            if(rows1.affectedRows === 0) return Response.json({error : `failed to insert ${action}`},{status : 500})
        }
        return Response.json({error : `Success to ${action} req`})
    } catch (error) {
        console.log(error);
        
        return Response.json({error : error.message},{status : 400})
        

    }
}