import db from "@/lib/db";
import { authMiddleware } from "../../middleware/auth";
export async function POST(req) {
    try {
        const {receiver_id,created_at,requester_id} = await req.json()
        console.log(receiver_id,created_at,requester_id);
        
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("insert into chat_requests (requester_id	,receiver_id,status	,created_at	,updated_at) values(?,?,?,?,?)",[requester_id,receiver_id,"pending",created_at,created_at])
        if(rows.affectedRows === 0) return Response.json({error : "Failed to send request"},{status : 400})
        return Response.json({message : "sent request"},{status : 200})
    } catch (error) {
        console.log(error.message);
        return Response.json({error : error.message},{status : 400})
        

    }
}