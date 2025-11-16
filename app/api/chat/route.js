import db from "@/lib/db";
import { authMiddleware } from "@/app/api/middleware/auth";
export async function GET(req){
    try {
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const[rows]= await db.query("select * from conversations where user1_id = ? or user2_id = ?",[user.id,user.id]);
            const connectedUserIds = new Set();        
            rows.forEach(chat => {
                                    connectedUserIds.add(chat.user1_id);
                                    connectedUserIds.add(chat.user2_id);
                                    });
        connectedUserIds.delete(user.id)    
        const idarr = [...connectedUserIds]   
        if (idarr.length === 0) {
  return Response.json({ data: rows }, { status: 200 });
}       
        const[rows1]= await db.query("SELECT id, name, email, avatar FROM users WHERE id IN (?)",[idarr]);
            const fullArr = rows.map((i)=> {
             const elem =  rows1.find((j)=>j.id === i.user1_id || j.id === i.user2_id)
             return {...i,...elem}
            })
            return Response.json({data :fullArr},{status : 200}); 
        } catch (error) {
            return Response.json({error : error.message},{status : 400})
    }    
}