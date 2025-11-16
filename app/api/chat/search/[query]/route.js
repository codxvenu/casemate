import db from "@/lib/db";
import { authMiddleware } from "@/app/api/middleware/auth";
export async function GET(req,{params}){
    try {
        const {query} = await params;
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
            const search = `%${query}%`;
            const[rows1]= await db.query("SELECT id, name, email,avatar FROM users WHERE  name LIKE ? OR email LIKE ? LIMIT 8",[search,search])
            console.log(rows1,"rows",query);
            
            if(rows1.length === 0) return Response.json({message : "No Result"},{status : 200});
            const[rows]= await db.query("select * from conversations where user1_id = ? or user2_id = ?",[user.id,user.id]);
            const connectedUserIds = new Set();        
            rows.forEach(chat => {
                                    connectedUserIds.add(chat.user1_id);
                                    connectedUserIds.add(chat.user2_id);
                                    });

            const connected = rows1.filter(u => connectedUserIds.has(u.id));
            const notConnected = rows1.filter(u => !connectedUserIds.has(u.id));
            return Response.json({data : {connected,notConnected}},{status : 200}); 
        } catch (error) {
            return Response.json({error : error.message},{status : 400})
    }    
}