import db, { getUserbyEmail } from "@/lib/db"
import { authMiddleware } from "../middleware/auth"

export async function GET(req) {
    const user = await authMiddleware()
    if(!user) return Response.json({error : "User not authenticated"},{status : 400});
    console.log(user);
    const {id} = await getUserbyEmail(user.user);
    if(!id) return Response.json({error : "User not authenticated"},{status : 400});
    console.log(id);
    const [rows] = await db.query("select * from files where userId = ?",[id]);
    if(rows.length == 0) return Response.json({error : "no file found"},{status : 400})
        console.log(rows);
        
    return Response.json({files : rows},{status : 200})
}