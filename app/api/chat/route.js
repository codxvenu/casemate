import db from "@/lib/db";
import { authMiddleware } from "@/app/api/middleware/auth";
export async function GET(req){
    try {
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("SELECT c.id , c.user1_id,c.user2_id,c.last_message as lastMsg,c.updated_at as lastupdated,u.id AS other_user_id,u.name,u.email,u.avatar FROM conversations c JOIN users u ON u.id = CASE WHEN c.user1_id = ? THEN c.user2_id ELSE c.user1_id END WHERE c.user1_id = ? OR c.user2_id = ? order by c.updated_at DESC LIMIT 20",[user.id,user.id,user.id])
        console.log(rows);
        
        return Response.json({data :rows},{status : 200}); 
        } catch (error) {
            return Response.json({error : error.message},{status : 400})
    }    
}