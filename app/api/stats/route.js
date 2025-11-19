import db from "@/lib/db";
import { authMiddleware } from "../middleware/auth";
export async function GET(req){
    try {
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
    const [stats, recentCases,chat_requests, notice] = await Promise.all([db.query("select * from stats where userid = ?",user.id),
    db.query("select * from recentcases where userid = ?",user.id),
    db.query("SELECT u.avatar,u.name, c.requester_id,c.created_at,c.id FROM chat_requests AS c INNER JOIN users AS u ON u.id = c.requester_id WHERE c.receiver_id = ? AND c.status = 'pending' ORDER BY c.created_at DESC",user.id),
    db.query("select * from notice where userid = ?",user.id)])
    return Response.json({data : {stat : stats[0],recentCases :  recentCases[0],chatRequests : chat_requests[0],notice :  notice[0]}},{status : 200})
    } catch (error) {
        console.log(error.message);
        
        return Response.json({error : error.message},{status : 500})
    }
}