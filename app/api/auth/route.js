import db from "@/lib/db"
import { authMiddleware } from "../middleware/auth";
export async function GET(req){
    try{
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401})
        const [rows] = await db.query("select * from users where email = ?",[user.user]);
        return Response.json({user : rows[0]},{status : 200});
    }catch(err){
        return Response.json({error : err.message},{status : 400})
    }
}