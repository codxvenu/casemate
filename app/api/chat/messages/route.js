import db from "@/lib/db";
import { authMiddleware } from "@/app/api/middleware/auth";
export async function POST(req){
    try {
        const {conversations_ids} = await req.json();
        console.log(conversations_ids,"ids");
        
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("select * from chat where conversations_id in (?) order by created_at DESC  LIMIT 20",[conversations_ids]);
        return Response.json({data :rows},{status : 200}); 
        } catch (error) {
            return Response.json({error : error.message},{status : 400})
    }    
}