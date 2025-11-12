import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
export async function POST(req){
    try {
        const {formData} = await req.json();
        // console.log(formData);
        
        const user = await authMiddleware();
        console.log(user,"usersss");
        
        if(!user) return Response.json({error : "user not authenticated"},{status : "401"});
        const [rows] = await db.query("insert into notice(title,fortime,description,userid) values(?,?,?,?)",[formData.title,formData.time,formData.description,user.id])
        if(!rows.affectedRows) return Response.json({error : "failed to add data"},{status : "400"});
        return Response.json({message : "notice added"},{status : 200})
    } catch (error) {
        console.log(error.message);
        
        return Response.json({error : error.message},{status : "500"});
    }
}