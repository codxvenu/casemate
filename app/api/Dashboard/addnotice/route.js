import { authMiddleware } from "../../middleware/auth";
import db from "@/lib/db";
export async function POST(req){
    try {
        const formData = await req.json();
        const user = await authMiddleware();
        if(!user) return Response.json({error : "user not authenticated"},{status : 401});
        const [rows] = await db.query("insert into notice(title,fortime,Description,userid,action) values(?,?,?,?,?)",[formData.title,formData.time,formData.Description,user.id,formData.action])
        if(!rows.affectedRows) return Response.json({error : "failed to add data"},{status : 400});
        return Response.json({message :  formData.action+" added"},{status : 200})
    } catch (error) {
        console.log(error);
        
        return Response.json({error : error.message},{status :500});
    }
}