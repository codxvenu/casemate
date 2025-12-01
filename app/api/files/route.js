import db, { getUserbyEmail } from "@/lib/db"
import { authMiddleware } from "../middleware/auth"

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    
    const user = await authMiddleware()
    if(!user) return Response.json({error : "User not authenticated"},{status : 400});
    console.log(path,"path");
    const [rows] = await db.query("select * from files where userId = ? and path = ?",[user.id,path]);
    if(rows.length == 0) return Response.json({error : "no file found"},{status : 200})
    return Response.json({files : rows},{status : 200})
}