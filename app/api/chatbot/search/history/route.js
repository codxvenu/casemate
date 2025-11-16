import { authMiddleware } from "@/app/api/middleware/auth";
import db from "@/lib/db";
export async function GET(req) {
    try {
     const user = await authMiddleware();
    if(!user) return Response.json({error : "User not authenticated"},{status :401})
    const [rows] = await db.query("select * from shistory where userId = ? ",[user.id])
    return Response.json({data : rows},{status : 200})
    } catch (error) {
          return Response.json({error : error.message},{status :400})
    }
   
}
export async function POST(req) {
    try {
        const {query} = await req.json();
        console.log(query);
        
     const user = await authMiddleware();
    if(!user) return Response.json({error : "User not authenticated"},{status :401})
    const [rows] = await db.query("insert into shistory(query,chatId,userId) values(?,?,?) ",[query.title,query.id,user.id])
    if(rows.affectedRows === 0) return Response.json({error : "failed to add Search history"},{status : 400})
    return Response.json({message : "added s history"},{status : 200})
    } catch (error) {
          return Response.json({error : error.message},{status :400})
    }
   
}